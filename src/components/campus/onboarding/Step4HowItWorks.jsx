import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const STEPS_TIMELINE = [
  { step: '1', title: 'Learn', desc: 'Complete 3 orientation modules' },
  { step: '2', title: 'Join', desc: 'Confirm college chapter details' },
  { step: '3', title: 'Get Approved', desc: 'Institutional verification check' },
  { step: '4', title: 'Receive Link', desc: 'Unique referral code issued' },
  { step: '5', title: 'Promote Care', desc: 'Lead student mental health drives' },
  { step: '6', title: 'Earn Credits', desc: 'Ledger points for active referrals' },
  { step: '7', title: 'Certificates', desc: 'Unlock verified digital credentials' },
  { step: '8', title: 'Campus Leader', desc: 'Become a Senior Ambassador' }
];

export default function Step4HowItWorks({ onNext }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '720px', margin: '0 auto' }} className="animate-fade-in">
      
      <div>
        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Step 4 • How It Works
        </span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.9rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 8px' }}>
          Interactive Ambassador Pathway Timeline
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#64748b', margin: 0 }}>
          Follow this 8-stage progression to transform campus mental healthcare:
        </p>
      </div>

      {/* Timeline Progression Container */}
      <div style={{ background: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
          {STEPS_TIMELINE.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#f8fafc',
                padding: '14px',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', color: '#ffffff', fontWeight: 800, fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                {item.step}
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>{item.title}</div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px', lineHeight: 1.3 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onNext}
        style={{
          width: '100%',
          padding: '16px 28px',
          borderRadius: '14px',
          border: 'none',
          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
          color: '#ffffff',
          fontSize: '1.02rem',
          fontWeight: 900,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          boxShadow: '0 6px 20px rgba(37, 99, 235, 0.35)',
          marginTop: '8px'
        }}
      >
        Next: Responsibilities <ArrowRight size={20} />
      </button>

    </div>
  );
}
