import type { Career } from './career-data';

export async function fetchCareers(): Promise<Career[]> {
  const response = await fetch('/api/careers');
  if (!response.ok) throw new Error('Failed to load careers');
  return response.json();
}

export async function saveCareer(career: Omit<Career, 'id' | 'createdAt'> & { id?: string }): Promise<Career> {
  const response = await fetch('/api/careers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(career),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error ?? 'Failed to save career');
  return data;
}

export async function updateCareer(id: string, career: Career): Promise<Career> {
  const response = await fetch(`/api/careers/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(career),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error ?? 'Failed to update career');
  return data;
}

export async function deleteCareer(id: string): Promise<'deleted' | 'not_found'> {
  const response = await fetch(`/api/careers/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });

  if (response.status === 404) return 'not_found';
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error ?? 'Failed to delete career');
  }

  return 'deleted';
}
