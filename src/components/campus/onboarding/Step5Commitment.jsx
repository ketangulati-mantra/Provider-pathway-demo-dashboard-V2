import React from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

const RESPONSIBILITIES = [
  'Promote mental health awareness and distress screening drives ethically across campus.',
  'Encourage students to utilize free listener support and subsidized clinical care.',
  'Maintain student confidentiality during all peer support interactions.',
  'Use your unique referral code responsibly for legitimate student therapy bookings.',
  'Represent Mantra Care positively with professionalism and clinical integrity.'
];

export default function Step5Commitment({ onNext }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '720px', margin: '0 auto' }} className="animate-fade-in">
      
      <div>
        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Step 5 • Provider Commitment
        </span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.9rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 8px' }}>
          Ambassador Responsibilities
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#64748b', margin: 0 }}>
          To maintain high clinical standards, all Campus Ambassadors commit to the following principles:
        </p>
      </div>

      <div style={{ background: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {RESPONSIBILITIES.map((resp, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.92rem', color: '#334155', lineHeight: 1.5 }}>
            <CheckCircle2 size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{resp}</span>
          </div>
        ))}
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
        Next: Initiative Interest <ArrowRight size={20} />
      </button>

    </div>
  );
}
