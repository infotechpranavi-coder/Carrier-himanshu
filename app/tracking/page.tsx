import React, { Suspense } from 'react';
import TrackingContent from '@/components/TrackingContent';

const TrackingPage = () => {
  return (
    <Suspense fallback={<div className="min-h-[50vh] bg-near-black" />}>
      <TrackingContent />
    </Suspense>
  );
};

export default TrackingPage;
