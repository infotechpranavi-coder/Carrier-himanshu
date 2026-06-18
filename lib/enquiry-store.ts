import type { Enquiry } from './enquiry-data';

export async function fetchEnquiries(): Promise<Enquiry[]> {
  const response = await fetch('/api/enquiries');
  if (!response.ok) throw new Error('Failed to load enquiries');
  return response.json();
}

export async function submitEnquiry(enquiry: Omit<Enquiry, 'id' | 'createdAt'>): Promise<Enquiry> {
  const response = await fetch('/api/enquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(enquiry),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error ?? 'Failed to submit enquiry');
  }

  return data;
}

export async function deleteEnquiry(id: string): Promise<'deleted' | 'not_found'> {
  const response = await fetch(`/api/enquiries/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });

  if (response.status === 404) return 'not_found';
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error ?? 'Failed to delete enquiry');
  }

  return 'deleted';
}
