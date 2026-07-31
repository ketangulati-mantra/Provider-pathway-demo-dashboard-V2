import React from 'react';
import CampusProgramController from '../components/campus/CampusProgramController';

export default function CampusAwarenessLessonPage({ onBack }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-app)' }} className="animate-fade-in">
      <CampusProgramController onBack={onBack} />
    </div>
  );
}
