import React from 'react';
import { Download, FileText } from 'lucide-react';

export default function ProgramResourcesWidget({ resources = [] }) {
  return (
    <div style={{ background: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
      <h3 style={{ margin: '0 0 16px', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
        Program Toolkit & Resources
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
        {resources.map((res) => (
          <div
            key={res.id}
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '14px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={18} color="#2563eb" />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>{res.title}</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{res.type}</div>
              </div>
            </div>
            <button
              style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '6px 10px',
                cursor: 'pointer',
                color: '#2563eb',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.75rem',
                fontWeight: 700
              }}
            >
              <Download size={14} /> Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
