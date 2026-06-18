"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsHydrated } from '@/lib/useIsHydrated';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const Reveal = ({ children, className, delay = 0 }: RevealProps) => {
  const isHydrated = useIsHydrated();

  return (
    <motion.div
      initial={isHydrated ? { opacity: 0, y: 28 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
