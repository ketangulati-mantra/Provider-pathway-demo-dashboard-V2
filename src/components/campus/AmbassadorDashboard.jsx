import React, { useState, useEffect } from 'react';
import { getCurrentUserId, MANTRA_CONFIG } from '../../mantra';
import AmbassadorHeader from './dashboard/AmbassadorHeader';
import ImpactSummaryCards from './dashboard/ImpactSummaryCards';
import ProgressRoadmap from './dashboard/ProgressRoadmap';
import NextMissionCard from './dashboard/NextMissionCard';
import RecentActivityFeed from './dashboard/RecentActivityFeed';
import ReferralSummaryCard from './dashboard/ReferralSummaryCard';
import CertificatesWidget from './dashboard/CertificatesWidget';
import AchievementsBadges from './dashboard/AchievementsBadges';
import ProgramResourcesWidget from './dashboard/ProgramResourcesWidget';
import ProgramStatusCard from './dashboard/ProgramStatusCard';
import { RefreshCw } from 'lucide-react';

const API_BASE = MANTRA_CONFIG.apiBaseUrl || 'http://localhost:5000';

export default function AmbassadorDashboard({ onBack }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = getCurrentUserId();

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}/api/campus-program/dashboard?userId=${encodeURIComponent(userId)}`);
      const json = await res.json();

      if (json.success) {
        setDashboardData(json.data);
      } else {
        setError(json.error || 'Failed to fetch dashboard data');
      }
    } catch (err) {
      console.error('[AmbassadorDashboard] Error loading dashboard:', err);
      setError('Unable to load ambassador dashboard.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [userId]);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: '#64748b' }}>
        <RefreshCw size={28} className="animate-spin" style={{ color: '#2563eb', marginBottom: '12px' }} />
        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Loading Campus Ambassador Dashboard...</div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div style={{ maxWidth: '500px', margin: '60px auto', padding: '32px', background: '#ffffff', borderRadius: '16px', border: '1px solid #fee2e2', textAlign: 'center' }}>
        <div style={{ color: '#ef4444', fontWeight: 800, fontSize: '1.1rem', marginBottom: '8px' }}>Dashboard Error</div>
        <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '20px' }}>{error || 'No data found'}</p>
        <button onClick={loadDashboard} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#2563eb', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '16px 20px 60px', display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      
      {/* 1. Header Banner */}
      <AmbassadorHeader profile={dashboardData.profile} onBack={onBack} />

      {/* 2. Impact Summary Stat Cards */}
      <ImpactSummaryCards stats={dashboardData.impactStats} />

      {/* Grid Layout for Roadmap & Next Mission */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* 3. Progress Roadmap */}
        <ProgressRoadmap milestones={dashboardData.roadmapMilestones} />

        {/* 4. Next Mission Card */}
        <NextMissionCard mission={dashboardData.nextMission} />
      </div>

      {/* Grid Layout for Referral & Status */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* 6. Referral Summary */}
        <ReferralSummaryCard summary={dashboardData.referralSummary} />

        {/* 10. Program Status Card */}
        <ProgramStatusCard profile={dashboardData.profile} />
      </div>

      {/* 5. Recent Activity Feed */}
      <RecentActivityFeed activities={dashboardData.recentActivity} />

      {/* 7. Certificates Widget */}
      <CertificatesWidget certificates={dashboardData.certificates} />

      {/* 8. Achievements Badges */}
      <AchievementsBadges badges={dashboardData.badges} />

      {/* 9. Program Toolkit & Resources */}
      <ProgramResourcesWidget resources={dashboardData.programResources} />

    </div>
  );
}
