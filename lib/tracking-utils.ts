import {
  CheckCircle,
  Clock,
  MapPin,
  Package,
  Truck,
  type LucideIcon,
} from 'lucide-react';
import type { ShipmentMilestone } from './dashboard-data';

export function getMilestoneIcon(status: string): LucideIcon {
  const key = status.toLowerCase();
  if (key.includes('book')) return Package;
  if (key.includes('pick')) return CheckCircle;
  if (key.includes('transit')) return Truck;
  if (key.includes('delivery')) return Clock;
  if (key.includes('deliver')) return MapPin;
  return Package;
}

export function getMilestoneProgress(milestones: ShipmentMilestone[]) {
  if (milestones.length === 0) return 0;
  const doneCount = milestones.filter((m) => m.done).length;
  return Math.round((doneCount / milestones.length) * 100);
}
