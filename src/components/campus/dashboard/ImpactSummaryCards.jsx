import React from 'react';
import { Users, HeartHandshake, ShieldCheck, Presentation, Building2, Award, Coins } from 'lucide-react';

export default function ImpactSummaryCards({ stats = {} }) {
  const cards = [
    { title: 'Students Reached', value: stats.studentsReached || 0, icon: <Users size={20} color="#2563eb" />, bg: '#eff6ff' },
    { title: 'Listener Referrals', value: stats.listenerReferrals || 0, icon: <HeartHandshake size={20} color="#059669" />, bg: '#ecfdf5' },
    { title: 'Therapy Referrals', value: stats.therapyReferrals || 0, icon: <ShieldCheck size={20} color="#9333ea" />, bg: '#faf5ff' },
    { title: 'Workshops Conducted', value: stats.workshopsConducted || 0, icon: <Presentation size={20} color="#d97706" />, bg: '#fffbe6' },
    { title: 'Campuses Contacted', value: stats.campusesContacted || 0, icon: <Building2 size={20} color="#0284c7" />, bg: '#e0f2fe' },
    { title: 'Certificates Earned', value: stats.certificatesEarned || 0, icon: <Award size={20} color="#475569" />, bg: '#f1f5f9' },
    { title: 'Credits Earned', value: stats.creditsEarned || 0, icon: <Coins size={20} color="#d97706" />, bg: '#fef3c7' }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
      {cards.map((c, idx) => (
        <div
          key={idx}
          style={{
            background: '#ffffff',
            padding: '18px 20px',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}
        >
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {c.icon}
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>{c.title}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', marginTop: '2px' }}>{c.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
