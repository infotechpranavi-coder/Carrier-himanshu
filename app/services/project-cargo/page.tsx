import React from 'react';
import ServiceDetail from '@/components/ServiceDetail';
import { SERVICES } from '@/lib/constants';

export default function ProjectCargoPage() {
  const service = SERVICES.find(s => s.id === 'project-cargo')!;
  return <ServiceDetail service={service} />;
}
