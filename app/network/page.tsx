import React from 'react';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import NetworkSection from '@/components/NetworkSection';
import Reveal from '@/components/Reveal';

const NetworkPage = () => {
  return (
    <div className="flex flex-col w-full">
      <PageHero title="Our Pan-India Network" />

      <Reveal>
        <NetworkSection />
      </Reveal>

      {/* Hub Directory */}
      <section className="py-24 bg-section-dark border-t border-white/5">
        <Reveal className="container mx-auto px-4">
          <SectionHeading 
            title="Strategic Hubs"
            subtitle="Our primary distribution centers located at the heart of India's industrial belts."
            align="center"
          />

          <div className="mt-16 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-primary-red">
                  <th className="py-6 px-4 font-black uppercase tracking-widest text-primary-red">Region</th>
                  <th className="py-6 px-4 font-black uppercase tracking-widest text-primary-red">Main Hub</th>
                  <th className="py-6 px-4 font-black uppercase tracking-widest text-primary-red">Coverage Cities</th>
                  <th className="py-6 px-4 font-black uppercase tracking-widest text-primary-red">Specialization</th>
                </tr>
              </thead>
              <tbody className="text-light-gray">
                {[
                  { region: 'North', hub: 'Delhi / NCR', cities: '30+ Cities', spec: 'FMCG & Industrial' },
                  { region: 'West', hub: 'Mumbai / Panvel', cities: '45+ Cities', spec: 'CFS & Chemical' },
                  { region: 'South', hub: 'Bengaluru', cities: '25+ Cities', spec: 'Pharma & Tech' },
                  { region: 'East', hub: 'Kolkata', cities: '20+ Cities', spec: 'Steel & Manufacturing' },
                  { region: 'Central', hub: 'Nagpur', cities: '15+ Cities', spec: 'Inter-state Transit' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-6 px-4 font-bold text-white">{row.region}</td>
                    <td className="py-6 px-4">{row.hub}</td>
                    <td className="py-6 px-4">{row.cities}</td>
                    <td className="py-6 px-4">
                      <span className="px-3 py-1 bg-primary-red/10 text-primary-red text-[10px] font-black rounded uppercase">
                        {row.spec}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default NetworkPage;
