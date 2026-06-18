import { NextResponse } from 'next/server';
import { findShipmentByDocket } from '@/lib/shipments-db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const docket = searchParams.get('docket');

    if (!docket?.trim()) {
      return NextResponse.json({ error: 'Docket number is required' }, { status: 400 });
    }

    const shipment = await findShipmentByDocket(docket);

    if (!shipment) {
      return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
    }

    return NextResponse.json(shipment);
  } catch (error) {
    console.error('GET /api/shipments/track failed:', error);
    return NextResponse.json({ error: 'Failed to track shipment' }, { status: 500 });
  }
}
