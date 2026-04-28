"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionHeading from './SectionHeading';

const corridors = [
  { from: 'Mumbai', to: 'Delhi', time: '48 Hrs' },
  { from: 'Nhava Sheva', to: 'North India', time: '72 Hrs' },
  { from: 'Gujarat Belt', to: 'PAN India', time: '60 Hrs' },
  { from: 'Mumbai', to: 'Bengaluru', time: '36 Hrs' },
  { from: 'Delhi', to: 'Kolkata', time: '72 Hrs' },
];

const NetworkSection = ({ light = false }: { light?: boolean }) => {
  return (
    <section className={light ? "py-24 bg-white border-y border-primary-red/20 relative overflow-hidden" : "py-24 bg-near-black border-y border-primary-red/20 relative overflow-hidden"}>
      {/* Background Glow */}
      <div className={light ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-red/5 rounded-full blur-[120px]" : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-red/5 rounded-full blur-[120px]"}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          {/* Left: Content */}
          <div className="lg:w-1/2">
            <SectionHeading 
              title="Pan-India Network"
              subtitle="Strategic presence across 300+ cities with specialized hubs in major industrial and chemical belts."
              light={light}
            />
            
            <div className="space-y-6 mt-10">
              <p className={light ? "text-gray-600 leading-relaxed" : "text-light-gray leading-relaxed"}>
                Our extensive network ensures that your cargo moves seamlessly across the country. With our own fleet and dedicated branch offices, we provide the control and reliability that third-party logistics often lack.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                {corridors.map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className={light ? "bg-white p-4 flex items-center justify-between border-l-2 border-primary-red group cursor-default shadow-md" : "bg-card-bg p-4 flex items-center justify-between border-l-2 border-primary-red group cursor-default"}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={light ? "text-near-black font-bold text-sm tracking-tight" : "text-white font-bold text-sm tracking-tight"}>
                        {item.from} <ArrowRight className="inline w-3 h-3 mx-1 text-primary-red" /> {item.to}
                      </div>
                    </div>
                    <span className="text-[10px] font-black bg-primary-red/20 text-primary-red px-2 py-1 rounded">
                      {item.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Mock India Map with Glowing Hubs */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-lg aspect-square">
              {/* Simplified India SVG Outline (Mock) */}
              <svg viewBox="0 0 100 100" className={light ? "w-full h-full text-near-black/10 fill-current" : "w-full h-full text-white/5 fill-current"}>
                <path d="M50 5 L60 15 L70 10 L80 20 L90 35 L85 50 L95 65 L80 80 L65 75 L50 95 L35 80 L20 85 L5 65 L15 50 L10 35 L20 20 L30 10 L40 15 Z" />
              </svg>
              
              {/* Glowing Dots (Hubs) */}
              {[
                { top: '20%', left: '45%', label: 'Delhi' },
                { top: '65%', left: '25%', label: 'Mumbai' },
                { top: '55%', left: '30%', label: 'Gujarat' },
                { top: '80%', left: '50%', label: 'Bengaluru' },
                { top: '45%', left: '75%', label: 'Kolkata' },
                { top: '85%', left: '35%', label: 'Chennai' },
              ].map((hub, i) => (
                <div key={i} className="absolute" style={{ top: hub.top, left: hub.left }}>
                  <div className="relative">
                    <motion.div 
                      animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -inset-2 bg-primary-red rounded-full"
                    />
                    <div className="w-2.5 h-2.5 bg-primary-red rounded-full relative z-10 shadow-[0_0_15px_rgba(204,0,0,0.8)]"></div>
                    <span className={light ? "absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-near-black whitespace-nowrap bg-white/90 px-2 py-0.5 rounded border border-black/10 opacity-0 lg:opacity-100" : "absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white whitespace-nowrap bg-near-black/80 px-2 py-0.5 rounded border border-white/10 opacity-0 lg:opacity-100"}>
                      {hub.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetworkSection;
