import { getDb, CAREERS_COLLECTION } from '@/lib/mongodb';
import { formatCareerDate, type Career } from '@/lib/career-data';
import type { WithId } from 'mongodb';

function toCareer(doc: WithId<Career> | Career): Career {
  const { _id, ...career } = doc as WithId<Career>;
  return career;
}

export function normalizeCareerPayload(input: unknown, options?: { existingId?: string }): Career {
  if (!input || typeof input !== 'object') {
    throw new Error('INVALID_PAYLOAD');
  }

  const data = input as Partial<Career>;
  const title = data.title?.trim() ?? '';
  const location = data.location?.trim() ?? '';
  const department = data.department?.trim() ?? '';

  if (!title) throw new Error('MISSING_TITLE');
  if (!location) throw new Error('MISSING_LOCATION');
  if (!department) throw new Error('MISSING_DEPARTMENT');

  return {
    id: options?.existingId ?? data.id?.trim() ?? String(Date.now()),
    title,
    location,
    type: data.type?.trim() || 'Full-time',
    department,
    description: data.description?.trim() ?? '',
    createdAt: data.createdAt?.trim() || formatCareerDate(new Date()),
  };
}

export async function getAllCareers(): Promise<Career[]> {
  const db = await getDb();
  const collection = db.collection<Career>(CAREERS_COLLECTION);
  const careers = await collection.find({}).sort({ createdAt: -1 }).toArray();
  return careers.map(toCareer);
}

export async function createCareer(input: unknown): Promise<Career> {
  const db = await getDb();
  const collection = db.collection<Career>(CAREERS_COLLECTION);
  const normalized = normalizeCareerPayload(input);
  await collection.insertOne({ ...normalized });
  return normalized;
}

export async function updateCareer(id: string, input: unknown): Promise<Career> {
  const db = await getDb();
  const collection = db.collection<Career>(CAREERS_COLLECTION);

  const existing = await collection.findOne({ id });
  if (!existing) throw new Error('NOT_FOUND');

  const normalized = normalizeCareerPayload(input, { existingId: id });
  await collection.updateOne({ id }, { $set: normalized });
  return normalized;
}

export async function deleteCareer(id: string): Promise<void> {
  const db = await getDb();
  const collection = db.collection<Career>(CAREERS_COLLECTION);
  const result = await collection.deleteOne({ id });
  if (result.deletedCount === 0) throw new Error('NOT_FOUND');
}
