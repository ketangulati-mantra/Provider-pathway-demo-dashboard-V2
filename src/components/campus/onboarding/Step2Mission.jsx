import React from 'react';
import { Target, Heart, ShieldCheck, Smile, ArrowRight } from 'lucide-react';

const MISSIONS = [
  {
    icon: <Heart size={24} color="#2563eb" />,
    bg: '#eff6ff',
    title: 'Free Listener Support',
    description: 'Help students access confidential peer listening & empathetic support desks.'
  },
  {
    icon: <ShieldCheck size={24} color="#9333ea" />,
    bg: '#faf5ff',
    title: 'Affordable Subsidized Therapy',
    description: 'Guide students requiring professional clinical care to subsidized therapy vouchers.'
  },
  {
    icon: <Smile size={24} color="#059669" />,
    bg: '#ecfdf5',
    title: 'Reduce Mental Health Stigma',
    description: 'Normalize wellness conversations and screening drives across university campuses.'
  },
  {
    icon: <Target size={24} color="#d97706" />,
    bg: '#fffbe6',
    title: 'Build Healthier Campuses',
    description: 'Empower student leaders and faculty to foster sustainable mental health ecosystems.'
  }
];

export default function Step2Mission({ onNext }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '720px', margin: '0 auto' }} className="animate-fade-in">
      
      <div>
        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Step 2 • The Core Mission
        </span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.9rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 8px' }}>
          Our 4 Mission Pillars
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#64748b', margin: 0 }}>
          As a Campus Ambassador, you drive measurable impact through these core initiatives:
        </p>
      </div>

      {/* Mission Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {MISSIONS.map((m, idx) => (
          <div
            key={idx}
            className="animate-scale-in"
            style={{
              background: '#ffffff',
              padding: '20px',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              animationDelay: `${idx * 0.08}s`
            }}
          >
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {m.icon}
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{m.title}</h3>
              <p style={{ margin: '4px 0 0', fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5 }}>{m.description}</p>
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
        Next: Provider Benefits <ArrowRight size={20} />
      </button>

    </div>
  );
}
