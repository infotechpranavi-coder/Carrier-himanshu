import { getDb, SHIPMENTS_COLLECTION } from '@/lib/mongodb';
import {
  type DashboardShipment,
  type ShipmentMilestone,
  type ShipmentStatus,
  formatMilestoneDate,
} from '@/lib/dashboard-data';
import type { WithId } from 'mongodb';

const VALID_STATUSES: ShipmentStatus[] = [
  'Booked',
  'In Transit',
  'Out for Delivery',
  'Delivered',
  'Delayed',
];

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function toShipment(doc: WithId<DashboardShipment> | DashboardShipment): DashboardShipment {
  const { _id, ...shipment } = doc as WithId<DashboardShipment>;
  return shipment;
}

function normalizeMilestones(milestones: unknown): ShipmentMilestone[] {
  if (!Array.isArray(milestones) || milestones.length === 0) {
    throw new Error('MISSING_MILESTONES');
  }

  const normalized = milestones
    .map((item, index) => {
      if (!item || typeof item !== 'object') return null;
      const milestone = item as Partial<ShipmentMilestone>;
      const status = milestone.status?.trim() ?? '';
      const location = milestone.location?.trim() ?? '';
      if (!status || !location) return null;

      return {
        id: milestone.id?.trim() || `m-${index + 1}`,
        status,
        location,
        date: milestone.date?.trim() || formatMilestoneDate(new Date()),
        done: Boolean(milestone.done),
        current: Boolean(milestone.current),
      };
    })
    .filter((m): m is ShipmentMilestone => m !== null);

  if (normalized.length === 0) {
    throw new Error('MISSING_MILESTONES');
  }

  if (!normalized.some((m) => m.current)) {
    const firstDone = normalized.findIndex((m) => m.done);
    normalized[firstDone >= 0 ? firstDone : 0].current = true;
  }

  return normalized;
}

export function normalizeShipmentPayload(
  input: unknown,
  options?: { existingId?: string },
): DashboardShipment {
  if (!input || typeof input !== 'object') {
    throw new Error('INVALID_PAYLOAD');
  }

  const data = input as Partial<DashboardShipment>;
  const origin = data.origin?.trim() ?? '';
  const destination = data.destination?.trim() ?? '';

  if (!origin || !destination) {
    throw new Error('MISSING_ROUTE');
  }

  const status = VALID_STATUSES.includes(data.status as ShipmentStatus)
    ? (data.status as ShipmentStatus)
    : 'Booked';

  const docket = data.docket?.trim().toUpperCase() ?? '';
  if (!docket) {
    throw new Error('MISSING_DOCKET');
  }

  return {
    id: options?.existingId ?? data.id?.trim() ?? String(Date.now()),
    docket,
    origin,
    destination,
    status,
    eta: data.eta?.trim() ?? '',
    updatedAt: data.updatedAt?.trim() ?? new Date().toISOString(),
    milestones: normalizeMilestones(data.milestones),
  };
}

export async function getAllShipments(): Promise<DashboardShipment[]> {
  const db = await getDb();
  const collection = db.collection<DashboardShipment>(SHIPMENTS_COLLECTION);
  const shipments = await collection.find({}).sort({ updatedAt: -1 }).toArray();
  return shipments.map(toShipment);
}

export async function createShipment(input: unknown): Promise<DashboardShipment> {
  const db = await getDb();
  const collection = db.collection<DashboardShipment>(SHIPMENTS_COLLECTION);
  const normalized = normalizeShipmentPayload(input);

  const existing = await collection.findOne({
    docket: { $regex: new RegExp(`^${escapeRegex(normalized.docket)}$`, 'i') },
  });

  if (existing) {
    throw new Error('DUPLICATE_DOCKET');
  }

  await collection.insertOne({ ...normalized });
  return normalized;
}

export async function findShipmentByDocket(docket: string): Promise<DashboardShipment | null> {
  const db = await getDb();
  const collection = db.collection<DashboardShipment>(SHIPMENTS_COLLECTION);
  const shipment = await collection.findOne({
    docket: { $regex: new RegExp(`^${escapeRegex(docket.trim())}$`, 'i') },
  });

  if (!shipment) return null;
  return toShipment(shipment);
}

export async function updateShipment(id: string, input: unknown): Promise<DashboardShipment> {
  const db = await getDb();
  const collection = db.collection<DashboardShipment>(SHIPMENTS_COLLECTION);

  const existing = await collection.findOne({ id });
  if (!existing) throw new Error('NOT_FOUND');

  const normalized = normalizeShipmentPayload(input, { existingId: id });

  const duplicate = await collection.findOne({
    id: { $ne: id },
    docket: { $regex: new RegExp(`^${escapeRegex(normalized.docket)}$`, 'i') },
  });

  if (duplicate) throw new Error('DUPLICATE_DOCKET');

  await collection.updateOne({ id }, { $set: normalized, $unset: { vehicle: '', driver: '' } });
  return normalized;
}

export async function deleteShipment(id: string): Promise<void> {
  const db = await getDb();
  const collection = db.collection<DashboardShipment>(SHIPMENTS_COLLECTION);
  const result = await collection.deleteOne({ id });

  if (result.deletedCount === 0) throw new Error('NOT_FOUND');
}
