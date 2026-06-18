import { NextResponse } from 'next/server';
import { createShipment, getAllShipments } from '@/lib/shipments-db';

function mapDbError(error: unknown) {
  if (!(error instanceof Error)) {
    return NextResponse.json({ error: 'Failed to save shipment' }, { status: 500 });
  }

  switch (error.message) {
    case 'DUPLICATE_DOCKET':
      return NextResponse.json(
        { error: 'A shipment with this docket number already exists.' },
        { status: 409 },
      );
    case 'MISSING_ROUTE':
      return NextResponse.json(
        { error: 'Origin and destination are required.' },
        { status: 400 },
      );
    case 'MISSING_MILESTONES':
      return NextResponse.json(
        { error: 'At least one tracking milestone with status and location is required.' },
        { status: 400 },
      );
    case 'MISSING_DOCKET':
      return NextResponse.json({ error: 'Docket number is required.' }, { status: 400 });
    case 'INVALID_PAYLOAD':
      return NextResponse.json({ error: 'Invalid shipment data.' }, { status: 400 });
    default:
      return null;
  }
}

export async function GET() {
  try {
    const shipments = await getAllShipments();
    return NextResponse.json(shipments);
  } catch (error) {
    console.error('GET /api/shipments failed:', error);
    return NextResponse.json({ error: 'Failed to load shipments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const created = await createShipment(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    const mapped = mapDbError(error);
    if (mapped) return mapped;
    console.error('POST /api/shipments failed:', error);
    return NextResponse.json({ error: 'Failed to create shipment' }, { status: 500 });
  }
}
