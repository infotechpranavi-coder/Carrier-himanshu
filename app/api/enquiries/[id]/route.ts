import { NextResponse } from 'next/server';
import { deleteEnquiry } from '@/lib/enquiries-db';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    await deleteEnquiry(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === 'NOT_FOUND') {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }
    console.error('DELETE /api/enquiries/[id] failed:', error);
    return NextResponse.json({ error: 'Failed to delete enquiry' }, { status: 500 });
  }
}
