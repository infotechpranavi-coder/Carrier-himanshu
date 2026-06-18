"use client";

import React, { useState } from 'react';
import { Send, X } from 'lucide-react';
import type { Career } from '@/lib/career-data';
import { submitApplication } from '@/lib/career-application-store';

type CareerApplyModalProps = {
  job: Career | null;
  onClose: () => void;
};

const emptyForm = {
  fullName: '',
  email: '',
  mobile: '',
  experience: '',
  message: '',
};

const CareerApplyModal = ({ job, onClose }: CareerApplyModalProps) => {
  const [form, setForm] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!job) return null;

  const inputClass =
    'w-full bg-near-black border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-red transition-colors';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.fullName.trim() || !form.email.trim() || !form.mobile.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      setIsSubmitting(true);
      await submitApplication({
        careerId: job.id,
        jobTitle: job.title,
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        mobile: form.mobile.trim(),
        experience: form.experience.trim(),
        message: form.message.trim(),
      });
      setSuccess(true);
      setForm(emptyForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close application form"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-card-bg border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-white/5 shrink-0">
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight">Apply for Role</h3>
            <p className="text-primary-red text-sm font-bold mt-1">{job.title}</p>
            <p className="text-light-gray text-xs mt-0.5">
              {job.department} · {job.location}
            </p>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {success ? (
            <div className="text-center py-8">
              <p className="text-emerald-400 font-bold text-lg mb-2">Application Submitted!</p>
              <p className="text-light-gray text-sm mb-6">
                Thank you for applying. Our HR team will contact you soon.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-primary-red text-white font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-accent-red transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <p className="text-sm text-primary-red bg-primary-red/10 border border-primary-red/20 rounded-xl px-4 py-3">
                  {error}
                </p>
              )}

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-light-gray mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
                  placeholder="Your full name"
                  className={inputClass}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-light-gray mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="you@email.com"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-light-gray mb-2">
                    Mobile *
                  </label>
                  <input
                    type="tel"
                    value={form.mobile}
                    onChange={(e) => setForm((prev) => ({ ...prev, mobile: e.target.value }))}
                    placeholder="9876543210"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-light-gray mb-2">
                  Experience
                </label>
                <input
                  type="text"
                  value={form.experience}
                  onChange={(e) => setForm((prev) => ({ ...prev, experience: e.target.value }))}
                  placeholder="e.g. 3 years in logistics"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-light-gray mb-2">
                  Cover Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder="Tell us why you are a good fit..."
                  rows={4}
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-primary-red text-white font-black uppercase tracking-widest text-sm rounded-xl hover:bg-accent-red transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerApplyModal;
