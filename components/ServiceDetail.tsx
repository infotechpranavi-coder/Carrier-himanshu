import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import PageHero from './PageHero';
import SectionHeading from './SectionHeading';
import QuoteForm from './QuoteForm';
import Reveal from './Reveal';
import { Service } from '@/lib/types';
import { SERVICES } from '@/lib/constants';

interface ServiceDetailProps {
  service: Service;
}

const ServiceDetail = ({ service }: ServiceDetailProps) => {
  return (
    <div className="flex flex-col w-full">
      <PageHero 
        title={service.title} 
        breadcrumb={[{ label: 'Services', href: '/services' }]}
      />

      <section className="py-24 bg-near-black">
        <Reveal className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Left Content */}
            <div className="lg:w-2/3">
              <SectionHeading 
                title={service.title}
                subtitle={service.shortDesc}
              />
              
              <div className="space-y-8 text-light-gray text-lg leading-relaxed">
                <p>{service.longDesc}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                  <div className="bg-card-bg p-8 rounded-2xl border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary-red/60 hover:shadow-[0_18px_45px_rgba(204,0,0,0.12)]">
                    <h4 className="text-xl font-bold text-white mb-6 uppercase">Key Benefits</h4>
                    <ul className="space-y-4">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start space-x-3">
                          <CheckCircle2 className="w-6 h-6 text-primary-red shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-card-bg p-8 rounded-2xl border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary-red/60 hover:shadow-[0_18px_45px_rgba(204,0,0,0.12)]">
                    <h4 className="text-xl font-bold text-white mb-6 uppercase">Industries Served</h4>
                    <ul className="space-y-4">
                      {service.industries.map((ind, i) => (
                        <li key={i} className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 bg-primary-red rounded-full mt-2.5"></div>
                          <span>{ind}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-12">
                  <h4 className="text-2xl font-black uppercase mb-8">Our Process</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {['Booking', 'Dispatch', 'In-Transit', 'Delivered'].map((step, i) => (
                      <div key={i} className="bg-section-dark p-6 rounded-xl text-center border-b-4 border-primary-red transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(204,0,0,0.12)]">
                        <span className="text-primary-red font-black text-2xl block mb-2">0{i+1}</span>
                        <span className="text-white font-bold uppercase text-sm tracking-widest">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:w-1/3 space-y-8">
              <div className="bg-card-bg p-8 rounded-2xl border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary-red/60 hover:shadow-[0_18px_45px_rgba(204,0,0,0.12)]">
                <h4 className="text-xl font-bold text-white mb-6 uppercase">Other Services</h4>
                <div className="space-y-4">
                  {SERVICES.filter(s => s.id !== service.id).map((s) => (
                    <Link 
                      key={s.id} 
                      href={`/services/${s.slug}`}
                    className="flex items-center justify-between p-4 bg-near-black rounded-xl hover:bg-primary-red transition-all duration-300 group hover:-translate-y-0.5"
                    >
                      <span className="font-bold uppercase text-sm">{s.title}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="bg-primary-red p-8 rounded-2xl text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(204,0,0,0.18)]">
                <h4 className="text-2xl font-black uppercase mb-4">Need Help?</h4>
                <p className="mb-8 opacity-90">Contact our experts today for any query regarding {service.title}.</p>
                <Link href="/contact" className="block w-full py-4 bg-white text-primary-red text-center font-black uppercase tracking-widest rounded-xl hover:bg-near-black hover:text-white transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Quote Section */}
      <section className="py-24 bg-section-dark border-t border-white/5">
        <Reveal className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <QuoteForm />
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default ServiceDetail;
