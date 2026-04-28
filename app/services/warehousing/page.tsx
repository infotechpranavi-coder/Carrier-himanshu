import React from 'react';
import ServiceDetail from '@/components/ServiceDetail';
import { SERVICES } from '@/lib/constants';

export default function WarehousingPage() {
  const service = SERVICES.find(s => s.id === 'warehousing')!;
  return <ServiceDetail service={service} />;
}
