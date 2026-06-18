"use client";

import React from 'react';
import { Check, Package } from 'lucide-react';
import type { ShipmentMilestone } from '@/lib/dashboard-data';

type ShipmentTrackingTimelineProps = {
  milestones: ShipmentMilestone[];
  eta?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
};

const ShipmentTrackingTimeline = ({
  milestones,
  eta,
  title,
  subtitle,
  compact = false,
}: ShipmentTrackingTimelineProps) => {
  const currentStep = milestones.find((m) => m.current) ?? milestones.find((m) => m.done);
  const headerTitle = title ?? (eta ? `Arriving by ${eta}` : currentStep?.status ?? 'Tracking shipment');
  const headerSubtitle = subtitle ?? currentStep?.location;

  return (
    <div className={compact ? 'space-y-4' : 'space-y-6'}>
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
          <Package className="w-7 h-7 text-primary-red" />
        </div>
        <div>
          <h4 className={`font-bold text-primary-red ${compact ? 'text-lg' : 'text-2xl'}`}>
            {headerTitle}
          </h4>
          {headerSubtitle && (
            <p className={`text-light-gray mt-1 ${compact ? 'text-xs' : 'text-sm'}`}>
              {headerSubtitle}
            </p>
          )}
        </div>
      </div>

      <div className="relative pl-1">
        {milestones.map((step, index) => {
          const isLast = index === milestones.length - 1;
          const isDone = step.done;
          const isCurrent = step.current;
          const isPending = !isDone && !isCurrent;

          return (
            <div key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
              {!isLast && (
                <div
                  className={`absolute left-[11px] top-6 w-0.5 h-[calc(100%-8px)] ${
                    isDone ? 'bg-primary-red' : 'bg-white/15'
                  }`}
                />
              )}

              <div className="relative z-10 shrink-0">
                {isDone ? (
                  <div className="w-6 h-6 bg-primary-red flex items-center justify-center">
                    <Check className="w-4 h-4 text-white stroke-3" />
                  </div>
                ) : (
                  <div
                    className={`w-6 h-6 border-2 ${
                      isCurrent ? 'border-primary-red bg-primary-red/10' : 'border-white/20 bg-transparent'
                    }`}
                  />
                )}
              </div>

              <div className="flex-1 min-w-0 pt-0.5">
                <p
                  className={`text-sm leading-snug ${
                    isCurrent
                      ? 'font-bold text-white'
                      : isDone
                        ? 'text-white/90'
                        : 'text-white/35'
                  }`}
                >
                  {step.status || `Step ${index + 1}`}
                </p>
                {step.location && (
                  <p className={`text-xs mt-0.5 ${isPending ? 'text-white/25' : 'text-light-gray'}`}>
                    {step.location}
                  </p>
                )}
                {step.date && step.date.toLowerCase() !== 'pending' && (
                  <p className={`text-xs mt-1 ${isPending ? 'text-white/25' : 'text-white/50'}`}>
                    {step.date}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShipmentTrackingTimeline;
