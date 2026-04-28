"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { WHY_POINTS } from '@/lib/constants';
import SectionHeading from './SectionHeading';

const WhyChooseUs = ({ light = false }: { light?: boolean }) => {
  return (
    <section className={light ? "py-24 bg-white border-y border-primary-red/20" : "py-24 bg-section-dark border-y border-primary-red/20"}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left: Image with Badge */}
          <div className="lg:w-1/2 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop"
                alt="Freight Truck"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary-red/20 mix-blend-overlay"></div>
            </div>
            
            {/* Experience Badge */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -right-8 bg-primary-red p-8 rounded-2xl shadow-2xl text-center hidden md:block"
            >
              <span className="text-5xl font-black block">15+</span>
              <span className="text-sm font-bold uppercase tracking-widest">Years of Excellence</span>
            </motion.div>
          </div>

          {/* Right: Content & List */}
          <div className="lg:w-1/2">
            <SectionHeading 
              title="Why Choose MS Citizen"
              subtitle="We combine decade-long experience with modern technology to deliver excellence in every shipment."
              light={light}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {WHY_POINTS.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex space-x-4 group"
                >
                  <div className="text-3xl font-black text-primary-red/20 group-hover:text-primary-red transition-colors duration-500">
                    {point.number}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold uppercase tracking-tight">{point.title}</h4>
                    <p className={light ? "text-gray-600 text-sm leading-relaxed" : "text-light-gray text-sm leading-relaxed"}>{point.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
