"use client";

import React from 'react';
import { Send, CheckCircle } from 'lucide-react';

const QuoteForm = () => {
  return (
    <div id="quote" className="bg-card-bg p-8 md:p-12 rounded-3xl shadow-2xl border border-white/5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary-red/60 hover:shadow-[0_22px_60px_rgba(204,0,0,0.12)]">
      {/* Decorative background element */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-red/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <h3 className="text-3xl font-black uppercase mb-2">Request A Quote</h3>
        <p className="text-light-gray mb-10">Fill the form below and our experts will contact you within 2 hours.</p>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              type="text" 
              placeholder="Full Name *" 
              className="w-full bg-near-black border border-white/10 px-6 py-4 rounded-xl focus:border-primary-red outline-none transition-colors"
            />
            <input 
              type="text" 
              placeholder="Company Name" 
              className="w-full bg-near-black border border-white/10 px-6 py-4 rounded-xl focus:border-primary-red outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              type="text" 
              placeholder="Pickup City *" 
              className="w-full bg-near-black border border-white/10 px-6 py-4 rounded-xl focus:border-primary-red outline-none transition-colors"
            />
            <input 
              type="text" 
              placeholder="Delivery City *" 
              className="w-full bg-near-black border border-white/10 px-6 py-4 rounded-xl focus:border-primary-red outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <select className="w-full bg-near-black border border-white/10 px-6 py-4 rounded-xl focus:border-primary-red outline-none transition-colors appearance-none text-light-gray">
              <option>Service Type</option>
              <option>Full Truck Load</option>
              <option>Part Truck Load</option>
              <option>Chemical Logistics</option>
              <option>Warehousing</option>
            </select>
            <input 
              type="tel" 
              placeholder="Mobile Number *" 
              className="w-full bg-near-black border border-white/10 px-6 py-4 rounded-xl focus:border-primary-red outline-none transition-colors"
            />
          </div>

          <textarea 
            placeholder="Additional Message" 
            rows={4}
            className="w-full bg-near-black border border-white/10 px-6 py-4 rounded-xl focus:border-primary-red outline-none transition-colors"
          ></textarea>

          <button 
            type="button" 
            className="w-full py-5 bg-primary-red text-white font-black uppercase tracking-widest text-lg rounded-xl hover:bg-accent-red transition-all shadow-xl shadow-primary-red/20 flex items-center justify-center space-x-3"
          >
            <span>Submit Request</span>
            <Send className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center space-x-4 text-xs font-bold uppercase tracking-widest text-light-gray">
          <div className="flex items-center text-green-500">
            <CheckCircle className="w-4 h-4 mr-2" />
            <span>2-Hour Response</span>
          </div>
          <div className="w-1 h-1 bg-white/20 rounded-full"></div>
          <div className="flex items-center text-green-500">
            <CheckCircle className="w-4 h-4 mr-2" />
            <span>Privacy Guaranteed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
