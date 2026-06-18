import type { CareerApplication } from './career-application-data';

export async function fetchApplications(): Promise<CareerApplication[]> {
  const response = await fetch('/api/career-applications');
  if (!response.ok) throw new Error('Failed to load applications');
  return response.json();
}

export async function submitApplication(
  application: Omit<CareerApplication, 'id' | 'createdAt'>,
): Promise<CareerApplication> {
  const response = await fetch('/api/career-applications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(application),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error ?? 'Failed to submit application');
  return data;
}

export async function deleteApplication(id: string): Promise<'deleted' | 'not_found'> {
  const response = await fetch(`/api/career-applications/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });

  if (response.status === 404) return 'not_found';
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error ?? 'Failed to delete application');
  }

  return 'deleted';
}
