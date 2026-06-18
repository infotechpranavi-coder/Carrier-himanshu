export type Enquiry = {
  id: string;
  fullName: string;
  companyName: string;
  pickupCity: string;
  deliveryCity: string;
  serviceType: string;
  mobile: string;
  message: string;
  createdAt: string;
};

export const SERVICE_TYPES = [
  'Full Truck Load',
  'Part Truck Load',
  'Chemical Logistics',
  'Warehousing',
] as const;

export function formatEnquiryDate(date: Date) {
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}
