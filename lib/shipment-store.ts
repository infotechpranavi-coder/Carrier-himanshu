import type { DashboardShipment } from './dashboard-data';

export async function fetchShipments(): Promise<DashboardShipment[]> {
  const response = await fetch('/api/shipments');
  if (!response.ok) throw new Error('Failed to load shipments');
  return response.json();
}

export async function saveShipment(shipment: DashboardShipment): Promise<DashboardShipment> {
  const response = await fetch('/api/shipments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(shipment),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? 'Failed to save shipment');
  }

  return data;
}

export async function updateShipment(id: string, shipment: DashboardShipment): Promise<DashboardShipment> {
  const response = await fetch(`/api/shipments/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(shipment),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? 'Failed to update shipment');
  }

  return data;
}

export async function deleteShipment(id: string): Promise<'deleted' | 'not_found'> {
  const response = await fetch(`/api/shipments/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });

  if (response.status === 404) return 'not_found';

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error ?? 'Failed to delete shipment');
  }

  return 'deleted';
}

export async function trackShipmentByDocket(docket: string): Promise<DashboardShipment | null> {
  const response = await fetch(`/api/shipments/track?docket=${encodeURIComponent(docket.trim())}`);

  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Failed to track shipment');

  return response.json();
}
