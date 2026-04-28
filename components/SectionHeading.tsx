import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

const SectionHeading = ({ title, subtitle, align = 'left', light = false }: SectionHeadingProps) => {
  return (
    <div className={cn(
      "mb-12 relative",
      align === 'center' ? "text-center mx-auto" : "text-left"
    )}>
      <div className={cn(
        "inline-block h-1 bg-primary-red mb-4",
        align === 'center' ? "w-24" : "w-16"
      )}></div>
      <h2 className={cn(
        "text-4xl md:text-5xl font-black uppercase tracking-tight",
        light ? "text-near-black" : "text-white"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "mt-4 text-lg max-w-2xl leading-relaxed",
          light ? "text-gray-600" : "text-light-gray",
          align === 'center' ? "mx-auto" : ""
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
