import React, { useState } from 'react';
import { Award, GraduationCap, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Step7Confirmation({ onConfirm, isSubmitting }) {
  const [collegeName, setCollegeName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(collegeName);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '640px', margin: '0 auto', textAlign: 'center' }} className="animate-fade-in">
      
      <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
        <GraduationCap size={34} />
      </div>

      <div>
        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Step 7 • Confirmation & Campus Setup
        </span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.9rem', fontWeight: 900, color: '#0f172a', margin: '8px 0 10px' }}>
          Enter Your Campus Details
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
          Specify your university or college chapter to complete your onboarding & receive +50 Welcome Bonus Credits!
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
        <input
          type="text"
          placeholder="e.g. Stanford University / Delhi University"
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '16px 20px',
            borderRadius: '14px',
            border: '1.5px solid #cbd5e1',
            fontSize: '1rem',
            outline: 'none',
            background: '#f8fafc',
            color: '#0f172a',
            textAlign: 'center',
            fontWeight: 600
          }}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '18px 28px',
            borderRadius: '16px',
            border: 'none',
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            color: '#ffffff',
            fontSize: '1.05rem',
            fontWeight: 900,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '0 6px 20px rgba(5, 150, 105, 0.35)',
            transition: 'transform 0.15s ease'
          }}
        >
          {isSubmitting ? 'Initializing Campus Chapter...' : (
            <>Complete Onboarding & Start Learning <ArrowRight size={20} /></>
          )}
        </button>
      </form>

    </div>
  );
}
