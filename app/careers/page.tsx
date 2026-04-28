import React from 'react';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';

const jobs = [
  { title: 'Operations Manager', location: 'Mumbai', type: 'Full-time', dept: 'Logistics' },
  { title: 'Hazardous Cargo Specialist', location: 'Panvel', type: 'Full-time', dept: 'Safety' },
  { title: 'Business Development Executive', location: 'Delhi', type: 'Full-time', dept: 'Sales' },
  { title: 'Fleet Coordinator', location: 'Nagpur', type: 'Full-time', dept: 'Operations' },
];

const CareersPage = () => {
  return (
    <div className="flex flex-col w-full">
      <PageHero title="Join Our Team" />

      <section className="py-24 bg-near-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/3">
              <SectionHeading 
                title="Work With Us"
                subtitle="Build your career with India's fastest-growing road freight company."
              />
              <p className="text-light-gray leading-relaxed mb-8">
                We are always looking for passionate individuals who are ready to take on challenges and grow with us. At MS Citizen Carrier, we value integrity, safety, and innovation.
              </p>
              <div className="p-8 bg-card-bg rounded-2xl border-l-4 border-primary-red">
                <h4 className="text-xl font-bold uppercase mb-4">Why MS Citizen?</h4>
                <ul className="space-y-4 text-sm text-light-gray">
                  <li>• Industry-leading training programs</li>
                  <li>• Health and safety focus</li>
                  <li>• Competitive compensation</li>
                  <li>• Career growth opportunities</li>
                </ul>
              </div>
            </div>

            <div className="lg:w-2/3">
              <h3 className="text-3xl font-black uppercase mb-12">Open Positions</h3>
              <div className="space-y-6">
                {jobs.map((job, i) => (
                  <div key={i} className="bg-card-bg p-8 rounded-3xl border border-white/5 hover:border-primary-red transition-all group flex flex-col md:flex-row md:items-center justify-between">
                    <div className="space-y-4">
                      <div className="inline-block px-3 py-1 bg-primary-red/10 text-primary-red text-[10px] font-black rounded uppercase tracking-widest">
                        {job.dept}
                      </div>
                      <h4 className="text-2xl font-black uppercase group-hover:text-primary-red transition-colors">{job.title}</h4>
                      <div className="flex items-center space-x-6 text-sm text-light-gray">
                        <span className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-primary-red" /> {job.location}</span>
                        <span className="flex items-center"><Clock className="w-4 h-4 mr-2 text-primary-red" /> {job.type}</span>
                      </div>
                    </div>
                    <button className="mt-8 md:mt-0 px-8 py-4 bg-near-black border border-white/10 text-white font-bold uppercase tracking-widest text-sm hover:bg-primary-red hover:border-primary-red transition-all flex items-center justify-center group-hover:shadow-2xl">
                      Apply Now <ArrowRight className="w-4 h-4 ml-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-24 bg-section-dark border-t border-white/5">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Our Culture"
            subtitle="Creating a workplace that fosters growth and excellence."
            align="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop'
            ].map((img, i) => (
              <div key={i} className="aspect-video relative rounded-3xl overflow-hidden shadow-2xl">
                <Image src={img} alt="Culture" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
