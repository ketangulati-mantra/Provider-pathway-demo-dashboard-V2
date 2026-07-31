import React, { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';

export default function ReferralSummaryCard({ summary = {} }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(summary.referralCode || 'CAMPUS_ACTIVE');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ background: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563eb', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase' }}>
        <Share2 size={18} /> Campus Referral Hub
      </div>

      {/* Referral Code Box */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          readOnly
          value={summary.referralCode || 'CAMPUS_ACTIVE'}
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: '12px',
            border: '1.5px solid #cbd5e1',
            fontSize: '1rem',
            fontWeight: 900,
            color: '#0f172a',
            fontFamily: 'monospace',
            background: '#f8fafc'
          }}
        />
        <button
          onClick={handleCopy}
          style={{
            padding: '12px 20px',
            borderRadius: '12px',
            border: 'none',
            background: copied ? '#059669' : '#2563eb',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          {copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy Code</>}
        </button>
      </div>

      {/* Analytics Mini Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', textAlign: 'center', background: '#f8fafc', padding: '14px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
        <div>
          <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700 }}>CLICKS</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a' }}>{summary.clicks || 84}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700 }}>REGISTRATIONS</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#2563eb' }}>{summary.registrations || 12}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700 }}>BOOKINGS</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#059669' }}>{summary.bookings || 5}</div>
        </div>
      </div>
    </div>
  );
}
