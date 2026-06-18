"use client";

import React from 'react';
import { useIsHydrated } from '@/lib/useIsHydrated';

const HUBS = [
  { name: 'Delhi', x: 344.1, y: 320, labelDx: 14, labelDy: -4 },
  { name: 'Mumbai', x: 305.7, y: 597.9, labelDx: -62, labelDy: 4 },
  { name: 'Gujarat', x: 199.2, y: 481, labelDx: -68, labelDy: -4 },
  { name: 'Bengaluru', x: 302.1, y: 728.1, labelDx: 14, labelDy: 4 },
  { name: 'Kolkata', x: 637.1, y: 485.8, labelDx: 14, labelDy: -4 },
  { name: 'Chennai', x: 379.6, y: 835.6, labelDx: 14, labelDy: 4 },
];

type IndiaMapProps = {
  light?: boolean;
};

const IndiaMap = ({ light = false }: IndiaMapProps) => {
  const isHydrated = useIsHydrated();

  return (
    <div className="relative w-full aspect-square">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/in.svg"
        alt="Map of India"
        className={`absolute inset-0 h-full w-full object-contain ${light ? '' : 'opacity-[0.12] brightness-200'}`}
      />

      <svg
        viewBox="0 0 1000 1000"
        className="absolute inset-0 h-full w-full pointer-events-none"
        aria-hidden
      >
        <defs>
          <filter id="hub-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {HUBS.map((hub, i) => (
          <g key={hub.name} transform={`translate(${hub.x}, ${hub.y})`}>
            <circle
              r={18}
              fill="#CC0000"
              fillOpacity={0.25}
              className={isHydrated ? 'animate-hub-pulse' : undefined}
              style={isHydrated ? { animationDelay: `${i * 0.3}s` } : undefined}
            />
            <circle r={6} fill="#CC0000" filter="url(#hub-glow)" />
            <rect
              x={hub.labelDx}
              y={hub.labelDy - 10}
              width={hub.name.length * 7.5 + 16}
              height={20}
              rx={4}
              fill={light ? 'rgba(255,255,255,0.92)' : 'rgba(13,13,13,0.85)'}
              stroke={light ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)'}
              strokeWidth={1}
              className="hidden lg:block"
            />
            <text
              x={hub.labelDx + 8}
              y={hub.labelDy + 4}
              fontSize={14}
              fontWeight={700}
              fill={light ? '#0D0D0D' : '#ffffff'}
              className="hidden lg:block"
            >
              {hub.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default IndiaMap;
