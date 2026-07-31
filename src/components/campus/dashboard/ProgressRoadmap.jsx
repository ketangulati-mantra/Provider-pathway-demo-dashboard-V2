import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

export default function ProgressRoadmap({ milestones = [] }) {
  return (
    <div style={{ background: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
      <h3 style={{ margin: '0 0 16px', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
        Ambassador Progress Roadmap
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '14px' }}>
        {milestones.map((m) => (
          <div
            key={m.id}
            style={{
              background: m.completed ? '#f0fdf4' : '#f8fafc',
              border: m.completed ? '1.5px solid #86efac' : '1px solid #cbd5e1',
              padding: '14px',
              borderRadius: '12px',
              textAlign: 'center'
            }}
          >
            {m.completed ? (
              <CheckCircle2 size={22} color="#059669" style={{ margin: '0 auto 6px' }} />
            ) : (
              <Circle size={22} color="#cbd5e1" style={{ margin: '0 auto 6px' }} />
            )}
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: m.completed ? '#065f46' : '#64748b' }}>
              {m.label}
            </div>
            <div style={{ fontSize: '0.72rem', color: m.completed ? '#059669' : '#94a3b8', marginTop: '2px', fontWeight: 600 }}>
              {m.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
