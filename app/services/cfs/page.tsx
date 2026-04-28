import React from 'react';
import ServiceDetail from '@/components/ServiceDetail';
import { SERVICES } from '@/lib/constants';

export default function CFSPage() {
  const service = SERVICES.find(s => s.id === 'cfs')!;
  return <ServiceDetail service={service} />;
}
