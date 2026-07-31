import React from 'react';
import { Activity, Coins } from 'lucide-react';

export default function RecentActivityFeed({ activities = [] }) {
  return (
    <div style={{ background: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#0f172a' }}>
        <Activity size={20} color="#2563eb" />
        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800 }}>Recent Ledger Activity</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {activities.length === 0 ? (
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', textAlign: 'center', padding: '16px' }}>No recent ledger transactions.</div>
        ) : (
          activities.map((act) => (
            <div
              key={act.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '12px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Coins size={18} color="#d97706" />
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>{act.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{new Date(act.timestamp).toLocaleString()}</div>
                </div>
              </div>
              <span style={{ fontSize: '0.88rem', fontWeight: 900, color: act.amount > 0 ? '#059669' : '#dc2626' }}>
                {act.amount > 0 ? `+${act.amount}` : act.amount} Credits
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
