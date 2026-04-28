"use client";

import React, { useState } from 'react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { Search, Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';

const TrackingPage = () => {
  const [trackingId, setTrackingId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleTrack = () => {
    if (!trackingId) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setShowResult(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full">
      <PageHero title="Track Your Shipment" />

      <section className="py-24 bg-near-black">
        <Reveal className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card-bg p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden mb-12 transition-all duration-300 hover:-translate-y-1 hover:border-primary-red/60 hover:shadow-[0_22px_60px_rgba(204,0,0,0.12)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-red/10 rounded-full -mr-16 -mt-16"></div>
              
              <h3 className="text-3xl font-black uppercase mb-8">Enter Docket / LR Number</h3>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Package className="absolute left-6 top-1/2 -translate-y-1/2 text-primary-red w-6 h-6" />
                  <input 
                    type="text" 
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="e.g. MSC12345678" 
                  className="w-full bg-near-black border border-white/10 pl-16 pr-6 py-5 rounded-2xl focus:border-primary-red outline-none transition-all duration-300 text-xl font-bold uppercase tracking-widest hover:border-primary-red/60"
                />
              </div>
                <button 
                  onClick={handleTrack}
                  disabled={isSearching}
                  className="bg-primary-red text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-accent-red hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50"
                >
                  {isSearching ? 'Tracking...' : 'Track Now'}
                  {!isSearching && <Search className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {showResult && (
              <div className="bg-card-bg rounded-3xl border border-white/5 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500 transition-all hover:border-primary-red/60 hover:shadow-[0_22px_60px_rgba(204,0,0,0.12)]">
                <div className="bg-primary-red p-8 flex flex-col md:flex-row justify-between items-center text-white">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-1">Docket Number</p>
                    <h4 className="text-2xl font-black uppercase">{trackingId}</h4>
                  </div>
                  <div className="mt-4 md:mt-0 text-center md:text-right">
                    <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-1">Status</p>
                    <span className="bg-white text-primary-red px-4 py-1 rounded-full font-black uppercase text-sm">In Transit</span>
                  </div>
                </div>

                <div className="p-8 md:p-12">
                  <div className="relative">
                    {/* Progress Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-1 bg-white/10"></div>
                    <div className="absolute left-8 top-0 h-1/2 w-1 bg-primary-red"></div>

                    <div className="space-y-12">
                      {[
                        { status: 'Booked', date: '25 Apr 2026, 10:30 AM', loc: 'Mumbai Hub', icon: Package, done: true },
                        { status: 'Picked Up', date: '25 Apr 2026, 04:45 PM', loc: 'Client Warehouse', icon: CheckCircle, done: true },
                        { status: 'In Transit', date: '26 Apr 2026, 02:15 AM', loc: 'On the way to Delhi', icon: Truck, done: true, current: true },
                        { status: 'Out for Delivery', date: 'Pending', loc: 'Delhi Distribution Center', icon: Clock, done: false },
                        { status: 'Delivered', date: 'Pending', loc: 'Destination', icon: MapPin, done: false },
                      ].map((step, i) => (
                        <div key={i} className={`relative pl-20 flex flex-col md:flex-row md:items-center justify-between group`}>
                          {/* Dot */}
                          <div className={`absolute left-4 -translate-x-1/2 w-8 h-8 rounded-full z-10 flex items-center justify-center transition-all ${step.done ? 'bg-primary-red shadow-[0_0_15px_rgba(204,0,0,0.5)]' : 'bg-near-black border-2 border-white/10'}`}>
                            <step.icon className={`w-4 h-4 ${step.done ? 'text-white' : 'text-white/20'}`} />
                          </div>
                          
                          <div>
                            <h5 className={`text-xl font-bold uppercase tracking-tight ${step.current ? 'text-primary-red' : step.done ? 'text-white' : 'text-white/30'}`}>
                              {step.status}
                            </h5>
                            <p className="text-sm text-light-gray">{step.loc}</p>
                          </div>
                          <div className="mt-2 md:mt-0 text-xs font-bold uppercase tracking-widest text-light-gray/50">
                            {step.date}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default TrackingPage;
