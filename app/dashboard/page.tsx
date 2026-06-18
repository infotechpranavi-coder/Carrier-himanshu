"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import {
  STATUS_STYLES,
  createDefaultMilestones,
  createInitialMilestone,
  createEmptyMilestone,
  formatMilestoneDate,
  type DashboardShipment,
  type ShipmentMilestone,
  type ShipmentStatus,
} from '@/lib/dashboard-data';
import { fetchShipments, saveShipment, updateShipment, deleteShipment } from '@/lib/shipment-store';
import { fetchEnquiries, deleteEnquiry as removeEnquiry } from '@/lib/enquiry-store';
import type { Enquiry } from '@/lib/enquiry-data';
import DashboardSidebar, { type DashboardTab } from '@/components/DashboardSidebar';
import ShipmentTrackingTimeline from '@/components/ShipmentTrackingTimeline';
import MilestoneEditor from '@/components/MilestoneEditor';
import {
  Search,
  Truck,
  Package,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  X,
  Trash2,
  Route,
  Pencil,
  Inbox,
  Phone,
} from 'lucide-react';

const STATUS_FILTERS: Array<ShipmentStatus | 'All'> = [
  'All',
  'Booked',
  'In Transit',
  'Out for Delivery',
  'Delivered',
  'Delayed',
];

const SHIPMENT_STATUSES: ShipmentStatus[] = [
  'Booked',
  'In Transit',
  'Out for Delivery',
  'Delivered',
  'Delayed',
];

const emptyForm = {
  docket: '',
  origin: '',
  destination: '',
  status: 'Booked' as ShipmentStatus,
  eta: '',
};

function formatUpdatedAt(date: Date) {
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function generateDocket() {
  return `MSC${Date.now().toString().slice(-8)}`;
}

function setCurrentMilestone(milestones: ShipmentMilestone[], id: string): ShipmentMilestone[] {
  return milestones.map((m) => ({ ...m, current: m.id === id }));
}

function toggleMilestoneDone(milestones: ShipmentMilestone[], id: string, done: boolean): ShipmentMilestone[] {
  return milestones.map((m) => {
    if (m.id !== id) return m;
    return {
      ...m,
      done,
      current: done,
      date: done && !m.date.trim() ? formatMilestoneDate(new Date()) : m.date,
    };
  });
}

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('tracker');
  const [shipments, setShipments] = useState<DashboardShipment[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [query, setQuery] = useState('');
  const [enquiryQuery, setEnquiryQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ShipmentStatus | 'All'>('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [milestones, setMilestones] = useState<ShipmentMilestone[]>(createInitialMilestone());
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isEnquiriesLoading, setIsEnquiriesLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingEnquiryId, setDeletingEnquiryId] = useState<string | null>(null);

  const loadShipments = () => {
    setIsLoading(true);
    fetchShipments()
      .then(setShipments)
      .catch(() => setFormError('Failed to load shipments from database.'))
      .finally(() => setIsLoading(false));
  };

  const loadEnquiries = () => {
    setIsEnquiriesLoading(true);
    fetchEnquiries()
      .then(setEnquiries)
      .catch(() => setFormError('Failed to load enquiries from database.'))
      .finally(() => setIsEnquiriesLoading(false));
  };

  useEffect(() => {
    loadShipments();
    loadEnquiries();
  }, []);

  const filteredShipments = useMemo(() => {
    return shipments.filter((shipment) => {
      const matchesStatus = statusFilter === 'All' || shipment.status === statusFilter;
      const search = query.trim().toLowerCase();
      const matchesQuery =
        !search ||
        shipment.docket.toLowerCase().includes(search) ||
        shipment.origin.toLowerCase().includes(search) ||
        shipment.destination.toLowerCase().includes(search);

      return matchesStatus && matchesQuery;
    });
  }, [query, statusFilter, shipments]);

  const filteredEnquiries = useMemo(() => {
    const search = enquiryQuery.trim().toLowerCase();
    if (!search) return enquiries;

    return enquiries.filter((enquiry) =>
      enquiry.fullName.toLowerCase().includes(search) ||
      enquiry.companyName.toLowerCase().includes(search) ||
      enquiry.pickupCity.toLowerCase().includes(search) ||
      enquiry.deliveryCity.toLowerCase().includes(search) ||
      enquiry.mobile.toLowerCase().includes(search) ||
      enquiry.serviceType.toLowerCase().includes(search),
    );
  }, [enquiryQuery, enquiries]);

  const stats = useMemo(() => {
    const total = shipments.length;
    const inTransit = shipments.filter((s) => s.status === 'In Transit').length;
    const delivered = shipments.filter((s) => s.status === 'Delivered').length;
    const delayed = shipments.filter((s) => s.status === 'Delayed').length;

    return { total, inTransit, delivered, delayed };
  }, [shipments]);

  const openForm = () => {
    setEditingId(null);
    setForm({ ...emptyForm, docket: generateDocket() });
    setMilestones(createInitialMilestone());
    setFormError('');
    setSuccessMessage('');
    setIsFormOpen(true);
  };

  const openEditForm = (shipment: DashboardShipment) => {
    setEditingId(shipment.id);
    setForm({
      docket: shipment.docket,
      origin: shipment.origin,
      destination: shipment.destination,
      status: shipment.status,
      eta: shipment.eta,
    });
    setMilestones(shipment.milestones?.length ? shipment.milestones : createInitialMilestone(shipment.origin));
    setFormError('');
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setMilestones(createInitialMilestone());
    setFormError('');
  };

  const applyDefaultMilestones = () => {
    const origin = form.origin.trim() || 'Origin';
    const destination = form.destination.trim() || 'Destination';
    setMilestones(createDefaultMilestones(origin, destination));
  };

  const updateMilestone = (id: string, patch: Partial<ShipmentMilestone>) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.origin.trim() || !form.destination.trim()) {
      setFormError('Please fill in required fields: Origin and Destination.');
      return;
    }

    const validMilestones = milestones.filter((m) => m.status.trim() && m.location.trim());
    if (validMilestones.length === 0) {
      setFormError('Add at least one tracking milestone with status and location.');
      return;
    }

    const docket = form.docket.trim() || generateDocket();

    const normalizedMilestones = validMilestones.map((m, index) => ({
      ...m,
      id: m.id || `m-${index + 1}`,
      status: m.status.trim(),
      location: m.location.trim(),
      current: m.current || (index === 0 && !validMilestones.some((item) => item.current)),
    }));

    const hasCurrent = normalizedMilestones.some((m) => m.current);
    if (!hasCurrent) {
      const firstDoneIndex = normalizedMilestones.findIndex((m) => m.done);
      if (firstDoneIndex >= 0) {
        normalizedMilestones[firstDoneIndex].current = true;
      } else {
        normalizedMilestones[0].current = true;
      }
    }

    const shipmentPayload: DashboardShipment = {
      id: editingId ?? String(Date.now()),
      docket,
      origin: form.origin.trim(),
      destination: form.destination.trim(),
      status: form.status,
      eta: form.eta.trim(),
      updatedAt: formatUpdatedAt(new Date()),
      milestones: normalizedMilestones,
    };

    try {
      setIsSaving(true);
      if (editingId) {
        await updateShipment(editingId, shipmentPayload);
        setSuccessMessage(`Shipment ${docket} updated in database.`);
      } else {
        await saveShipment(shipmentPayload);
        setSuccessMessage(`Shipment ${docket} saved to database.`);
      }
      closeForm();
      loadShipments();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Failed to save shipment to database.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (shipment: DashboardShipment) => {
    const confirmed = window.confirm(`Delete shipment ${shipment.docket}? This cannot be undone.`);
    if (!confirmed) return;

    try {
      setDeletingId(shipment.id);
      setFormError('');
      const result = await deleteShipment(shipment.id);
      if (result === 'deleted') {
        setSuccessMessage(`Shipment ${shipment.docket} removed from database.`);
      } else {
        setSuccessMessage(`Shipment ${shipment.docket} was already removed. List refreshed.`);
      }
      loadShipments();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Failed to delete shipment from database.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteEnquiry = async (enquiry: Enquiry) => {
    const confirmed = window.confirm(`Delete enquiry from ${enquiry.fullName}?`);
    if (!confirmed) return;

    try {
      setDeletingEnquiryId(enquiry.id);
      setFormError('');
      const result = await removeEnquiry(enquiry.id);
      if (result === 'deleted') {
        setSuccessMessage(`Enquiry from ${enquiry.fullName} removed.`);
      } else {
        setSuccessMessage('Enquiry was already removed. List refreshed.');
      }
      loadEnquiries();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Failed to delete enquiry.');
    } finally {
      setDeletingEnquiryId(null);
    }
  };

  const inputClass =
    'w-full bg-near-black border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-red transition-colors';

  return (
    <div className="flex flex-col w-full">
      <PageHero title="Operations Dashboard" breadcrumb={[{ label: 'Dashboard', href: '/dashboard' }]} />

      <section className="py-24 bg-near-black border-t border-white/5">
        <Reveal className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <DashboardSidebar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              enquiryCount={enquiries.length}
            />

            <div className="flex-1 min-w-0">
          {activeTab === 'tracker' && (
            <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Total Shipments', value: stats.total, icon: Package },
              { label: 'In Transit', value: stats.inTransit, icon: Truck },
              { label: 'Delivered', value: stats.delivered, icon: CheckCircle },
              { label: 'Delayed', value: stats.delayed, icon: AlertTriangle },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-card-bg border border-white/5 rounded-2xl p-6 hover:border-primary-red/40 transition-colors"
              >
                <item.icon className="w-6 h-6 text-primary-red mb-4" />
                <p className="text-3xl font-black">{item.value}</p>
                <p className="text-sm uppercase tracking-widest text-light-gray mt-1">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-card-bg border border-white/5 rounded-3xl overflow-hidden">
            {formError && !isFormOpen && (
              <div className="px-6 pt-6">
                <p className="text-sm text-primary-red bg-primary-red/10 border border-primary-red/20 rounded-xl px-4 py-3">
                  {formError}
                </p>
              </div>
            )}
            {successMessage && !isFormOpen && (
              <div className="px-6 pt-6">
                <p className="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                  {successMessage}
                </p>
              </div>
            )}
            <div className="p-6 md:p-8 border-b border-white/5 flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">Shipment List</h2>
                  <p className="text-light-gray text-sm mt-1">
                    View and manage active consignments across the pan-India network.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={openForm}
                  className="inline-flex items-center justify-center gap-2 bg-primary-red text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-accent-red transition-colors shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  Add Shipment
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-red" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search docket or route..."
                    className="w-full bg-near-black border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-primary-red transition-colors"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as ShipmentStatus | 'All')}
                  className="bg-near-black border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-red transition-colors"
                >
                  {STATUS_FILTERS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="border-b border-primary-red/30 bg-near-black/50">
                    <th className="py-5 px-6 font-black uppercase tracking-widest text-primary-red text-xs">Docket</th>
                    <th className="py-5 px-6 font-black uppercase tracking-widest text-primary-red text-xs">Route</th>
                    <th className="py-5 px-6 font-black uppercase tracking-widest text-primary-red text-xs">Status</th>
                    <th className="py-5 px-6 font-black uppercase tracking-widest text-primary-red text-xs">Milestones</th>
                    <th className="py-5 px-6 font-black uppercase tracking-widest text-primary-red text-xs">ETA</th>
                    <th className="py-5 px-6 font-black uppercase tracking-widest text-primary-red text-xs">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-light-gray">
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="py-16 px-6 text-center text-white/50">
                        Loading shipments from database...
                      </td>
                    </tr>
                  ) : filteredShipments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-16 px-6 text-center text-white/50">
                        No shipments match your search.
                      </td>
                    </tr>
                  ) : (
                    filteredShipments.map((shipment) => (
                      <tr
                        key={shipment.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-5 px-6 font-bold text-white">{shipment.docket}</td>
                        <td className="py-5 px-6">
                          {shipment.origin} <span className="text-primary-red">→</span> {shipment.destination}
                        </td>
                        <td className="py-5 px-6">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${STATUS_STYLES[shipment.status]}`}
                          >
                            {shipment.status}
                          </span>
                        </td>
                        <td className="py-5 px-6 text-sm">
                          {shipment.milestones?.filter((m) => m.done).length ?? 0} / {shipment.milestones?.length ?? 0}
                        </td>
                        <td className="py-5 px-6">{shipment.eta}</td>
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-3">
                            <Link
                              href={`/tracking?docket=${encodeURIComponent(shipment.docket)}`}
                              className="text-primary-red font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
                            >
                              Track
                            </Link>
                            <button
                              type="button"
                              onClick={() => openEditForm(shipment)}
                              className="inline-flex items-center gap-1 text-white font-bold uppercase tracking-widest text-xs hover:text-primary-red transition-colors"
                            >
                              <Pencil className="w-3 h-3" />
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(shipment)}
                              disabled={deletingId === shipment.id}
                              className="inline-flex items-center gap-1 text-orange-400 font-bold uppercase tracking-widest text-xs hover:text-primary-red transition-colors disabled:opacity-50"
                            >
                              <Trash2 className="w-3 h-3" />
                              {deletingId === shipment.id ? 'Deleting...' : 'Delete'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-6 border-t border-white/5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-sm text-light-gray">
              <span>
                Showing <strong className="text-white">{filteredShipments.length}</strong> of{' '}
                <strong className="text-white">{shipments.length}</strong> shipments
              </span>
              <Link
                href="/tracking"
                className="inline-flex items-center justify-center gap-2 text-primary-red font-bold uppercase tracking-widest hover:text-white transition-colors"
              >
                <Clock className="w-4 h-4" />
                Track a shipment
              </Link>
            </div>
          </div>
            </>
          )}

          {activeTab === 'enquiry' && (
            <div className="bg-card-bg border border-white/5 rounded-3xl overflow-hidden">
              {formError && (
                <div className="px-6 pt-6">
                  <p className="text-sm text-primary-red bg-primary-red/10 border border-primary-red/20 rounded-xl px-4 py-3">
                    {formError}
                  </p>
                </div>
              )}
              {successMessage && (
                <div className="px-6 pt-6">
                  <p className="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                    {successMessage}
                  </p>
                </div>
              )}

              <div className="p-6 md:p-8 border-b border-white/5 flex flex-col gap-4">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
                    <Inbox className="w-6 h-6 text-primary-red" />
                    Enquiry List
                  </h2>
                  <p className="text-light-gray text-sm mt-1">
                    Quote requests submitted from the contact page appear here.
                  </p>
                </div>

                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-red" />
                  <input
                    type="text"
                    value={enquiryQuery}
                    onChange={(e) => setEnquiryQuery(e.target.value)}
                    placeholder="Search name, route, mobile..."
                    className="w-full bg-near-black border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-primary-red transition-colors"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="border-b border-primary-red/30 bg-near-black/50">
                      <th className="py-5 px-6 font-black uppercase tracking-widest text-primary-red text-xs">Name</th>
                      <th className="py-5 px-6 font-black uppercase tracking-widest text-primary-red text-xs">Contact</th>
                      <th className="py-5 px-6 font-black uppercase tracking-widest text-primary-red text-xs">Route</th>
                      <th className="py-5 px-6 font-black uppercase tracking-widest text-primary-red text-xs">Service</th>
                      <th className="py-5 px-6 font-black uppercase tracking-widest text-primary-red text-xs">Message</th>
                      <th className="py-5 px-6 font-black uppercase tracking-widest text-primary-red text-xs">Submitted</th>
                      <th className="py-5 px-6 font-black uppercase tracking-widest text-primary-red text-xs">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-light-gray">
                    {isEnquiriesLoading ? (
                      <tr>
                        <td colSpan={7} className="py-16 px-6 text-center text-white/50">
                          Loading enquiries from database...
                        </td>
                      </tr>
                    ) : filteredEnquiries.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-16 px-6 text-center text-white/50">
                          No enquiries yet. Submissions from the contact page will show here.
                        </td>
                      </tr>
                    ) : (
                      filteredEnquiries.map((enquiry) => (
                        <tr key={enquiry.id} className="border-b border-white/5 hover:bg-white/5 transition-colors align-top">
                          <td className="py-5 px-6">
                            <p className="font-bold text-white">{enquiry.fullName}</p>
                            {enquiry.companyName && (
                              <p className="text-xs mt-1 text-light-gray">{enquiry.companyName}</p>
                            )}
                          </td>
                          <td className="py-5 px-6">
                            <p className="flex items-center gap-2 text-sm">
                              <Phone className="w-3.5 h-3.5 text-primary-red shrink-0" />
                              {enquiry.mobile}
                            </p>
                          </td>
                          <td className="py-5 px-6">
                            {enquiry.pickupCity} <span className="text-primary-red">→</span> {enquiry.deliveryCity}
                          </td>
                          <td className="py-5 px-6 text-sm">{enquiry.serviceType}</td>
                          <td className="py-5 px-6 text-sm max-w-xs">
                            {enquiry.message || <span className="text-white/30">—</span>}
                          </td>
                          <td className="py-5 px-6 text-sm whitespace-nowrap">{enquiry.createdAt}</td>
                          <td className="py-5 px-6">
                            <button
                              type="button"
                              onClick={() => handleDeleteEnquiry(enquiry)}
                              disabled={deletingEnquiryId === enquiry.id}
                              className="inline-flex items-center gap-1 text-orange-400 font-bold uppercase tracking-widest text-xs hover:text-primary-red transition-colors disabled:opacity-50"
                            >
                              <Trash2 className="w-3 h-3" />
                              {deletingEnquiryId === enquiry.id ? 'Deleting...' : 'Delete'}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="p-6 border-t border-white/5 text-sm text-light-gray">
                Showing <strong className="text-white">{filteredEnquiries.length}</strong> of{' '}
                <strong className="text-white">{enquiries.length}</strong> enquiries
              </div>
            </div>
          )}
            </div>
          </div>
        </Reveal>
      </section>

      {isFormOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close add shipment form"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeForm}
          />
          <div className="relative w-full max-w-4xl bg-card-bg border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-white/5 shrink-0">
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight">
                  {editingId ? 'Edit Shipment' : 'Add Shipment'}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeForm}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
              {formError && (
                <p className="text-sm text-primary-red bg-primary-red/10 border border-primary-red/20 rounded-xl px-4 py-3">
                  {formError}
                </p>
              )}

              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-primary-red mb-4">Shipment Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-light-gray mb-2">
                      Docket Number
                    </label>
                    <input
                      type="text"
                      value={form.docket}
                      onChange={(e) => setForm((prev) => ({ ...prev, docket: e.target.value.toUpperCase() }))}
                      placeholder="MSC12345678"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-light-gray mb-2">
                      Status
                    </label>
                    <select
                      value={form.status}
                      onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as ShipmentStatus }))}
                      className={inputClass}
                    >
                      {SHIPMENT_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-light-gray mb-2">
                      Origin *
                    </label>
                    <input
                      type="text"
                      value={form.origin}
                      onChange={(e) => setForm((prev) => ({ ...prev, origin: e.target.value }))}
                      placeholder="Mumbai"
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-light-gray mb-2">
                      Destination *
                    </label>
                    <input
                      type="text"
                      value={form.destination}
                      onChange={(e) => setForm((prev) => ({ ...prev, destination: e.target.value }))}
                      placeholder="Delhi"
                      className={inputClass}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-black uppercase tracking-widest text-light-gray mb-2">
                      ETA
                    </label>
                    <input
                      type="text"
                      value={form.eta}
                      onChange={(e) => setForm((prev) => ({ ...prev, eta: e.target.value }))}
                      placeholder="20 Jun 2026"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-widest text-primary-red flex items-center gap-2">
                      <Route className="w-4 h-4" />
                      Tracking Timeline
                    </h4>
                    <p className="text-light-gray text-xs mt-1">
                      Live preview of how customers will see tracking. Edit steps below.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={applyDefaultMilestones}
                      className="px-4 py-2 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors"
                    >
                      Use Default Route
                    </button>
                    <button
                      type="button"
                      onClick={() => setMilestones((prev) => [...prev, createEmptyMilestone()])}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-near-black border border-primary-red/30 text-primary-red text-xs font-bold uppercase tracking-widest hover:bg-primary-red/10 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      Add Step
                    </button>
                  </div>
                </div>

                <div className="bg-near-black border border-white/10 rounded-2xl p-5 mb-6">
                  <ShipmentTrackingTimeline
                    milestones={milestones}
                    eta={form.eta.trim() || undefined}
                    title={
                      form.eta.trim()
                        ? `Arriving by ${form.eta.trim()}`
                        : undefined
                    }
                    subtitle={
                      form.origin.trim() && form.destination.trim()
                        ? `${form.origin.trim()} → ${form.destination.trim()}`
                        : undefined
                    }
                    compact
                  />
                  {form.docket.trim() && (
                    <p className="text-xs text-primary-red mt-4 pt-4 border-t border-white/5">
                      Tracking ID {form.docket.trim()}
                    </p>
                  )}
                </div>

                <p className="text-xs font-black uppercase tracking-widest text-light-gray mb-3">
                  Edit Milestones
                </p>
                <div className="space-y-1">
                  {milestones.map((milestone, index) => (
                    <MilestoneEditor
                      key={milestone.id}
                      milestone={milestone}
                      index={index}
                      canDelete={milestones.length > 1}
                      inputClass={inputClass}
                      onUpdate={updateMilestone}
                      onToggleDone={(id, done) =>
                        setMilestones((prev) => toggleMilestoneDone(prev, id, done))
                      }
                      onSetCurrent={(id) => setMilestones((prev) => setCurrentMilestone(prev, id))}
                      onDelete={(id) => setMilestones((prev) => prev.filter((m) => m.id !== id))}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-white/5">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-primary-red text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-accent-red transition-colors disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                  {isSaving ? 'Saving to database...' : editingId ? 'Update Shipment' : 'Save to Database'}
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 px-6 py-3 rounded-xl border border-white/10 font-bold uppercase tracking-widest text-sm hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
