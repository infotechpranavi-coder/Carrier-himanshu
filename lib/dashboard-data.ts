export type ShipmentStatus = 'Booked' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Delayed';

export type ShipmentMilestone = {
  id: string;
  status: string;
  location: string;
  date: string;
  done: boolean;
  current: boolean;
};

export type DashboardShipment = {
  id: string;
  docket: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  eta: string;
  updatedAt: string;
  milestones: ShipmentMilestone[];
};

export const DEFAULT_MILESTONE_STEPS = [
  'Booked',
  'Picked Up',
  'In Transit',
  'Out for Delivery',
  'Delivered',
] as const;

export function createInitialMilestone(origin = ''): ShipmentMilestone[] {
  return [
    {
      id: 'm-1',
      status: 'Booked',
      location: origin ? `${origin} Hub` : '',
      date: formatMilestoneDate(new Date()),
      done: true,
      current: true,
    },
  ];
}

export function createDefaultMilestones(origin: string, destination: string): ShipmentMilestone[] {
  const locations = [
    `${origin} Hub`,
    'Client Warehouse',
    `On the way to ${destination}`,
    `${destination} Distribution Center`,
    destination,
  ];

  return DEFAULT_MILESTONE_STEPS.map((status, index) => ({
    id: `m-${index + 1}`,
    status,
    location: locations[index] ?? destination,
    date: formatMilestoneDate(new Date()),
    done: index === 0,
    current: index === 0,
  }));
}

export function createEmptyMilestone(): ShipmentMilestone {
  return {
    id: `m-${Date.now()}`,
    status: '',
    location: '',
    date: formatMilestoneDate(new Date()),
    done: false,
    current: false,
  };
}

export function formatMilestoneDate(date: Date) {
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export function toDateTimeLocalValue(date: string) {
  if (!date.trim() || date.trim().toLowerCase() === 'pending') return '';

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return '';

  const pad = (value: number) => String(value).padStart(2, '0');
  return `${parsed.getFullYear()}-${pad(parsed.getMonth() + 1)}-${pad(parsed.getDate())}T${pad(parsed.getHours())}:${pad(parsed.getMinutes())}`;
}

export function fromDateTimeLocalValue(value: string) {
  if (!value) return formatMilestoneDate(new Date());
  return formatMilestoneDate(new Date(value));
}

function withMilestones(shipment: Omit<DashboardShipment, 'milestones'>): DashboardShipment {
  return {
    ...shipment,
    milestones: createDefaultMilestones(shipment.origin, shipment.destination),
  };
}

export const DASHBOARD_SHIPMENTS: DashboardShipment[] = [
  withMilestones({
    id: '1',
    docket: 'MSC10245891',
    origin: 'Mumbai',
    destination: 'Delhi',
    status: 'In Transit',
    eta: '18 Jun 2026',
    updatedAt: '17 Jun 2026, 09:15 AM',
  }),
  withMilestones({
    id: '2',
    docket: 'MSC10245892',
    origin: 'Ahmedabad',
    destination: 'Bengaluru',
    status: 'Out for Delivery',
    eta: '17 Jun 2026',
    updatedAt: '17 Jun 2026, 08:40 AM',
  }),
  withMilestones({
    id: '3',
    docket: 'MSC10245893',
    origin: 'Kolkata',
    destination: 'Chennai',
    status: 'Booked',
    eta: '20 Jun 2026',
    updatedAt: '16 Jun 2026, 06:30 PM',
  }),
  withMilestones({
    id: '4',
    docket: 'MSC10245894',
    origin: 'Pune',
    destination: 'Hyderabad',
    status: 'Delivered',
    eta: '16 Jun 2026',
    updatedAt: '16 Jun 2026, 04:20 PM',
  }),
  withMilestones({
    id: '5',
    docket: 'MSC10245895',
    origin: 'Delhi',
    destination: 'Jaipur',
    status: 'Delayed',
    eta: '18 Jun 2026',
    updatedAt: '17 Jun 2026, 07:55 AM',
  }),
  withMilestones({
    id: '6',
    docket: 'MSC10245896',
    origin: 'Nhava Sheva',
    destination: 'North India',
    status: 'In Transit',
    eta: '19 Jun 2026',
    updatedAt: '17 Jun 2026, 10:05 AM',
  }),
];

export const STATUS_STYLES: Record<ShipmentStatus, string> = {
  Booked: 'bg-white/10 text-white',
  'In Transit': 'bg-primary-red/20 text-primary-red',
  'Out for Delivery': 'bg-amber-500/20 text-amber-400',
  Delivered: 'bg-emerald-500/20 text-emerald-400',
  Delayed: 'bg-orange-500/20 text-orange-400',
};
