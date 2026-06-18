"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { trackShipmentByDocket } from '@/lib/shipment-store';
import { STATUS_STYLES, type DashboardShipment } from '@/lib/dashboard-data';
import ShipmentTrackingTimeline from '@/components/ShipmentTrackingTimeline';
import { getMilestoneProgress } from '@/lib/tracking-utils';
import { Search, Package, AlertCircle } from 'lucide-react';

const TrackingContent = () => {
  const searchParams = useSearchParams();
  const [trackingId, setTrackingId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<DashboardShipment | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const docket = searchParams.get('docket');
    if (!docket) return;

    setTrackingId(docket);
    trackShipmentByDocket(docket)
      .then((shipment) => {
        if (shipment) {
          setResult(shipment);
          setNotFound(false);
        }
      })
      .catch(() => setNotFound(true));
  }, [searchParams]);

  const handleTrack = async () => {
    if (!trackingId.trim()) return;
    setIsSearching(true);
    setNotFound(false);
    setResult(null);

    try {
      const shipment = await trackShipmentByDocket(trackingId);
      if (shipment) {
        setResult(shipment);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    } finally {
      setIsSearching(false);
    }
  };

  const progress = result ? getMilestoneProgress(result.milestones) : 0;

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
                    onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
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

            {notFound && (
              <div className="bg-card-bg rounded-3xl border border-orange-500/30 p-8 flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-orange-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-black uppercase mb-2">Shipment Not Found</h4>
                  <p className="text-light-gray text-sm">
                    No shipment found for <strong className="text-white">{trackingId}</strong>. Add it from the{' '}
                    <Link href="/dashboard" className="text-primary-red hover:text-white transition-colors">
                      dashboard
                    </Link>{' '}
                    with tracking milestones.
                  </p>
                </div>
              </div>
            )}

            {result && (
              <div className="bg-card-bg rounded-3xl border border-white/5 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500 transition-all hover:border-primary-red/60 hover:shadow-[0_22px_60px_rgba(204,0,0,0.12)]">
                <div className="bg-primary-red p-8 flex flex-col md:flex-row justify-between items-center text-white gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-1">Docket Number</p>
                    <h4 className="text-2xl font-black uppercase">{result.docket}</h4>
                    <p className="text-sm opacity-90 mt-2">
                      {result.origin} → {result.destination}
                    </p>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-1">Status</p>
                    <span className={`px-4 py-1 rounded-full font-black uppercase text-sm ${STATUS_STYLES[result.status]}`}>
                      {result.status}
                    </span>
                    <p className="text-xs mt-3 opacity-80">ETA: {result.eta}</p>
                  </div>
                </div>

                <div className="px-8 pt-6">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-light-gray mb-2">
                    <span>Tracking Progress</span>
                    <span className="text-primary-red">{progress}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-red transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="p-8 md:p-12">
                  <ShipmentTrackingTimeline
                    milestones={result.milestones}
                    eta={result.eta || undefined}
                    title={result.eta ? `Arriving by ${result.eta}` : undefined}
                    subtitle={`${result.origin} → ${result.destination}`}
                  />
                  <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
                    <span className="text-light-gray">Shipped with MSC Logistics</span>
                    <span className="text-primary-red font-bold">Tracking ID {result.docket}</span>
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

export default TrackingContent;
