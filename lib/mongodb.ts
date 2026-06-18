import { MongoClient, type Db } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Missing MONGODB_URI in environment variables');
}

const options = {};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri, options).connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = new MongoClient(uri, options).connect();
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db('carier');
}

export const SHIPMENTS_COLLECTION = 'shipments';
export const ENQUIRIES_COLLECTION = 'enquiries';
export const CAREERS_COLLECTION = 'careers';
export const CAREER_APPLICATIONS_COLLECTION = 'career_applications';
