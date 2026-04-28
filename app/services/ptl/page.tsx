import React from 'react';
import ServiceDetail from '@/components/ServiceDetail';
import { SERVICES } from '@/lib/constants';

export default function PTLPage() {
  const service = SERVICES.find(s => s.id === 'ptl')!;
  return <ServiceDetail service={service} />;
}
