import React from 'react';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { Leaf, Wind, Droplets, Zap } from 'lucide-react';

const CarbonPage = () => {
  return (
    <div className="flex flex-col w-full">
      <PageHero 
        title="Green Logistics" 
        image="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop"
      />

      {/* Intro */}
      <section className="py-24 bg-near-black">
        <Reveal className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <SectionHeading 
                title="Our Carbon Pledge"
                subtitle="Transitioning to a sustainable future, one mile at a time."
              />
              <div className="space-y-6 text-light-gray leading-relaxed text-lg">
                <p>
                  At MS Citizen Carrier, we recognize that the transport industry has a significant impact on the environment. We are committed to reducing our carbon footprint through innovative technology and sustainable operations.
                </p>
                <p>
                  Our "Green Logistics" initiative focuses on three key areas: transitioning our fleet to cleaner fuels, optimizing routes to reduce mileage, and investing in certified carbon offset programs.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'CNG Fleet', val: '40%', icon: Wind },
                  { label: 'Emission Reduced', val: '25%', icon: Leaf },
                  { label: 'Route Optimized', val: '15%', icon: Zap },
                  { label: 'Carbon Offset', val: '1000t', icon: Droplets },
                ].map((stat, i) => (
                  <div key={i} className="bg-card-bg p-8 rounded-3xl border border-white/5 text-center group hover:border-primary-red hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(204,0,0,0.12)] transition-all duration-300">
                    <stat.icon className="w-10 h-10 text-primary-red mx-auto mb-4" />
                    <div className="text-3xl font-black text-white mb-2">{stat.val}</div>
                    <div className="text-xs font-bold uppercase tracking-widest text-light-gray">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Sustainable Practices */}
      <section className="py-24 bg-section-dark">
        <Reveal className="container mx-auto px-4">
          <SectionHeading 
            title="ESG Initiatives"
            subtitle="Our commitment to Environmental, Social, and Governance excellence."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { title: 'Scope 3 Reporting', desc: 'Detailed carbon emission reports for our clients to help with their ESG compliance.' },
              { title: 'Sustainable Fleet', desc: 'Regular induction of BS-VI and CNG vehicles to ensure minimal environmental impact.' },
              { title: 'Zero Waste Hubs', desc: 'Transitioning our warehouses to solar power and zero-waste-to-landfill practices.' },
            ].map((item, i) => (
              <div key={i} className="bg-near-black p-12 rounded-3xl border border-white/5 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:border-primary-red/60 hover:shadow-[0_20px_55px_rgba(204,0,0,0.12)]">
                <div className="absolute top-0 left-0 w-1 h-0 bg-primary-red group-hover:h-full transition-all duration-500"></div>
                <h4 className="text-2xl font-black uppercase mb-6 group-hover:text-primary-red transition-colors">{item.title}</h4>
                <p className="text-light-gray leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default CarbonPage;
