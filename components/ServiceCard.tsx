"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, LucideIcon, Truck, Package, Warehouse, Construction, FlaskConical, Container } from 'lucide-react';
import { Service } from '@/lib/types';

const iconMap: Record<string, LucideIcon> = {
  Truck,
  Package,
  Warehouse,
  Construction,
  FlaskConical,
  Container,
};

const ServiceCard = ({ service }: { service: Service }) => {
  const Icon = iconMap[service.icon] || Truck;

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="group bg-card-bg rounded-xl overflow-hidden shadow-2xl relative flex flex-col h-full border border-white/5 transition-all duration-300 hover:border-primary-red/60 hover:shadow-[0_24px_80px_rgba(204,0,0,0.16)]"
    >
      {/* Red Border Slide In */}
      <div className="absolute top-0 left-0 w-1.5 h-0 bg-primary-red transition-all duration-500 group-hover:h-full z-10"></div>
      
      {/* Icon & Content */}
      <div className="p-8 flex flex-col flex-1">
        <div className="w-16 h-16 bg-near-black flex items-center justify-center rounded-lg mb-6 group-hover:bg-primary-red group-hover:scale-105 transition-all duration-500">
          <Icon className="w-8 h-8 text-primary-red group-hover:text-white transition-colors duration-500" />
        </div>
        
        <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-red transition-colors duration-300">
          {service.title}
        </h3>
        
        <p className="text-light-gray mb-8 line-clamp-3 group-hover:text-white/85 transition-colors duration-300">
          {service.shortDesc}
        </p>
        
        <div className="mt-auto">
          <Link 
            href={`/services/${service.slug}`}
            className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-primary-red group-hover:translate-x-2 transition-transform duration-300"
          >
            Learn More
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
