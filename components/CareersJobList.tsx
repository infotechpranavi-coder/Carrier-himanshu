"use client";

import React, { useState } from 'react';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import type { Career } from '@/lib/career-data';
import CareerApplyModal from '@/components/CareerApplyModal';

type CareersJobListProps = {
  jobs: Career[];
};

const CareersJobList = ({ jobs }: CareersJobListProps) => {
  const [selectedJob, setSelectedJob] = useState<Career | null>(null);

  if (jobs.length === 0) {
    return (
      <div className="bg-card-bg p-10 rounded-3xl border border-white/5 text-center text-light-gray">
        <p className="text-lg">No open positions at the moment.</p>
        <p className="text-sm mt-2">Please check back soon or send your resume to info@mscitizen.com</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-card-bg p-8 rounded-3xl border border-white/5 hover:border-primary-red transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-primary-red/10 text-primary-red text-[10px] font-black rounded uppercase tracking-widest">
                {job.department}
              </div>
              <h4 className="text-2xl font-black uppercase group-hover:text-primary-red transition-colors">
                {job.title}
              </h4>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-light-gray">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-primary-red" />
                  {job.location}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-primary-red" />
                  {job.type}
                </span>
              </div>
              {job.description && (
                <p className="text-sm text-light-gray leading-relaxed max-w-2xl">{job.description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSelectedJob(job)}
              className="px-8 py-4 bg-near-black border border-white/10 text-white font-bold uppercase tracking-widest text-sm hover:bg-primary-red hover:border-primary-red transition-all flex items-center justify-center group-hover:shadow-2xl shrink-0"
            >
              Apply Now <ArrowRight className="w-4 h-4 ml-3" />
            </button>
          </div>
        ))}
      </div>

      <CareerApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </>
  );
};

export default CareersJobList;
