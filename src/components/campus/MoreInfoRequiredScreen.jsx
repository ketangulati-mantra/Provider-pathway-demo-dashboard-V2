import React, { useState } from 'react';
import { AlertTriangle, Send, ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';
import SearchableSelect from '../ui/SearchableSelect';
import { MANTRA_CONFIG } from '../../mantra';

const API_BASE = MANTRA_CONFIG.apiBaseUrl || 'http://localhost:5000';

export default function MoreInfoRequiredScreen({ statusData, onResubmitSuccess, onBack }) {
  const application = statusData?.application || {};
  const requestedFields = statusData?.requestedFields || application?.requested_info_fields || ['motivation'];
  const reviewerNotes = application?.reviewer_notes || 'Please clarify your campus advocacy motivation and institutional experience.';

  const [formData, setFormData] = useState({
    college: application.college || '',
    course: application.course || '',
    year: application.year || '1st Year',
    city: application.city || '',
    motivation: application.motivation || '',
    phone: application.phone || '',
    linkedin_url: application.linkedin_url || '',
    previous_experience: application.previous_experience || ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError(null);

      const userId = statusData?.userId || application.user_id;

      const res = await fetch(`${API_BASE}/api/campus-program/application/resubmit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          ...formData
        })
      });

      const json = await res.json();
      if (json.success) {
        if (onResubmitSuccess) {
          onResubmitSuccess(json.data);
        }
      } else {
        setError(json.error || 'Failed to resubmit application.');
      }
    } catch (err) {
      console.error('[MoreInfoRequiredScreen] Error resubmitting:', err);
      setError('Unable to connect to backend server.');
    } finally {
      setSubmitting(false);
    }
  };

  const isFieldRequested = (fieldName) => {
    if (!requestedFields || requestedFields.length === 0) return true;
    return requestedFields.includes(fieldName);
  };

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '24px 20px 60px' }} className="animate-fade-in">
      
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
        border: '1px solid #fed7aa',
        padding: '36px',
        boxShadow: '0 10px 30px rgba(234, 88, 12, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        
        {/* Header Alert */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '18px',
            background: '#fff7ed',
            color: '#ea580c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1.5px solid #ffedd5',
            flexShrink: 0
          }}>
            <AlertTriangle size={28} />
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#c2410c', textTransform: 'uppercase', background: '#ffedd5', padding: '4px 10px', borderRadius: '10px' }}>
              Action Required: Resubmission Needed
            </span>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '8px 0 4px' }}>
              Additional Information Requested
            </h1>
            <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
              Our review committee has reviewed your application and requested minor updates to specific fields.
            </p>
          </div>
        </div>

        {/* Reviewer Note Callout Box */}
        <div style={{ background: '#fff7ed', border: '1px solid #ffedd5', borderLeft: '4px solid #ea580c', padding: '16px 20px', borderRadius: '12px', color: '#9a3412', fontSize: '0.88rem' }}>
          <strong style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem', color: '#c2410c' }}>
            💬 Note from Reviewer:
          </strong>
          {reviewerNotes}
        </div>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '12px 16px', borderRadius: '10px', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        {/* Resubmission Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Requested Fields Only / Highlighted Input Controls */}
          {isFieldRequested('college') && (
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                University / College Name <span style={{ color: '#ea580c' }}>* (Requested)</span>
              </label>
              <SearchableSelect
                placeholder="Search or enter your college name..."
                endpoint="/api/campus-program/master/colleges"
                value={formData.college}
                onChange={(val) => handleInputChange('college', val)}
              />
            </div>
          )}

          {isFieldRequested('motivation') && (
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                Statement of Motivation <span style={{ color: '#ea580c' }}>* (Requested)</span>
              </label>
              <textarea
                rows={4}
                value={formData.motivation}
                onChange={(e) => handleInputChange('motivation', e.target.value)}
                placeholder="Explain why you want to become a Campus Ambassador..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1.5px solid #ea580c',
                  fontSize: '0.88rem',
                  color: '#0f172a',
                  outline: 'none',
                  boxSizing: 'border-box',
                  background: '#fffbf5'
                }}
                required
              />
            </div>
          )}

          {isFieldRequested('linkedin_url') && (
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                LinkedIn Profile URL <span style={{ color: '#ea580c' }}>* (Requested)</span>
              </label>
              <input
                type="url"
                value={formData.linkedin_url}
                onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
                placeholder="https://linkedin.com/in/username"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1.5px solid #ea580c',
                  fontSize: '0.88rem',
                  color: '#0f172a',
                  outline: 'none',
                  boxSizing: 'border-box',
                  background: '#fffbf5'
                }}
              />
            </div>
          )}

          {isFieldRequested('phone') && (
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                Contact Phone Number <span style={{ color: '#ea580c' }}>* (Requested)</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 555-019-2831"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1.5px solid #ea580c',
                  fontSize: '0.88rem',
                  color: '#0f172a',
                  outline: 'none',
                  boxSizing: 'border-box',
                  background: '#fffbf5'
                }}
              />
            </div>
          )}

          {isFieldRequested('previous_experience') && (
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                Previous Leadership / Advocacy Experience <span style={{ color: '#ea580c' }}>* (Requested)</span>
              </label>
              <textarea
                rows={3}
                value={formData.previous_experience}
                onChange={(e) => handleInputChange('previous_experience', e.target.value)}
                placeholder="Describe relevant campus leadership roles..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1.5px solid #ea580c',
                  fontSize: '0.88rem',
                  color: '#0f172a',
                  outline: 'none',
                  boxSizing: 'border-box',
                  background: '#fffbf5'
                }}
              />
            </div>
          )}

          <div style={{ paddingTop: '12px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: '12px 24px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '0.88rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 20px rgba(234, 88, 12, 0.25)'
              }}
            >
              <Send size={16} /> {submitting ? 'Resubmitting Application...' : 'Resubmit Application for Review'}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
