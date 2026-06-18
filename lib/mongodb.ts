import { MongoClient, type Db } from 'mongodb';

const options = {};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | undefined;

function getMongoUri(): string {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Missing MONGODB_URI in environment variables');
  }
  return uri;
}

function getClientPromise(): Promise<MongoClient> {
  const uri = getMongoUri();

  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri, options).connect();
    }
    return global._mongoClientPromise;
  }

  if (!clientPromise) {
    clientPromise = new MongoClient(uri, options).connect();
  }

  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db('carier');
}

export const SHIPMENTS_COLLECTION = 'shipments';
export const ENQUIRIES_COLLECTION = 'enquiries';
export const CAREERS_COLLECTION = 'careers';
export const CAREER_APPLICATIONS_COLLECTION = 'career_applications';
