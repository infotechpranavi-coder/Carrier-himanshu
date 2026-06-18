import { NextResponse } from 'next/server';
import { deleteApplication } from '@/lib/career-applications-db';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    await deleteApplication(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === 'NOT_FOUND') {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }
    console.error('DELETE /api/career-applications/[id] failed:', error);
    return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 });
  }
}
