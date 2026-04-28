import React from 'react';
import ServiceDetail from '@/components/ServiceDetail';
import { SERVICES } from '@/lib/constants';

export default function ChemicalPage() {
  const service = SERVICES.find(s => s.id === 'chemical')!;
  return <ServiceDetail service={service} />;
}
