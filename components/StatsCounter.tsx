"use client";

import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { STATS } from '@/lib/constants';

const StatsCounter = ({ light = false }: { light?: boolean }) => {
  return (
    <section className={light ? "py-20 bg-white border-y border-primary-red/20 relative overflow-hidden" : "py-20 bg-near-black border-y border-primary-red/20 relative overflow-hidden"}>
      {/* Decorative Red Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-red to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {STATS.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className={light ? "text-5xl md:text-6xl font-black text-near-black flex justify-center items-baseline" : "text-5xl md:text-6xl font-black text-white flex justify-center items-baseline"}>
                <CountUp end={stat.value} duration={3} enableScrollSpy scrollSpyOnce />
                <span className="text-primary-red ml-1">{stat.suffix}</span>
              </div>
              <div className="space-y-1">
                <p className="text-xl font-bold uppercase tracking-widest">{stat.label}</p>
                <p className={light ? "text-sm text-gray-600 uppercase tracking-tighter opacity-80" : "text-sm text-light-gray uppercase tracking-tighter opacity-60"}>{stat.sublabel}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
