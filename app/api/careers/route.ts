import { NextResponse } from 'next/server';
import { createCareer, getAllCareers } from '@/lib/careers-db';

function mapDbError(error: unknown) {
  if (!(error instanceof Error)) {
    return NextResponse.json({ error: 'Failed to save career' }, { status: 500 });
  }

  switch (error.message) {
    case 'MISSING_TITLE':
      return NextResponse.json({ error: 'Job title is required.' }, { status: 400 });
    case 'MISSING_LOCATION':
      return NextResponse.json({ error: 'Location is required.' }, { status: 400 });
    case 'MISSING_DEPARTMENT':
      return NextResponse.json({ error: 'Department is required.' }, { status: 400 });
    case 'INVALID_PAYLOAD':
      return NextResponse.json({ error: 'Invalid career data.' }, { status: 400 });
    default:
      return null;
  }
}

export async function GET() {
  try {
    const careers = await getAllCareers();
    return NextResponse.json(careers);
  } catch (error) {
    console.error('GET /api/careers failed:', error);
    return NextResponse.json({ error: 'Failed to load careers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const created = await createCareer(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    const mapped = mapDbError(error);
    if (mapped) return mapped;
    console.error('POST /api/careers failed:', error);
    return NextResponse.json({ error: 'Failed to create career' }, { status: 500 });
  }
}
