import React from 'react';
import { ShieldCheck, Award, Trophy, Sparkles } from 'lucide-react';

export default function ProgramStatusCard({ profile = {} }) {
  return (
    <div style={{ background: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
        Ambassador Program Status
      </h3>

      <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#64748b', fontWeight: 600 }}>Application Status:</span>
          <strong style={{ color: '#059669', textTransform: 'uppercase' }}>{profile.approval_status || 'APPROVED'}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#64748b', fontWeight: 600 }}>Ambassador Level:</span>
          <strong style={{ color: '#2563eb' }}>Level {profile.level || 1}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#64748b', fontWeight: 600 }}>Leaderboard Position:</span>
          <strong style={{ color: '#d97706' }}>#12 Nationwide</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#64748b', fontWeight: 600 }}>Upcoming Reward:</span>
          <strong style={{ color: '#7c3aed' }}>Level 2 Senior Ambassador Badge</strong>
        </div>
      </div>
    </div>
  );
}
