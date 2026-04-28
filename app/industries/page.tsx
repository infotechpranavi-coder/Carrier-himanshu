import React from 'react';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { INDUSTRIES } from '@/lib/constants';
import { ShoppingBag, FlaskConical, Car, Stethoscope, Sun, Store, LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  ShoppingBag,
  FlaskConical,
  Car,
  Stethoscope,
  Sun,
  Store,
};

const IndustriesPage = () => {
  return (
    <div className="flex flex-col w-full">
      <PageHero title="Industries We Serve" />

      <section className="py-24 bg-near-black">
        <Reveal className="container mx-auto px-4">
          <SectionHeading 
            title="Specialized Solutions"
            subtitle="We provide tailored logistics for a wide range of industrial sectors."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {INDUSTRIES.map((industry) => {
              const Icon = iconMap[industry.icon] || ShoppingBag;
                return (
                  <div 
                    key={industry.id} 
                    id={industry.anchor}
                    className="bg-card-bg p-10 rounded-3xl border border-white/5 hover:border-primary-red hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(204,0,0,0.12)] transition-all duration-300 group"
                  >
                    <div className="w-16 h-16 bg-near-black flex items-center justify-center rounded-2xl mb-8 group-hover:bg-primary-red transition-colors duration-500">
                      <Icon className="w-8 h-8 text-primary-red group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-2xl font-black uppercase mb-4">{industry.title}</h3>
                  <p className="text-light-gray leading-relaxed">{industry.description}</p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* Full List Strip */}
      <section className="py-20 bg-section-dark border-t border-white/5">
        <Reveal className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-black uppercase mb-12">Complete Industry Coverage</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['Steel', 'Construction', 'Aerospace', 'E-Commerce', 'Textiles', 'Agriculture', 'Electronics', 'Manufacturing', 'Infrastructure', 'Oil & Gas'].map((ind, i) => (
              <span key={i} className="px-6 py-3 bg-card-bg border border-white/10 rounded-full text-sm font-bold uppercase tracking-widest text-light-gray hover:text-primary-red hover:border-primary-red hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                {ind}
              </span>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default IndustriesPage;
