"use client";

import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { SERVICE_TYPES } from '@/lib/enquiry-data';
import { submitEnquiry } from '@/lib/enquiry-store';

const emptyForm = {
  fullName: '',
  companyName: '',
  pickupCity: '',
  deliveryCity: '',
  serviceType: '',
  mobile: '',
  message: '',
};

const QuoteForm = () => {
  const [form, setForm] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const inputClass =
    'w-full bg-near-black border border-white/10 px-6 py-4 rounded-xl focus:border-primary-red outline-none transition-colors';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!form.fullName.trim() || !form.pickupCity.trim() || !form.deliveryCity.trim() || !form.mobile.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      setIsSubmitting(true);
      await submitEnquiry({
        fullName: form.fullName.trim(),
        companyName: form.companyName.trim(),
        pickupCity: form.pickupCity.trim(),
        deliveryCity: form.deliveryCity.trim(),
        serviceType: form.serviceType || 'Not specified',
        mobile: form.mobile.trim(),
        message: form.message.trim(),
      });
      setForm(emptyForm);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="quote" className="bg-card-bg p-8 md:p-12 rounded-3xl shadow-2xl border border-white/5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary-red/60 hover:shadow-[0_22px_60px_rgba(204,0,0,0.12)]">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-red/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <h3 className="text-3xl font-black uppercase mb-2">Request A Quote</h3>
        <p className="text-light-gray mb-10">Fill the form below and our experts will contact you within 2 hours.</p>

        {error && (
          <p className="mb-6 text-sm text-primary-red bg-primary-red/10 border border-primary-red/20 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        {success && (
          <p className="mb-6 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
            Your request has been submitted. Our team will contact you soon.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Full Name *"
              value={form.fullName}
              onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
              className={inputClass}
              required
            />
            <input
              type="text"
              placeholder="Company Name"
              value={form.companyName}
              onChange={(e) => setForm((prev) => ({ ...prev, companyName: e.target.value }))}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Pickup City *"
              value={form.pickupCity}
              onChange={(e) => setForm((prev) => ({ ...prev, pickupCity: e.target.value }))}
              className={inputClass}
              required
            />
            <input
              type="text"
              placeholder="Delivery City *"
              value={form.deliveryCity}
              onChange={(e) => setForm((prev) => ({ ...prev, deliveryCity: e.target.value }))}
              className={inputClass}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <select
              value={form.serviceType}
              onChange={(e) => setForm((prev) => ({ ...prev, serviceType: e.target.value }))}
              className={`${inputClass} appearance-none text-light-gray`}
            >
              <option value="">Service Type</option>
              {SERVICE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <input
              type="tel"
              placeholder="Mobile Number *"
              value={form.mobile}
              onChange={(e) => setForm((prev) => ({ ...prev, mobile: e.target.value }))}
              className={inputClass}
              required
            />
          </div>

          <textarea
            placeholder="Additional Message"
            rows={4}
            value={form.message}
            onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
            className={inputClass}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 bg-primary-red text-white font-black uppercase tracking-widest text-lg rounded-xl hover:bg-accent-red transition-all shadow-xl shadow-primary-red/20 flex items-center justify-center space-x-3 disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Submitting...' : 'Submit Request'}</span>
            <Send className="w-5 h-5" />
          </button>
        </form>

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
