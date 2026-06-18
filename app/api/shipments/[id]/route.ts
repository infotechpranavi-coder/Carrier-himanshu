import { NextResponse } from 'next/server';
import { deleteShipment, updateShipment } from '@/lib/shipments-db';

type RouteContext = {
  params: Promise<{ id: string }>;
};

function mapDbError(error: unknown) {
  if (!(error instanceof Error)) {
    return NextResponse.json({ error: 'Failed to update shipment' }, { status: 500 });
  }

  switch (error.message) {
    case 'NOT_FOUND':
      return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
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

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const updated = await updateShipment(id, body);
    return NextResponse.json(updated);
  } catch (error) {
    const mapped = mapDbError(error);
    if (mapped) return mapped;
    console.error('PUT /api/shipments/[id] failed:', error);
    return NextResponse.json({ error: 'Failed to update shipment' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    await deleteShipment(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === 'NOT_FOUND') {
      return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
    }
    console.error('DELETE /api/shipments/[id] failed:', error);
    return NextResponse.json({ error: 'Failed to delete shipment' }, { status: 500 });
  }
}
