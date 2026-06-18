"use client";

import React from 'react';
import { Inbox, Package } from 'lucide-react';

export type DashboardTab = 'tracker' | 'enquiry';

type DashboardSidebarProps = {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  enquiryCount: number;
};

const DashboardSidebar = ({ activeTab, onTabChange, enquiryCount }: DashboardSidebarProps) => {
  const items: Array<{ id: DashboardTab; label: string; icon: typeof Package }> = [
    { id: 'tracker', label: 'Tracker', icon: Package },
    { id: 'enquiry', label: 'Enquiry', icon: Inbox },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-card-bg border border-white/5 rounded-2xl p-3 lg:sticky lg:top-28">
        <p className="px-4 py-2 text-xs font-black uppercase tracking-widest text-light-gray">
          Dashboard
        </p>
        <nav className="space-y-1">
          {items.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors ${
                  isActive
                    ? 'bg-primary-red text-white'
                    : 'text-light-gray hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </span>
                {item.id === 'enquiry' && enquiryCount > 0 && (
                  <span
                    className={`min-w-6 h-6 px-1.5 rounded-full text-[10px] font-black flex items-center justify-center ${
                      isActive ? 'bg-white text-primary-red' : 'bg-primary-red/20 text-primary-red'
                    }`}
                  >
                    {enquiryCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
