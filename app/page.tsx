import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import HeroSlider from '@/components/HeroSlider';
import SectionHeading from '@/components/SectionHeading';
import ServiceCard from '@/components/ServiceCard';
import StatsCounter from '@/components/StatsCounter';
import WhyChooseUs from '@/components/WhyChooseUs';
import NetworkSection from '@/components/NetworkSection';
import ClientsMarquee from '@/components/ClientsMarquee';
import Testimonials from '@/components/Testimonials';
import QuoteForm from '@/components/QuoteForm';
import Reveal from '@/components/Reveal';
import { SERVICES } from '@/lib/constants';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Services Strip (Quick Links) */}
      <section className="bg-primary-red py-4 overflow-hidden hidden md:block">
        <Reveal className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-12 animate-pulse">
            {['Freight Transportation', 'Logistics & Distribution', 'Ground Transportation', 'Chemical Logistics', 'CFS Services', 'Project Cargo'].map((item, i) => (
              <div key={i} className="flex items-center text-white font-bold text-sm uppercase tracking-widest whitespace-nowrap">
                <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                {item}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 3. Services Section */}
      <section className="py-24 bg-white border-y border-primary-red/20">
        <Reveal className="container mx-auto px-4">
          <SectionHeading 
            title="MS Citizen Transit"
            subtitle="Providing state-of-the-art logistics and freight solutions tailored to your business needs."
            light
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link 
              href="/services"
              className="inline-flex items-center px-10 py-4 bg-white text-near-black font-black uppercase tracking-widest hover:bg-primary-red hover:text-white transition-all rounded-full shadow-2xl hover:shadow-[0_20px_50px_rgba(204,0,0,0.18)] hover:-translate-y-0.5"
            >
              View All Services
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* 4. Stats Counter Bar */}
      <StatsCounter light />

      {/* 5. Why Choose Us */}
      <WhyChooseUs light />

      {/* 6. Network Section */}
      <NetworkSection light />

      {/* 7. Industries (Brief) */}
      <section className="py-24 bg-near-black border-y border-primary-red/20">
        <Reveal className="container mx-auto px-4">
          <SectionHeading 
            title="Industries We Serve"
            subtitle="Specialized knowledge across 20+ industries ensures your cargo is handled by experts."
            align="center"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-16">
            {['FMCG', 'Chemical', 'Automotive', 'Pharma', 'Energy', 'Steel', 'Retail', 'Textiles', 'Agro', 'Construction', 'E-Com', 'Aerospace'].map((ind, i) => (
              <div key={i} className="bg-near-black border border-white/5 p-8 text-center rounded-2xl hover:border-primary-red hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(204,0,0,0.12)] transition-all duration-300 group cursor-default">
                <div className="text-xl font-bold uppercase tracking-tighter group-hover:text-primary-red transition-colors">{ind}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 8. Clients Marquee */}
      <Reveal>
        <ClientsMarquee />
      </Reveal>

      {/* 9. Testimonials */}
      <Testimonials light />

      
    </div>
  );
}
