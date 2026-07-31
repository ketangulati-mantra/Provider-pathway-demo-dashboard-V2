import React from 'react';
import { Target, ArrowRight, Clock, Coins } from 'lucide-react';

export default function NextMissionCard({ mission = {} }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
      padding: '24px',
      borderRadius: '20px',
      border: '1.5px solid #93c5fd',
      boxShadow: '0 4px 16px rgba(37, 99, 235, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1d4ed8', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          <Target size={18} /> Next Priority Mission
        </div>
        <span style={{ background: '#fef08a', color: '#854d0e', padding: '4px 10px', borderRadius: '10px', fontSize: '0.78rem', fontWeight: 800 }}>
          +{mission.reward || 150} Credits
        </span>
      </div>

      <div>
        <h3 style={{ margin: '0 0 6px', fontSize: '1.2rem', fontWeight: 900, color: '#0f172a' }}>
          {mission.title || 'Share Referral Link with 5 Students'}
        </h3>
        <div style={{ display: 'flex', gap: '14px', fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>
          <span>Difficulty: <strong>{mission.difficulty || 'Easy'}</strong></span>
          <span>• Time: <strong>{mission.estimatedMinutes || 5} Mins</strong></span>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 800, color: '#1e40af', marginBottom: '6px' }}>
          <span>MISSION PROGRESS</span>
          <span>{mission.progressPercent || 60}%</span>
        </div>
        <div style={{ width: '100%', height: '8px', background: '#bfdbfe', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ width: `${mission.progressPercent || 60}%`, height: '100%', background: '#2563eb', borderRadius: '10px' }} />
        </div>
      </div>

      <button
        style={{
          width: '100%',
          padding: '12px 20px',
          borderRadius: '12px',
          border: 'none',
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          color: '#ffffff',
          fontWeight: 800,
          fontSize: '0.9rem',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
        }}
      >
        {mission.ctaText || 'Start Mission'} <ArrowRight size={18} />
      </button>
    </div>
  );
}
