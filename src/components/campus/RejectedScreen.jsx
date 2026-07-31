import React, { useState } from 'react';
import { XCircle, Mail, ArrowLeft, RefreshCw, Send, Sparkles } from 'lucide-react';
import CampusApplicationModal from './application/CampusApplicationModal';
import { MANTRA_CONFIG } from '../../mantra';

const API_BASE = MANTRA_CONFIG.apiBaseUrl !== undefined && MANTRA_CONFIG.apiBaseUrl !== null ? MANTRA_CONFIG.apiBaseUrl : (import.meta.env.PROD ? '' : 'http://localhost:5000');

export default function RejectedScreen({ statusData, onResubmitVersionSuccess, onBack }) {
  const application = statusData?.application || {};
  const reviewReason = application?.review_reason || application?.reviewer_notes || 'Application did not meet current cohort selection criteria.';

  const [showResubmitModal, setShowResubmitModal] = useState(false);

  const handleResubmitVersion = async (formData) => {
    try {
      const userId = statusData?.userId || application.user_id;
      const res = await fetch(`${API_BASE}/api/campus-program/application/resubmit-version`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          ...formData
        })
      });
      const json = await res.json();
      if (json.success) {
        setShowResubmitModal(false);
        if (onResubmitVersionSuccess) {
          onResubmitVersionSuccess(json.data);
        }
      }
    } catch (err) {
      console.error('[RejectedScreen] Error submitting new application version:', err);
    }
  };

  return (
    <div style={{ maxWidth: '740px', margin: '0 auto', padding: '24px 20px 60px' }} className="animate-fade-in">

      {onBack && (
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            padding: '8px 16px',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: 800,
            color: '#475569',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          <ArrowLeft size={16} /> Return to Dashboard
        </button>
      )}

      <div style={{
        background: '#ffffff',
        borderRadius: '24px',
        border: '1px solid #fee2e2',
        padding: '40px 36px',
        boxShadow: '0 10px 30px rgba(239, 68, 68, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '20px'
      }}>

        {/* Icon Circle */}
        <div style={{
          width: '68px',
          height: '68px',
          borderRadius: '22px',
          background: '#fef2f2',
          color: '#ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1.5px solid #fecaca'
        }}>
          <XCircle size={36} />
        </div>

        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#991b1b', textTransform: 'uppercase', background: '#fef2f2', padding: '4px 12px', borderRadius: '10px' }}>
            Application Status: Not Approved (v{application.version || 1})
          </span>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '10px 0 6px' }}>
            Application Review Update
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, maxWidth: '540px', margin: '0 auto' }}>
            Thank you for completing your orientation and applying to the Campus Mental Health Initiative at <strong>{application.college || 'your campus'}</strong>.
          </p>
        </div>

        {/* Exact Review Reason Callout Box */}
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderLeft: '4px solid #ef4444', padding: '18px 22px', borderRadius: '14px', textStyle: 'left', width: '100%', fontSize: '0.9rem', color: '#991b1b', lineHeight: 1.6, textAlign: 'left' }}>
          <strong style={{ display: 'block', marginBottom: '6px', fontSize: '0.92rem', color: '#7f1d1d' }}>
            Committee Review Feedback:
          </strong>
          "{reviewReason}"
        </div>

        {/* Resubmit New Version Action Bar */}
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
          <div style={{ fontSize: '0.86rem', color: '#334155', fontWeight: 800 }}>
            Would you like to address the review feedback and submit an updated application?
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
            Submitting an updated application creates a new application version (v{(application.version || 1) + 1}) while preserving your full history.
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '4px' }}>
            <button
              onClick={() => setShowResubmitModal(true)}
              style={{
                padding: '12px 24px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '0.88rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 20px rgba(37, 99, 235, 0.25)'
              }}
            >
              <Send size={16} /> Submit Updated Application (v{(application.version || 1) + 1})
            </button>

            <a
              href="mailto:campus-support@mantracare.org?subject=Campus%20Ambassador%20Application%20Inquiry"
              style={{
                padding: '12px 20px',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                color: '#1e293b',
                fontWeight: 800,
                fontSize: '0.85rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Mail size={16} color="#2563eb" /> Contact Support
            </a>
          </div>
        </div>

      </div>

      {/* Resubmit Application Form Modal */}
      <CampusApplicationModal
        isOpen={showResubmitModal}
        onClose={() => setShowResubmitModal(false)}
        onSubmitSuccess={handleResubmitVersion}
        initialProfile={{
          ...application,
          college_name: application.college
        }}
      />

    </div>
  );
}
