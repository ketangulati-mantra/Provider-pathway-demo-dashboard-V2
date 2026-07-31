import React from 'react';
import { Sparkles, CheckCircle2, Clock, ArrowRight } from 'lucide-react';

export default function Step6Interest({ onAccept, onMaybeLater }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '640px', margin: '0 auto', textAlign: 'center' }} className="animate-fade-in">
      
      <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
        <Sparkles size={32} />
      </div>

      <div>
        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Step 6 • Choice Screen
        </span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.9rem', fontWeight: 900, color: '#0f172a', margin: '8px 0 10px' }}>
          Would you like to become part of this initiative?
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
          Joining opens your official registration application, unlocking orientation modules, ledger credits, and your campus ambassador referral code.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '12px' }}>
        
        {/* Option YES */}
        <button
          onClick={onAccept}
          style={{
            width: '100%',
            padding: '18px 28px',
            borderRadius: '16px',
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
          <CheckCircle2 size={22} /> YES, I Want to Join <ArrowRight size={20} />
        </button>

        {/* Option Maybe Later */}
        <button
          onClick={onMaybeLater}
          style={{
            width: '100%',
            padding: '14px 28px',
            borderRadius: '16px',
            border: '1.5px solid #cbd5e1',
            background: '#ffffff',
            color: '#64748b',
            fontSize: '0.95rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.15s ease'
          }}
        >
          <Clock size={18} /> Maybe Later (Return to Dashboard)
        </button>

      </div>

    </div>
  );
}
