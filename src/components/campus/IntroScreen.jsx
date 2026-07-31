import React, { useState } from 'react';
import { ArrowLeft, Sparkles, HeartHandshake, Award, ShieldCheck, Coins, Users, BookOpen, CheckCircle2, ChevronRight, GraduationCap, Building2 } from 'lucide-react';

export default function IntroScreen({ onJoin, isJoining, onBack }) {
  const [collegeName, setCollegeName] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onJoin(collegeName);
  };

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '16px 20px 60px' }} className="animate-fade-in">
      
      {/* Back Navigation Bar */}
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
            fontWeight: 700,
            color: '#475569',
            cursor: 'pointer',
            marginBottom: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            transition: 'all 0.15s ease'
          }}
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
      )}

      {/* Hero Banner Section */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311b92 100%)',
        borderRadius: '24px',
        padding: '48px 40px',
        color: '#ffffff',
        boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.4)',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        
        {/* Decorative background glow circles */}
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '260px', height: '260px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-40px', left: '20%', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37, 99, 235, 0.35) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '720px' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(10px)', padding: '6px 14px', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.2)', width: 'fit-content' }}>
            <Sparkles size={16} color="#fbbf24" />
            <span style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#fef08a' }}>
              Campus Mental Health Program Engine
            </span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: 900, lineHeight: 1.2, margin: 0, letterSpacing: '-0.02em' }}>
            Transform Student Wellbeing Across Universities
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
            Join an ongoing, scalable initiative empowering mental health providers to lead campus advocacy, deliver free peer listener support, and establish subsidized therapy pathways for students.
          </p>

          {/* Quick Metrics Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '12px' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '10px 18px', borderRadius: '12px', backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#60a5fa' }}>10,000+</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>Students Impacted</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '10px 18px', borderRadius: '12px', backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#c084fc' }}>50+</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>Partner Universities</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '10px 18px', borderRadius: '12px', backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#34d399' }}>Certified</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>Ambassador Credential</div>
            </div>
          </div>

        </div>
      </div>

      {/* Program Core Pillars Section */}
      <div style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0f172a', marginBottom: '8px', textAlign: 'center' }}>
          Why Student Mental Health Matters
        </h2>
        <p style={{ fontSize: '0.92rem', color: '#64748b', textAlign: 'center', maxWidth: '620px', margin: '0 auto 28px' }}>
          Over 60% of university students report severe academic burnout and anxiety. Here is how our Campus Ambassadors create lasting structural impact:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          
          {/* Pillar 1 */}
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '18px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HeartHandshake size={24} />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>Free Listener Support</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6 }}>
              Provide structured, confidential active listening sessions for students facing exam stress, loneliness, or academic pressures.
            </p>
          </div>

          {/* Pillar 2 */}
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '18px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#faf5ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building2 size={24} />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>Subsidized Therapy Pathways</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6 }}>
              Connect students needing clinical mental healthcare directly to subsidized therapy vouchers and licensed care networks.
            </p>
          </div>

          {/* Pillar 3 */}
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '18px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={24} />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>Campus Awareness Drives</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6 }}>
              Organize workshops, distress-screening booths, and peer wellness campaigns across college departments and dorms.
            </p>
          </div>

        </div>
      </div>

      {/* Ambassador Benefits & Reward Ledger Preview */}
      <div style={{ marginTop: '40px', background: '#f8fafc', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
          Program Benefits & Recognition
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#ffffff', padding: '14px 18px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
            <Award size={20} color="#2563eb" />
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>Verified Certificate</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Institutional Recognition</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#ffffff', padding: '14px 18px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
            <Coins size={20} color="#d97706" />
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>Credit Earnings</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Ledger-based rewards</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#ffffff', padding: '14px 18px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
            <ShieldCheck size={20} color="#059669" />
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>Ambassador Leveling</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Unlock advanced badges</div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Form Box */}
      <div style={{ 
        marginTop: '40px', 
        background: '#ffffff', 
        padding: '36px 32px', 
        borderRadius: '24px', 
        border: '1px solid #cbd5e1', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '20px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', margin: '0 0 6px' }}>
            Ready to Lead Mental Health Advocacy?
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>
            Enter your university or college name below to begin your ambassador journey.
          </p>
        </div>

        <form onSubmit={handleFormSubmit} style={{ width: '100%', maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            type="text"
            placeholder="e.g. Stanford University / Delhi University"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 18px',
              borderRadius: '12px',
              border: '1.5px solid #cbd5e1',
              fontSize: '0.95rem',
              outline: 'none',
              background: '#f8fafc',
              color: '#0f172a',
              textAlign: 'center',
              fontWeight: 600
            }}
          />

          <button
            type="submit"
            disabled={isJoining}
            style={{
              width: '100%',
              padding: '16px 24px',
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
              transition: 'transform 0.15s ease, box-shadow 0.15s ease'
            }}
          >
            {isJoining ? 'Initializing Ambassador Journey...' : (
              <>I'm Ready to Join <ChevronRight size={20} /></>
            )}
          </button>
        </form>
      </div>

    </div>
  );
}
