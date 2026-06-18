"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { Briefcase, Plus, Search, Trash2, Pencil, X, Users, Mail, Phone } from 'lucide-react';
import { JOB_TYPES, type Career } from '@/lib/career-data';
import type { CareerApplication } from '@/lib/career-application-data';
import { fetchCareers, saveCareer, updateCareer, deleteCareer } from '@/lib/career-store';
import { fetchApplications, deleteApplication } from '@/lib/career-application-store';

const emptyCareerForm = {
  title: '',
  location: '',
  type: 'Full-time',
  department: '',
  description: '',
};

type DashboardCareersPanelProps = {
  onMessage?: (message: string, type?: 'success' | 'error') => void;
};

type CareersSubTab = 'jobs' | 'applicants';

const DashboardCareersPanel = ({ onMessage }: DashboardCareersPanelProps) => {
  const [activeSubTab, setActiveSubTab] = useState<CareersSubTab>('jobs');
  const [careers, setCareers] = useState<Career[]>([]);
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [query, setQuery] = useState('');
  const [applicationQuery, setApplicationQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isApplicationsLoading, setIsApplicationsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyCareerForm);
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingApplicationId, setDeletingApplicationId] = useState<string | null>(null);

  const inputClass =
    'w-full bg-near-black border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-red transition-colors';

  const loadCareers = () => {
    setIsLoading(true);
    fetchCareers()
      .then(setCareers)
      .catch(() => {
        setFormError('Failed to load careers from database.');
        onMessage?.('Failed to load careers from database.', 'error');
      })
      .finally(() => setIsLoading(false));
  };

  const loadApplications = () => {
    setIsApplicationsLoading(true);
    fetchApplications()
      .then(setApplications)
      .catch(() => onMessage?.('Failed to load applications from database.', 'error'))
      .finally(() => setIsApplicationsLoading(false));
  };

  useEffect(() => {
    loadCareers();
    loadApplications();
  }, []);

  const filteredCareers = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return careers;

    return careers.filter(
      (career) =>
        career.title.toLowerCase().includes(search) ||
        career.location.toLowerCase().includes(search) ||
        career.department.toLowerCase().includes(search) ||
        career.type.toLowerCase().includes(search),
    );
  }, [careers, query]);

  const filteredApplications = useMemo(() => {
    const search = applicationQuery.trim().toLowerCase();
    if (!search) return applications;

    return applications.filter(
      (app) =>
        app.fullName.toLowerCase().includes(search) ||
        app.jobTitle.toLowerCase().includes(search) ||
        app.email.toLowerCase().includes(search) ||
        app.mobile.toLowerCase().includes(search),
    );
  }, [applications, applicationQuery]);

  const openForm = () => {
    setEditingId(null);
    setForm(emptyCareerForm);
    setFormError('');
    setIsFormOpen(true);
  };

  const openEditForm = (career: Career) => {
    setEditingId(career.id);
    setForm({
      title: career.title,
      location: career.location,
      type: career.type,
      department: career.department,
      description: career.description,
    });
    setFormError('');
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setForm(emptyCareerForm);
    setFormError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim() || !form.location.trim() || !form.department.trim()) {
      setFormError('Please fill in title, location, and department.');
      return;
    }

    const payload = {
      id: editingId ?? String(Date.now()),
      title: form.title.trim(),
      location: form.location.trim(),
      type: form.type.trim() || 'Full-time',
      department: form.department.trim(),
      description: form.description.trim(),
      createdAt: editingId
        ? careers.find((c) => c.id === editingId)?.createdAt ?? ''
        : '',
    };

    try {
      setIsSaving(true);
      if (editingId) {
        await updateCareer(editingId, payload as Career);
        onMessage?.(`Job "${payload.title}" updated.`, 'success');
      } else {
        await saveCareer(payload);
        onMessage?.(`Job "${payload.title}" added to careers page.`, 'success');
      }
      closeForm();
      loadCareers();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save career.';
      setFormError(message);
      onMessage?.(message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (career: Career) => {
    const confirmed = window.confirm(`Delete job "${career.title}"?`);
    if (!confirmed) return;

    try {
      setDeletingId(career.id);
      const result = await deleteCareer(career.id);
      onMessage?.(
        result === 'deleted'
          ? `Job "${career.title}" removed.`
          : `Job "${career.title}" was already removed.`,
        'success',
      );
      loadCareers();
    } catch (error) {
      onMessage?.(error instanceof Error ? error.message : 'Failed to delete career.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteApplication = async (application: CareerApplication) => {
    const confirmed = window.confirm(`Delete application from ${application.fullName}?`);
    if (!confirmed) return;

    try {
      setDeletingApplicationId(application.id);
      const result = await deleteApplication(application.id);
      onMessage?.(
        result === 'deleted'
          ? `Application from ${application.fullName} removed.`
          : 'Application was already removed.',
        'success',
      );
      loadApplications();
    } catch (error) {
      onMessage?.(error instanceof Error ? error.message : 'Failed to delete application.', 'error');
    } finally {
      setDeletingApplicationId(null);
    }
  };

  return (
    <>
      <div className="bg-card-bg border border-white/5 rounded-3xl overflow-hidden">
        <div className="p-6 md:p-8 border-b border-white/5 flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-primary-red" />
                Careers
              </h2>
              <p className="text-light-gray text-sm mt-1">
                Manage open positions and view candidate applications.
              </p>
            </div>

            {activeSubTab === 'jobs' && (
              <button
                type="button"
                onClick={openForm}
                className="inline-flex items-center justify-center gap-2 bg-primary-red text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-accent-red transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
                Add Job
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveSubTab('jobs')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-colors ${
                activeSubTab === 'jobs'
                  ? 'bg-primary-red text-white'
                  : 'bg-near-black border border-white/10 text-light-gray hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Open Jobs
              {careers.length > 0 && (
                <span
                  className={`min-w-5 h-5 px-1 rounded-full text-[10px] flex items-center justify-center ${
                    activeSubTab === 'jobs' ? 'bg-white text-primary-red' : 'bg-primary-red/20 text-primary-red'
                  }`}
                >
                  {careers.length}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('applicants')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-colors ${
                activeSubTab === 'applicants'
                  ? 'bg-primary-red text-white'
                  : 'bg-near-black border border-white/10 text-light-gray hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              Applicants
              {applications.length > 0 && (
                <span
                  className={`min-w-5 h-5 px-1 rounded-full text-[10px] flex items-center justify-center ${
                    activeSubTab === 'applicants' ? 'bg-white text-primary-red' : 'bg-primary-red/20 text-primary-red'
                  }`}
                >
                  {applications.length}
                </span>
              )}
            </button>
          </div>

          {activeSubTab === 'jobs' ? (
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-red" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search job title, location, department..."
                className="w-full bg-near-black border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-primary-red transition-colors"
              />
            </div>
          ) : (
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-red" />
              <input
                type="text"
                value={applicationQuery}
                onChange={(e) => setApplicationQuery(e.target.value)}
                placeholder="Search candidate, job, email..."
                className="w-full bg-near-black border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-primary-red transition-colors"
              />
            </div>
          )}
        </div>

        {activeSubTab === 'jobs' ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="border-b border-primary-red/30 bg-near-black/50">
                    <th className="py-5 px-6 font-black uppercase tracking-widest text-primary-red text-xs">Title</th>
                    <th className="py-5 px-6 font-black uppercase tracking-widest text-primary-red text-xs">Department</th>
                    <th className="py-5 px-6 font-black uppercase tracking-widest text-primary-red text-xs">Location</th>
                    <th className="py-5 px-6 font-black uppercase tracking-widest text-primary-red text-xs">Type</th>
                    <th className="py-5 px-6 font-black uppercase tracking-widest text-primary-red text-xs">Added</th>
                    <th className="py-5 px-6 font-black uppercase tracking-widest text-primary-red text-xs">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-light-gray">
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="py-16 px-6 text-center text-white/50">
                        Loading careers from database...
                      </td>
                    </tr>
                  ) : filteredCareers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-16 px-6 text-center text-white/50">
                        No jobs yet. Add a position to show it on the careers page.
                      </td>
                    </tr>
                  ) : (
                    filteredCareers.map((career) => (
                      <tr key={career.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-5 px-6 font-bold text-white">{career.title}</td>
                        <td className="py-5 px-6">{career.department}</td>
                        <td className="py-5 px-6">{career.location}</td>
                        <td className="py-5 px-6">{career.type}</td>
                        <td className="py-5 px-6 text-sm whitespace-nowrap">{career.createdAt}</td>
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => openEditForm(career)}
                              className="inline-flex items-center gap-1 text-white font-bold uppercase tracking-widest text-xs hover:text-primary-red transition-colors"
                            >
                              <Pencil className="w-3 h-3" />
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(career)}
                              disabled={deletingId === career.id}
                              className="inline-flex items-center gap-1 text-orange-400 font-bold uppercase tracking-widest text-xs hover:text-primary-red transition-colors disabled:opacity-50"
                            >
                              <Trash2 className="w-3 h-3" />
                              {deletingId === career.id ? 'Deleting...' : 'Delete'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-6 border-t border-white/5 text-sm text-light-gray">
              Showing <strong className="text-white">{filteredCareers.length}</strong> of{' '}
              <strong className="text-white">{careers.length}</strong> jobs
            </div>
          </>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="border-b border-primary-red/30 bg-near-black/50">
                    <th className="py-5 px-6 font-black uppercase tracking-widest text-primary-red text-xs">Candidate</th>
                    <th className="py-5 px-6 font-black uppercase tracking-widest text-primary-red text-xs">Applied For</th>
                    <th className="py-5 px-6 font-black uppercase tracking-widest text-primary-red text-xs">Contact</th>
                    <th className="py-5 px-6 font-black uppercase tracking-widest text-primary-red text-xs">Experience</th>
                    <th className="py-5 px-6 font-black uppercase tracking-widest text-primary-red text-xs">Message</th>
                    <th className="py-5 px-6 font-black uppercase tracking-widest text-primary-red text-xs">Applied</th>
                    <th className="py-5 px-6 font-black uppercase tracking-widest text-primary-red text-xs">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-light-gray">
                  {isApplicationsLoading ? (
                    <tr>
                      <td colSpan={7} className="py-16 px-6 text-center text-white/50">
                        Loading applications...
                      </td>
                    </tr>
                  ) : filteredApplications.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-16 px-6 text-center text-white/50">
                        No applications yet. They will appear when candidates apply from the careers page.
                      </td>
                    </tr>
                  ) : (
                    filteredApplications.map((application) => (
                      <tr key={application.id} className="border-b border-white/5 hover:bg-white/5 transition-colors align-top">
                        <td className="py-5 px-6 font-bold text-white">{application.fullName}</td>
                        <td className="py-5 px-6">{application.jobTitle}</td>
                        <td className="py-5 px-6 text-sm space-y-1">
                          <p className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-primary-red shrink-0" />
                            {application.email}
                          </p>
                          <p className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-primary-red shrink-0" />
                            {application.mobile}
                          </p>
                        </td>
                        <td className="py-5 px-6 text-sm">
                          {application.experience || <span className="text-white/30">—</span>}
                        </td>
                        <td className="py-5 px-6 text-sm max-w-xs">
                          {application.message || <span className="text-white/30">—</span>}
                        </td>
                        <td className="py-5 px-6 text-sm whitespace-nowrap">{application.createdAt}</td>
                        <td className="py-5 px-6">
                          <button
                            type="button"
                            onClick={() => handleDeleteApplication(application)}
                            disabled={deletingApplicationId === application.id}
                            className="inline-flex items-center gap-1 text-orange-400 font-bold uppercase tracking-widest text-xs hover:text-primary-red transition-colors disabled:opacity-50"
                          >
                            <Trash2 className="w-3 h-3" />
                            {deletingApplicationId === application.id ? 'Deleting...' : 'Delete'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-6 border-t border-white/5 text-sm text-light-gray">
              Showing <strong className="text-white">{filteredApplications.length}</strong> of{' '}
              <strong className="text-white">{applications.length}</strong> applications
            </div>
          </>
        )}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close career form"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeForm}
          />
          <div className="relative w-full max-w-xl bg-card-bg border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-white/5 shrink-0">
              <h3 className="text-2xl font-black uppercase tracking-tight">
                {editingId ? 'Edit Job' : 'Add Job'}
              </h3>
              <button type="button" onClick={closeForm} className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
              {formError && (
                <p className="text-sm text-primary-red bg-primary-red/10 border border-primary-red/20 rounded-xl px-4 py-3">
                  {formError}
                </p>
              )}

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-light-gray mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Operations Manager"
                  className={inputClass}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-light-gray mb-2">
                    Department *
                  </label>
                  <input
                    type="text"
                    value={form.department}
                    onChange={(e) => setForm((prev) => ({ ...prev, department: e.target.value }))}
                    placeholder="Logistics"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-light-gray mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="Mumbai"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-light-gray mb-2">
                  Job Type
                </label>
                <select
                  value={form.type}
                  onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
                  className={inputClass}
                >
                  {JOB_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-light-gray mb-2">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Role summary and requirements..."
                  rows={4}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-primary-red text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-accent-red transition-colors disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : editingId ? 'Update Job' : 'Save to Careers Page'}
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
    </>
  );
};

export default DashboardCareersPanel;
