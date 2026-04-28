import React from 'react';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { MILESTONES } from '@/lib/constants';

const MilestonesPage = () => {
  return (
    <div className="flex flex-col w-full">
      <PageHero title="Our Journey" />

      <section className="py-24 bg-near-black">
        <Reveal className="container mx-auto px-4">
          <SectionHeading
            title="Years of Excellence"
            subtitle="The key milestones that have shaped MS Citizen Carrier."
            align="center"
          />

          <div className="max-w-4xl mx-auto mt-20 relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-primary-red/20 hidden md:block"></div>

            <div className="space-y-24 relative">
              {MILESTONES.map((milestone, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-center ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                  <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-20 md:text-right' : 'md:pl-20 md:text-left'} w-full`}>
                    <div className="bg-card-bg p-8 rounded-3xl border border-white/5 hover:border-primary-red hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(204,0,0,0.12)] transition-all duration-300 group">
                      <div className="text-4xl font-black text-primary-red mb-4">
                        {milestone.year}
                      </div>
                      <h4 className="text-2xl font-black uppercase mb-4 text-white group-hover:text-primary-red transition-colors">
                        {milestone.title}
                      </h4>
                      <p className="text-light-gray leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-near-black border-4 border-primary-red rounded-full z-10 hidden md:flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary-red rounded-full"></div>
                  </div>

                  <div className="md:w-1/2 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="py-24 bg-section-dark border-t border-white/5">
        <Reveal className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-black uppercase mb-12">Awards & Recognition</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              'Best Fleet Operator 2022',
              'Safety Excellence Award',
              'Green Logistics Partner',
              'Innovation in Supply Chain',
            ].map((award, i) => (
              <div key={i} className="p-8 border border-white/5 bg-near-black rounded-2xl group hover:border-primary-red hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(204,0,0,0.12)] transition-all duration-300">
                <div className="text-primary-red font-black text-4xl mb-4 opacity-20 group-hover:opacity-100 transition-opacity">★</div>
                <div className="font-bold uppercase text-sm tracking-widest">{award}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default MilestonesPage;
