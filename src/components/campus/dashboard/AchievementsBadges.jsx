import React from 'react';
import { Lock } from 'lucide-react';

export default function AchievementsBadges({ badges = [] }) {
  return (
    <div style={{ background: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
      <h3 style={{ margin: '0 0 16px', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
        Achievements & Badges
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
        {badges.map((b) => (
          <div
            key={b.id}
            style={{
              background: b.unlocked ? '#eff6ff' : '#f8fafc',
              border: b.unlocked ? '1.5px solid #93c5fd' : '1px solid #e2e8f0',
              padding: '16px',
              borderRadius: '14px',
              textAlign: 'center',
              opacity: b.unlocked ? 1 : 0.65
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '6px' }}>{b.icon}</div>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>{b.name}</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px', lineHeight: 1.3 }}>{b.desc}</div>
            {!b.unlocked && (
              <div style={{ marginTop: '8px', fontSize: '0.72rem', color: '#94a3b8', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                <Lock size={12} /> Locked
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
