import React from 'react';
import { Award, Lock, CheckCircle2 } from 'lucide-react';

export default function CertificatesWidget({ certificates = [] }) {
  return (
    <div style={{ background: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
      <h3 style={{ margin: '0 0 16px', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
        Program Certificates & Credentials
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
        {certificates.map((cert) => (
          <div
            key={cert.id}
            style={{
              background: cert.earned ? '#ecfdf5' : '#f8fafc',
              border: cert.earned ? '1.5px solid #6ee7b7' : '1px solid #cbd5e1',
              padding: '16px',
              borderRadius: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Award size={22} color={cert.earned ? "#059669" : "#64748b"} />
              {cert.earned ? (
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', background: '#d1fae5', padding: '2px 8px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={12} /> Issued
                </span>
              ) : (
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', background: '#e2e8f0', padding: '2px 8px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Lock size={12} /> Locked ({cert.progressPercent || 50}%)
                </span>
              )}
            </div>

            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>{cert.title}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px', fontFamily: 'monospace' }}>Code: {cert.code}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
