import { NextResponse } from 'next/server';
import { createApplication, getAllApplications } from '@/lib/career-applications-db';

function mapDbError(error: unknown) {
  if (!(error instanceof Error)) {
    return NextResponse.json({ error: 'Failed to save application' }, { status: 500 });
  }

  switch (error.message) {
    case 'MISSING_JOB':
      return NextResponse.json({ error: 'Job information is required.' }, { status: 400 });
    case 'MISSING_NAME':
      return NextResponse.json({ error: 'Full name is required.' }, { status: 400 });
    case 'MISSING_EMAIL':
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    case 'MISSING_MOBILE':
      return NextResponse.json({ error: 'Mobile number is required.' }, { status: 400 });
    case 'INVALID_PAYLOAD':
      return NextResponse.json({ error: 'Invalid application data.' }, { status: 400 });
    default:
      return null;
  }
}

export async function GET() {
  try {
    const applications = await getAllApplications();
    return NextResponse.json(applications);
  } catch (error) {
    console.error('GET /api/career-applications failed:', error);
    return NextResponse.json({ error: 'Failed to load applications' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const created = await createApplication(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    const mapped = mapDbError(error);
    if (mapped) return mapped;
    console.error('POST /api/career-applications failed:', error);
    return NextResponse.json({ error: 'Failed to save application' }, { status: 500 });
  }
}
