import { NextResponse } from 'next/server';
import { deleteCareer, updateCareer } from '@/lib/careers-db';

type RouteContext = {
  params: Promise<{ id: string }>;
};

function mapDbError(error: unknown) {
  if (!(error instanceof Error)) {
    return NextResponse.json({ error: 'Failed to update career' }, { status: 500 });
  }

  switch (error.message) {
    case 'NOT_FOUND':
      return NextResponse.json({ error: 'Career not found' }, { status: 404 });
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

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const updated = await updateCareer(id, body);
    return NextResponse.json(updated);
  } catch (error) {
    const mapped = mapDbError(error);
    if (mapped) return mapped;
    console.error('PUT /api/careers/[id] failed:', error);
    return NextResponse.json({ error: 'Failed to update career' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    await deleteCareer(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === 'NOT_FOUND') {
      return NextResponse.json({ error: 'Career not found' }, { status: 404 });
    }
    console.error('DELETE /api/careers/[id] failed:', error);
    return NextResponse.json({ error: 'Failed to delete career' }, { status: 500 });
  }
}
