import React, { useState, useEffect } from 'react';
import { Search, Eye, Filter, CheckCircle2, XCircle, Clock, GraduationCap, Calendar, UserCheck, Plus, ChevronDown } from 'lucide-react';
import CampusApplicationDetailsDrawer from './CampusApplicationDetailsDrawer';
import RejectReasonModal from './RejectReasonModal';
import RequestMoreInfoModal from './RequestMoreInfoModal';
import { MANTRA_CONFIG } from '../../mantra';

const API_BASE = MANTRA_CONFIG.apiBaseUrl !== undefined && MANTRA_CONFIG.apiBaseUrl !== null ? MANTRA_CONFIG.apiBaseUrl : (import.meta.env.PROD ? '' : 'http://localhost:5000');

const DEFAULT_REVIEWERS = [
  'Unassigned'
];

export default function CampusAdminDashboard() {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'more_info_required'
  const [dateFilter, setDateFilter] = useState('all'); // 'all' | 'today' | '7days' | '30days' | 'this_month'
  const [reviewerFilter, setReviewerFilter] = useState('all'); // 'all' | reviewerName
  const [searchQuery, setSearchQuery] = useState('');
  const [applicationsData, setApplicationsData] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Custom Reviewers State
  const [reviewerOptions, setReviewerOptions] = useState(DEFAULT_REVIEWERS);
  const [customReviewerApp, setCustomReviewerApp] = useState(null);
  const [customNameInput, setCustomNameInput] = useState('');

  // Modal & Drawer Controls
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [rejectModalApp, setRejectModalApp] = useState(null);
  const [requestInfoModalApp, setRequestInfoModalApp] = useState(null);

  useEffect(() => {
    fetchApplications();
    fetchAnalytics();
  }, [activeTab, searchQuery]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/campus-program/admin/applications?status=${activeTab}&search=${encodeURIComponent(searchQuery)}`);
      const json = await res.json();
      if (json.success) {
        setApplicationsData(json.data);
        const apps = json.data?.applications || [];
        const existingReviewers = apps
          .map(a => a.reviewed_by)
          .filter(r => r && r.trim() && r !== 'Unassigned');
        setReviewerOptions(prev => Array.from(new Set([...prev, ...existingReviewers])));
      }
    } catch (err) {
      console.error('[CampusAdminDashboard] Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/campus-program/admin/analytics`);
      const json = await res.json();
      if (json.success) {
        setAnalyticsData(json.data);
      }
    } catch (err) {
      console.error('[CampusAdminDashboard] Error fetching analytics:', err);
    }
  };

  const handleOpenDrawer = (appId) => {
    setSelectedAppId(appId);
    setIsDrawerOpen(true);
  };

  const handleReviewerChange = async (app, newReviewer) => {
    if (newReviewer === '__ADD_CUSTOM__') {
      setCustomReviewerApp(app);
      setCustomNameInput('');
      return;
    }

    await updateAppReviewer(app.id, newReviewer);
  };

  const updateAppReviewer = async (applicationId, reviewerName) => {
    try {
      const res = await fetch(`${API_BASE}/api/campus-program/admin/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId,
          action: 'under_review',
          reviewerId: reviewerName,
          reviewerNotes: `Assigned reviewer: ${reviewerName}`
        })
      });
      const json = await res.json();
      if (json.success) {
        fetchApplications();
      }
    } catch (err) {
      console.error('[CampusAdminDashboard] Error updating reviewer:', err);
    }
  };

  const handleCustomReviewerSubmit = async (e) => {
    e.preventDefault();
    const cleanName = customNameInput.trim();
    if (!cleanName || !customReviewerApp) return;

    if (!reviewerOptions.includes(cleanName)) {
      setReviewerOptions(prev => [...prev, cleanName]);
    }

    await updateAppReviewer(customReviewerApp.id, cleanName);
    setCustomReviewerApp(null);
    setCustomNameInput('');
  };

  const handleConfirmReject = async (reason) => {
    if (!rejectModalApp) return;
    try {
      const res = await fetch(`${API_BASE}/api/campus-program/admin/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: rejectModalApp.id,
          action: 'reject',
          reviewReason: reason,
          reviewerId: rejectModalApp.reviewed_by || 'Admin Reviewer'
        })
      });
      const json = await res.json();
      if (json.success) {
        setRejectModalApp(null);
        setIsDrawerOpen(false);
        fetchApplications();
        fetchAnalytics();
      }
    } catch (err) {
      console.error('[CampusAdminDashboard] Error rejecting:', err);
    }
  };

  const handleConfirmRequestInfo = async ({ requestedFields, reviewerNotes }) => {
    if (!requestInfoModalApp) return;
    try {
      const res = await fetch(`${API_BASE}/api/campus-program/admin/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: requestInfoModalApp.id,
          action: 'request_info',
          requestedFields,
          reviewerNotes,
          reviewerId: requestInfoModalApp.reviewed_by || 'Admin Reviewer'
        })
      });
      const json = await res.json();
      if (json.success) {
        setRequestInfoModalApp(null);
        setIsDrawerOpen(false);
        fetchApplications();
        fetchAnalytics();
      }
    } catch (err) {
      console.error('[CampusAdminDashboard] Error requesting info:', err);
    }
  };

  const getStatusBadge = (st) => {
    switch (st) {
      case 'approved':
        return <span style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '4px 12px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 900, whiteSpace: 'nowrap', display: 'inline-block' }}>Approved</span>;
      case 'rejected':
        return <span style={{ background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca', padding: '4px 12px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 900, whiteSpace: 'nowrap', display: 'inline-block' }}>Rejected</span>;
      case 'more_info_required':
        return <span style={{ background: '#fff7ed', color: '#c2410c', border: '1px solid #ffedd5', padding: '4px 12px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 900, whiteSpace: 'nowrap', display: 'inline-block' }}>Info Requested</span>;
      case 'under_review':
        return <span style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '4px 12px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 900, whiteSpace: 'nowrap', display: 'inline-block' }}>Under Review</span>;
      default:
        return <span style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0', padding: '4px 12px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 900, whiteSpace: 'nowrap', display: 'inline-block' }}>Submitted</span>;
    }
  };

  const statusCounts = applicationsData?.statusCounts || { all: 0, submitted: 0, under_review: 0, approved: 0, rejected: 0, more_info_required: 0 };
  let rawApplications = applicationsData?.applications || [];

  // Filter applications by Date Applied
  if (dateFilter !== 'all') {
    const now = new Date();
    rawApplications = rawApplications.filter(app => {
      const appDate = new Date(app.submitted_at || app.updated_at || Date.now());
      if (dateFilter === 'today') {
        return appDate.toDateString() === now.toDateString();
      } else if (dateFilter === '7days') {
        const diffMs = now.getTime() - appDate.getTime();
        return diffMs <= 7 * 24 * 60 * 60 * 1000;
      } else if (dateFilter === '30days') {
        const diffMs = now.getTime() - appDate.getTime();
        return diffMs <= 30 * 24 * 60 * 60 * 1000;
      } else if (dateFilter === 'this_month') {
        return appDate.getMonth() === now.getMonth() && appDate.getFullYear() === now.getFullYear();
      }
      return true;
    });
  }

  // Filter applications by Reviewer
  if (reviewerFilter !== 'all') {
    rawApplications = rawApplications.filter(app => {
      if (reviewerFilter === 'Unassigned') {
        return !app.reviewed_by || app.reviewed_by === 'Unassigned';
      }
      return app.reviewed_by === reviewerFilter;
    });
  }

  return (
    <div style={{ padding: '0 0 60px', display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      
      {/* Header Banner - Lighter Blue Gradient Tone */}
      <div style={{
        background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
        borderRadius: '24px',
        padding: '32px 36px',
        color: '#ffffff',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        boxShadow: '0 15px 35px -10px rgba(59, 130, 246, 0.3)',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '20px', background: 'rgba(255, 255, 255, 0.18)', border: '1px solid rgba(255, 255, 255, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)' }}>
            <GraduationCap size={30} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#bfdbfe', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Institutional Management
            </span>
            <h1 style={{ margin: '2px 0 0', fontSize: '1.6rem', fontWeight: 900, color: '#ffffff' }}>
              Campus Program
            </h1>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.12)', border: '1px solid rgba(255, 255, 255, 0.25)', padding: '10px 18px', borderRadius: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.72rem', color: '#dbeafe', fontWeight: 800 }}>Total Applicants</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff' }}>{analyticsData?.totalApplications || statusCounts.all}</div>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.12)', border: '1px solid rgba(255, 255, 255, 0.25)', padding: '10px 18px', borderRadius: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.72rem', color: '#dbeafe', fontWeight: 800 }}>Pending Review</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fef08a' }}>{analyticsData?.pendingCount || (statusCounts.submitted + statusCounts.under_review)}</div>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.12)', border: '1px solid rgba(255, 255, 255, 0.25)', padding: '10px 18px', borderRadius: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.72rem', color: '#dbeafe', fontWeight: 800 }}>Activation Rate</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#86efac' }}>{analyticsData?.activationRate || '0%'}</div>
          </div>
        </div>
      </div>

      {/* Admin Section Tabs & Date Filter Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: '#ffffff', padding: '16px 20px', borderRadius: '18px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: `All Applications (${statusCounts.all})` },
            { id: 'submitted', label: `Pending Review (${statusCounts.submitted + statusCounts.under_review})` },
            { id: 'approved', label: `Approved Members (${statusCounts.approved})` },
            { id: 'rejected', label: `Rejected (${statusCounts.rejected})` },
            { id: 'more_info_required', label: `Info Requested (${statusCounts.more_info_required})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '9px 16px',
                borderRadius: '10px',
                border: activeTab === tab.id ? 'none' : '1px solid #e2e8f0',
                background: activeTab === tab.id ? '#2563eb' : '#ffffff',
                color: activeTab === tab.id ? '#ffffff' : '#64748b',
                fontWeight: 800,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Explicit Filter Dropdowns: Date Applied, Current Status, Reviewer & Search */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          
          {/* 1. Date Applied Filter */}
          <div style={{ position: 'relative' }}>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              style={{
                padding: '8px 28px 8px 12px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#1e293b',
                outline: 'none',
                cursor: 'pointer',
                appearance: 'none'
              }}
            >
              <option value="all">Date Applied: All Time</option>
              <option value="today">Date Applied: Today</option>
              <option value="7days">Date Applied: Last 7 Days</option>
              <option value="30days">Date Applied: Last 30 Days</option>
              <option value="this_month">Date Applied: This Month</option>
            </select>
            <ChevronDown size={14} color="#64748b" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>

          {/* 2. Current Status Filter */}
          <div style={{ position: 'relative' }}>
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              style={{
                padding: '8px 28px 8px 12px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#1e293b',
                outline: 'none',
                cursor: 'pointer',
                appearance: 'none'
              }}
            >
              <option value="all">Status: All Statuses</option>
              <option value="submitted">Status: Pending Review</option>
              <option value="approved">Status: Approved Members</option>
              <option value="rejected">Status: Rejected</option>
              <option value="more_info_required">Status: Info Requested</option>
            </select>
            <ChevronDown size={14} color="#64748b" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>

          {/* 3. Reviewer Filter */}
          <div style={{ position: 'relative' }}>
            <select
              value={reviewerFilter}
              onChange={(e) => setReviewerFilter(e.target.value)}
              style={{
                padding: '8px 28px 8px 12px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#1e293b',
                outline: 'none',
                cursor: 'pointer',
                appearance: 'none'
              }}
            >
              <option value="all">Reviewer: All Reviewers</option>
              {reviewerOptions.map(rev => (
                <option key={rev} value={rev}>Reviewer: {rev}</option>
              ))}
            </select>
            <ChevronDown size={14} color="#64748b" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', width: '210px' }}>
            <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search name, college..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 10px 8px 30px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.8rem',
                color: '#0f172a',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

        </div>
      </div>

      {/* Main Applications Table - Compact Single-View Layout */}
      <div style={{ background: '#ffffff', borderRadius: '18px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
        <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
          <thead>
            <tr style={{ background: '#043263', borderBottom: '1px solid #03254c', color: '#ffffff', fontWeight: 800, fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <th style={{ padding: '12px 14px', width: '18%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Applicant Name</th>
              <th style={{ padding: '12px 14px', width: '15%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>University / College</th>
              <th style={{ padding: '12px 14px', width: '14%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Course / Year</th>
              <th style={{ padding: '12px 14px', width: '11%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Date Applied</th>
              <th style={{ padding: '12px 14px', width: '11%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Submissions</th>
              <th style={{ padding: '12px 14px', width: '11%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Current Status</th>
              <th style={{ padding: '12px 14px', width: '12%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Reviewer</th>
              <th style={{ padding: '12px 14px', width: '8%', textAlign: 'right', whiteSpace: 'nowrap' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} style={{ padding: '30px', textAlign: 'center', color: '#64748b', fontWeight: 700 }}>
                  Loading campus applications...
                </td>
              </tr>
            ) : rawApplications.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: '30px', textAlign: 'center', color: '#64748b', fontWeight: 700 }}>
                  No campus applications found matching current criteria.
                </td>
              </tr>
            ) : (
              rawApplications.map((app) => (
                <tr key={app.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s ease' }}>
                  
                  {/* Applicant Name with Ellipsis & Hover Tooltip */}
                  <td style={{ padding: '11px 12px', fontWeight: 800, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={`${app.full_name || 'Applicant'} (${app.email})`}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{app.full_name || 'Applicant'}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis' }}>{app.email}</div>
                  </td>

                  {/* University / College with Ellipsis & Hover Tooltip */}
                  <td style={{ padding: '11px 12px', color: '#334155', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={app.college}>
                    {app.college}
                  </td>

                  {/* Course / Year with Ellipsis & Hover Tooltip */}
                  <td style={{ padding: '11px 12px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={`${app.course} (${app.year})`}>
                    {app.course} ({app.year})
                  </td>

                  {/* Date Applied */}
                  <td style={{ padding: '11px 12px', color: '#64748b', fontSize: '0.78rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {new Date(app.submitted_at || app.updated_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>

                  {/* Submissions Count Column */}
                  <td style={{ padding: '11px 12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <span style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '2px 8px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 800 }}>
                      {app.version || 1} {(app.version || 1) === 1 ? 'Submission' : 'Submissions'}
                    </span>
                  </td>

                  {/* Current Status */}
                  <td style={{ padding: '11px 12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {getStatusBadge(app.application_status)}
                  </td>

                  {/* Reviewer Dropdown with Custom Name Option */}
                  <td style={{ padding: '11px 12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <select
                      value={app.reviewed_by || 'Unassigned'}
                      onChange={(e) => handleReviewerChange(app, e.target.value)}
                      style={{
                        padding: '4px 6px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        background: '#ffffff',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: app.reviewed_by ? '#0f172a' : '#64748b',
                        outline: 'none',
                        cursor: 'pointer',
                        maxWidth: '100%',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {reviewerOptions.map(rev => (
                        <option key={rev} value={rev}>{rev}</option>
                      ))}
                      <option value="__ADD_CUSTOM__">+ Add Custom...</option>
                    </select>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '10px 12px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <button
                      onClick={() => handleOpenDrawer(app.id)}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        background: '#ffffff',
                        color: '#1e293b',
                        fontWeight: 800,
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Eye size={13} color="#2563eb" /> View
                    </button>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Custom Reviewer Input Modal */}
      {customReviewerApp && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '24px 28px',
            maxWidth: '420px',
            width: '100%',
            boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ margin: '0 0 4px', fontSize: '1.1rem', fontWeight: 900, color: '#0f172a' }}>
              Assign Custom Reviewer Name
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '0.82rem', color: '#64748b' }}>
              Applicant: <strong>{customReviewerApp.full_name}</strong>
            </p>

            <form onSubmit={handleCustomReviewerSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                  Reviewer Full Name:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Michael Vance"
                  value={customNameInput}
                  onChange={(e) => setCustomNameInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.88rem',
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  autoFocus
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => setCustomReviewerApp(null)}
                  style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#475569', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 18px', borderRadius: '8px', border: 'none', background: '#2563eb', color: '#ffffff', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  Save & Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Right-Side Slide-Over Detail Drawer / Centered Modal */}
      <CampusApplicationDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        applicationId={selectedAppId}
        onActionSuccess={() => {
          fetchApplications();
          fetchAnalytics();
        }}
        onOpenRejectModal={(app) => setRejectModalApp(app)}
        onOpenRequestInfoModal={(app) => setRequestInfoModalApp(app)}
      />

      {/* Mandatory Rejection Reason Modal */}
      <RejectReasonModal
        isOpen={!!rejectModalApp}
        onClose={() => setRejectModalApp(null)}
        onSubmit={handleConfirmReject}
        applicantName={rejectModalApp?.full_name}
      />

      {/* Request More Information Modal */}
      <RequestMoreInfoModal
        isOpen={!!requestInfoModalApp}
        onClose={() => setRequestInfoModalApp(null)}
        onSubmit={handleConfirmRequestInfo}
        applicantName={requestInfoModalApp?.full_name}
      />

    </div>
  );
}
