import { getDb, CAREER_APPLICATIONS_COLLECTION } from '@/lib/mongodb';
import { formatApplicationDate, type CareerApplication } from '@/lib/career-application-data';
import type { WithId } from 'mongodb';

function toApplication(doc: WithId<CareerApplication> | CareerApplication): CareerApplication {
  const { _id, ...application } = doc as WithId<CareerApplication>;
  return application;
}

export function normalizeApplicationPayload(input: unknown): CareerApplication {
  if (!input || typeof input !== 'object') {
    throw new Error('INVALID_PAYLOAD');
  }

  const data = input as Partial<CareerApplication>;
  const fullName = data.fullName?.trim() ?? '';
  const email = data.email?.trim() ?? '';
  const mobile = data.mobile?.trim() ?? '';
  const careerId = data.careerId?.trim() ?? '';
  const jobTitle = data.jobTitle?.trim() ?? '';

  if (!careerId || !jobTitle) throw new Error('MISSING_JOB');
  if (!fullName) throw new Error('MISSING_NAME');
  if (!email) throw new Error('MISSING_EMAIL');
  if (!mobile) throw new Error('MISSING_MOBILE');

  return {
    id: data.id?.trim() || String(Date.now()),
    careerId,
    jobTitle,
    fullName,
    email,
    mobile,
    experience: data.experience?.trim() ?? '',
    message: data.message?.trim() ?? '',
    createdAt: data.createdAt?.trim() || formatApplicationDate(new Date()),
  };
}

export async function getAllApplications(): Promise<CareerApplication[]> {
  const db = await getDb();
  const collection = db.collection<CareerApplication>(CAREER_APPLICATIONS_COLLECTION);
  const applications = await collection.find({}).sort({ createdAt: -1 }).toArray();
  return applications.map(toApplication);
}

export async function createApplication(input: unknown): Promise<CareerApplication> {
  const db = await getDb();
  const collection = db.collection<CareerApplication>(CAREER_APPLICATIONS_COLLECTION);
  const normalized = normalizeApplicationPayload(input);
  await collection.insertOne({ ...normalized });
  return normalized;
}

export async function deleteApplication(id: string): Promise<void> {
  const db = await getDb();
  const collection = db.collection<CareerApplication>(CAREER_APPLICATIONS_COLLECTION);
  const result = await collection.deleteOne({ id });
  if (result.deletedCount === 0) throw new Error('NOT_FOUND');
}
