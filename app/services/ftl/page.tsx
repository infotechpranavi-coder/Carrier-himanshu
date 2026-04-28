import React from 'react';
import ServiceDetail from '@/components/ServiceDetail';
import { SERVICES } from '@/lib/constants';

export default function FTLPage() {
  const service = SERVICES.find(s => s.id === 'ftl')!;
  return <ServiceDetail service={service} />;
}
