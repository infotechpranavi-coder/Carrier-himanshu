import { getDb, ENQUIRIES_COLLECTION } from '@/lib/mongodb';
import { formatEnquiryDate, type Enquiry } from '@/lib/enquiry-data';
import type { WithId } from 'mongodb';

function toEnquiry(doc: WithId<Enquiry> | Enquiry): Enquiry {
  const { _id, ...enquiry } = doc as WithId<Enquiry>;
  return enquiry;
}

export function normalizeEnquiryPayload(input: unknown): Enquiry {
  if (!input || typeof input !== 'object') {
    throw new Error('INVALID_PAYLOAD');
  }

  const data = input as Partial<Enquiry>;
  const fullName = data.fullName?.trim() ?? '';
  const pickupCity = data.pickupCity?.trim() ?? '';
  const deliveryCity = data.deliveryCity?.trim() ?? '';
  const mobile = data.mobile?.trim() ?? '';

  if (!fullName) throw new Error('MISSING_NAME');
  if (!pickupCity || !deliveryCity) throw new Error('MISSING_ROUTE');
  if (!mobile) throw new Error('MISSING_MOBILE');

  return {
    id: data.id?.trim() || String(Date.now()),
    fullName,
    companyName: data.companyName?.trim() ?? '',
    pickupCity,
    deliveryCity,
    serviceType: data.serviceType?.trim() || 'Not specified',
    mobile,
    message: data.message?.trim() ?? '',
    createdAt: data.createdAt?.trim() || formatEnquiryDate(new Date()),
  };
}

export async function getAllEnquiries(): Promise<Enquiry[]> {
  const db = await getDb();
  const collection = db.collection<Enquiry>(ENQUIRIES_COLLECTION);
  const enquiries = await collection.find({}).sort({ createdAt: -1 }).toArray();
  return enquiries.map(toEnquiry);
}

export async function createEnquiry(input: unknown): Promise<Enquiry> {
  const db = await getDb();
  const collection = db.collection<Enquiry>(ENQUIRIES_COLLECTION);
  const normalized = normalizeEnquiryPayload(input);
  await collection.insertOne({ ...normalized });
  return normalized;
}

export async function deleteEnquiry(id: string): Promise<void> {
  const db = await getDb();
  const collection = db.collection<Enquiry>(ENQUIRIES_COLLECTION);
  const result = await collection.deleteOne({ id });
  if (result.deletedCount === 0) throw new Error('NOT_FOUND');
}
