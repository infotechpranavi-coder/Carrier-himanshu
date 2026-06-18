"use client";

import React from 'react';
import { Calendar, Check, Trash2 } from 'lucide-react';
import {
  fromDateTimeLocalValue,
  toDateTimeLocalValue,
  type ShipmentMilestone,
} from '@/lib/dashboard-data';

type MilestoneEditorProps = {
  milestone: ShipmentMilestone;
  index: number;
  canDelete: boolean;
  inputClass: string;
  onUpdate: (id: string, patch: Partial<ShipmentMilestone>) => void;
  onToggleDone: (id: string, done: boolean) => void;
  onSetCurrent: (id: string) => void;
  onDelete: (id: string) => void;
};

const MilestoneEditor = ({
  milestone,
  index,
  canDelete,
  inputClass,
  onUpdate,
  onToggleDone,
  onSetCurrent,
  onDelete,
}: MilestoneEditorProps) => {
  const isDone = milestone.done;
  const isCurrent = milestone.current;
  const dateTimeValue = toDateTimeLocalValue(milestone.date);

  return (
    <div className="relative flex gap-4">
      <div className="flex flex-col items-center shrink-0 pt-1">
        <button
          type="button"
          onClick={() => onToggleDone(milestone.id, !isDone)}
          className={`w-6 h-6 flex items-center justify-center transition-colors ${
            isDone ? 'bg-primary-red' : 'border-2 border-white/20 hover:border-primary-red/50'
          }`}
          aria-label={isDone ? 'Mark as not done' : 'Mark as done'}
        >
          {isDone && <Check className="w-4 h-4 text-white stroke-3" />}
        </button>
        <div className="w-0.5 flex-1 min-h-4 bg-white/10 mt-1" />
      </div>

      <div className="flex-1 bg-near-black border border-white/10 rounded-xl p-4 space-y-3 mb-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-black uppercase tracking-widest text-light-gray">
            Step {index + 1}
            {isCurrent && <span className="ml-2 text-primary-red">· Current</span>}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSetCurrent(milestone.id)}
              className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border transition-colors ${
                isCurrent
                  ? 'border-primary-red text-primary-red bg-primary-red/10'
                  : 'border-white/10 text-light-gray hover:border-primary-red/40'
              }`}
            >
              Set Current
            </button>
            {canDelete && (
              <button
                type="button"
                onClick={() => onDelete(milestone.id)}
                className="p-1.5 rounded-lg text-light-gray hover:text-primary-red hover:bg-primary-red/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            value={milestone.status}
            onChange={(e) => onUpdate(milestone.id, { status: e.target.value })}
            placeholder="Status e.g. Out for delivery"
            className={inputClass}
          />
          <input
            type="text"
            value={milestone.location}
            onChange={(e) => onUpdate(milestone.id, { location: e.target.value })}
            placeholder="Location e.g. Mumbai Hub"
            className={inputClass}
          />

          <div className="sm:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-light-gray flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-primary-red" />
              Date & Time
            </label>
            <input
              type="datetime-local"
              value={dateTimeValue}
              onChange={(e) => onUpdate(milestone.id, { date: fromDateTimeLocalValue(e.target.value) })}
              className={inputClass}
              required
            />
            {milestone.date && (
              <p className="text-xs text-light-gray">{milestone.date}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneEditor;
