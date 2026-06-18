import { NextResponse } from 'next/server';
import { createEnquiry, getAllEnquiries } from '@/lib/enquiries-db';

function mapDbError(error: unknown) {
  if (!(error instanceof Error)) {
    return NextResponse.json({ error: 'Failed to save enquiry' }, { status: 500 });
  }

  switch (error.message) {
    case 'MISSING_NAME':
      return NextResponse.json({ error: 'Full name is required.' }, { status: 400 });
    case 'MISSING_ROUTE':
      return NextResponse.json({ error: 'Pickup and delivery city are required.' }, { status: 400 });
    case 'MISSING_MOBILE':
      return NextResponse.json({ error: 'Mobile number is required.' }, { status: 400 });
    case 'INVALID_PAYLOAD':
      return NextResponse.json({ error: 'Invalid enquiry data.' }, { status: 400 });
    default:
      return null;
  }
}

export async function GET() {
  try {
    const enquiries = await getAllEnquiries();
    return NextResponse.json(enquiries);
  } catch (error) {
    console.error('GET /api/enquiries failed:', error);
    return NextResponse.json({ error: 'Failed to load enquiries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const created = await createEnquiry(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    const mapped = mapDbError(error);
    if (mapped) return mapped;
    console.error('POST /api/enquiries failed:', error);
    return NextResponse.json({ error: 'Failed to save enquiry' }, { status: 500 });
  }
}
