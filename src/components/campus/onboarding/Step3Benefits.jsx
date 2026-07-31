import React from 'react';
import { Award, Coins, ShieldCheck, Share2, Users, FileText, Globe, ArrowRight } from 'lucide-react';

const BENEFITS = [
  { icon: <Award size={20} color="#2563eb" />, title: 'Verified Certificate', desc: 'Official Institutional Certificate of Recognition from Mantra Care.' },
  { icon: <Coins size={20} color="#d97706" />, title: 'Ledger Credits', desc: 'Earn tracked credit rewards for every student referred or module completed.' },
  { icon: <ShieldCheck size={20} color="#059669" />, title: 'Ambassador Leveling', desc: 'Unlock senior ambassador status, exclusive badges, and leadership roles.' },
  { icon: <Share2 size={20} color="#7c3aed" />, title: 'Referral Rewards', desc: 'Unique campus referral code for tracking student therapy bookings.' },
  { icon: <Users size={20} color="#0284c7" />, title: 'Community Impact', desc: 'Direct impact on student wellbeing across major partner universities.' },
  { icon: <FileText size={20} color="#475569" />, title: 'Resume Value', desc: 'Highlight leadership & mental health program management experience.' },
  { icon: <Globe size={20} color="#0a66c2" />, title: 'LinkedIn Recognition', desc: 'Verifiable digital badge for your professional LinkedIn profile.' }
];

export default function Step3Benefits({ onNext }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '720px', margin: '0 auto' }} className="animate-fade-in">
      
      <div>
        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Step 3 • Program Benefits
        </span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.9rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 8px' }}>
          What You Gain as an Ambassador
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#64748b', margin: 0 }}>
          Recognition, tangible ledger rewards, and institutional credentials:
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
        {BENEFITS.map((b, idx) => (
          <div
            key={idx}
            style={{
              background: '#ffffff',
              padding: '16px 18px',
              borderRadius: '14px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {b.icon}
            </div>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>{b.title}</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>{b.desc}</div>
            </div>
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
        Next: How It Works <ArrowRight size={20} />
      </button>

    </div>
  );
}
