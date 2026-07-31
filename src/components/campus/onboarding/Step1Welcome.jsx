import React from 'react';
import { Sparkles, HeartHandshake, ShieldAlert, ArrowRight } from 'lucide-react';

export default function Step1Welcome({ onNext }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '720px', margin: '0 auto' }} className="animate-fade-in">
      
      {/* Hero Badge */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#eff6ff', border: '1px solid #bfdbfe', padding: '6px 16px', borderRadius: '20px', width: 'fit-content' }}>
        <Sparkles size={16} color="#2563eb" />
        <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Step 1 • Welcome to Campus Initiative
        </span>
      </div>

      {/* Main Headline */}
      <div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.2, margin: '0 0 12px' }}>
          Addressing the Student Mental Health Crisis Together
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
          Over 60% of college students face chronic anxiety, burnout, and emotional distress without accessing timely support. As a certified provider, your leadership can bridge this crucial gap.
        </p>
      </div>

      {/* Impact Showcase Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        
        <div style={{ background: '#ffffff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.02)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
            <ShieldAlert size={22} />
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a' }}>60%+ Students</div>
          <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '4px' }}>Experience overwhelming distress annually without institutional counseling.</div>
        </div>

        <div style={{ background: '#ffffff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.02)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
            <HeartHandshake size={22} />
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a' }}>Provider Impact</div>
          <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '4px' }}>Guide students to free listener support & subsidized therapy pathways.</div>
        </div>

      </div>

      {/* CTA Button */}
      <div style={{ marginTop: '12px' }}>
        <button
          onClick={onNext}
          style={{
            width: '100%',
            padding: '16px 28px',
            borderRadius: '14px',
            border: 'none',
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            color: '#ffffff',
            fontSize: '1.05rem',
            fontWeight: 900,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '0 6px 20px rgba(37, 99, 235, 0.35)',
            transition: 'transform 0.15s ease'
          }}
        >
          Start My Journey <ArrowRight size={20} />
        </button>
      </div>

    </div>
  );
}
