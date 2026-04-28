import React from 'react';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { Target, Eye, Shield, Zap } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="flex flex-col w-full">
      <PageHero title="About MS Citizen" />

      {/* Story Section */}
      <section className="py-24 bg-near-black">
        <Reveal className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <SectionHeading 
                title="Our Journey"
                subtitle="From a small fleet to a pan-India logistics powerhouse."
              />
              <div className="space-y-6 text-light-gray leading-relaxed text-lg">
                <p>
                  Founded in 2010, MS Citizen Carrier Pvt. Ltd. was built on the foundation of reliability and safety. What started with just five trucks has now grown into a comprehensive logistics solution provider with over 500 company-owned vehicles.
                </p>
                <p>
                  Our specialization in chemical logistics and Hazmat cargo sets us apart in the industry. We understand the complexities of transporting sensitive materials and have invested heavily in the right equipment, training, and certifications to ensure absolute safety.
                </p>
                <p>
                  Today, we serve some of India's largest companies across various sectors, providing them with the transparency and efficiency they need to stay competitive in a fast-paced market.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="aspect-video relative rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075&auto=format&fit=crop"
                  alt="Our Warehouse"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-primary-red p-10 rounded-3xl hidden md:block">
                <span className="text-4xl font-black block">15+</span>
                <span className="text-sm font-bold uppercase tracking-widest">Years Experience</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-section-dark">
        <Reveal className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-card-bg p-12 rounded-3xl border border-white/5 relative overflow-hidden group transition-all duration-300 hover:border-primary-red/60 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(204,0,0,0.12)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-red/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              <Target className="w-16 h-16 text-primary-red mb-8" />
              <h3 className="text-3xl font-black uppercase mb-6">Our Mission</h3>
              <p className="text-light-gray text-lg leading-relaxed">
                To provide safe, reliable, and technology-driven logistics solutions that empower our clients' supply chains and drive business growth through excellence in execution.
              </p>
            </div>
            
            <div className="bg-card-bg p-12 rounded-3xl border border-white/5 relative overflow-hidden group transition-all duration-300 hover:border-primary-red/60 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(204,0,0,0.12)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-red/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              <Eye className="w-16 h-16 text-primary-red mb-8" />
              <h3 className="text-3xl font-black uppercase mb-6">Our Vision</h3>
              <p className="text-light-gray text-lg leading-relaxed">
                To be India's most preferred road freight partner, recognized for our commitment to safety, innovation, and sustainable logistics practices.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-near-black">
        <Reveal className="container mx-auto px-4 text-center">
          <SectionHeading 
            title="Our Core Values"
            subtitle="The principles that guide every decision we make."
            align="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {[
              { title: 'Reliability', icon: Shield, desc: 'We deliver on our promises, every single time.' },
              { title: 'Safety First', icon: Zap, desc: 'Uncompromising safety standards for our people and your cargo.' },
              { title: 'Innovation', icon: Eye, desc: 'Leveraging technology to solve complex logistics challenges.' },
              { title: 'Integrity', icon: Target, desc: 'Transparency and honesty in all our business dealings.' },
            ].map((value, i) => (
              <div key={i} className="bg-card-bg p-10 rounded-2xl border border-white/5 hover:border-primary-red hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(204,0,0,0.12)] transition-all duration-300 group">
                <div className="w-16 h-16 bg-near-black flex items-center justify-center rounded-xl mx-auto mb-6 group-hover:bg-primary-red transition-colors">
                  <value.icon className="w-8 h-8 text-primary-red group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-xl font-bold uppercase mb-4">{value.title}</h4>
                <p className="text-light-gray text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default AboutPage;
