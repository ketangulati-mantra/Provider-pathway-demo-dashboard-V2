import React, { useState, useEffect, useRef } from 'react';
import { Search, BookOpen, Database, Menu, GraduationCap, Clock, ArrowRight, Filter } from 'lucide-react';
import SubmissionsTable from '../components/SubmissionsTable';
import CampusAdminDashboard from '../components/admin/CampusAdminDashboard';
import { activities as mantraActivities, getCurrentService, setServiceContext, preserveQueryParams, SUPPORTED_SERVICES } from '../mantra';

const MANTRA_LOGO_URL = 'https://res.cloudinary.com/hxbamdqf/image/upload/v1784698269/Mantra_logo_yptwwe.svg';

export default function DeveloperLessonsPage() {
  const [selectedService, setSelectedService] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('campus_admin'); // 'campus_admin' | 'submissions' | 'lessons'
  const searchInputRef = useRef(null);

  useEffect(() => {
    // Keep 'all' as default for Pathways tab so all 50+ pathways display
    const current = getCurrentService();
    if (current && current !== 'all') {
      setSelectedService(current);
    } else {
      setSelectedService('all');
    }

    const handleServiceChange = (e) => {
      if (e.detail && e.detail.service) {
        setSelectedService(e.detail.service);
      }
    };

    window.addEventListener('mantra_service_changed', handleServiceChange);

    return () => {
      window.removeEventListener('mantra_service_changed', handleServiceChange);
    };
  }, []);

  const handleServiceSelect = (svc) => {
    setSelectedService(svc);
    if (svc !== 'all') {
      setServiceContext(svc);
    }
  };

  // Service filter options
  const serviceOptions = ['all', ...(SUPPORTED_SERVICES || ['therapy', 'listener', 'yoga', 'diet', 'physiotherapy', 'coaching', 'women_wellness'])];

  // Filter activities list by selected service and search query
  const filteredActivities = (mantraActivities || []).filter(act => {
    if (!act) return false;
    const actServices = Array.isArray(act.services) ? act.services : (act.services ? [act.services] : ['*']);
    
    // 1. Check service match
    const matchesService = 
      selectedService === 'all' || 
      actServices.includes('*') || 
      actServices.some(s => s.toLowerCase() === selectedService.toLowerCase()) || 
      (act.service && act.service.toLowerCase() === selectedService.toLowerCase());

    // 2. Check search query match
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query ||
      act.title?.toLowerCase().includes(query) ||
      act.lessonId?.toLowerCase().includes(query) ||
      act.route?.toLowerCase().includes(query);

    return matchesService && matchesSearch;
  });

  const launchPathway = (act) => {
    if (act.services && act.services.length > 0 && act.services[0] !== '*') {
      setServiceContext(act.services[0]);
    }
    const targetRoute = act.route || `/task/${act.lessonId}`;
    const p = window.location.pathname;
    const subpathMatch = p.match(/^(\/[^\/]+)/);
    const subpath = (subpathMatch && subpathMatch[1] && !subpathMatch[1].startsWith('/task') && !subpathMatch[1].startsWith('/api')) ? subpathMatch[1] : '';
    const fullRoute = subpath ? `${subpath}${targetRoute}` : targetRoute;
    const targetUrl = preserveQueryParams(fullRoute);
    window.location.href = targetUrl;
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f4f7fb', color: '#0f172a' }}>
      
      {/* MANTRA CARE TOP NAVBAR HEADER */}
      <header style={{
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '12px 28px',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        {/* Left Logo Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', color: '#334155' }}>
            <Menu size={22} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img 
              src={MANTRA_LOGO_URL} 
              alt="Mantra Care" 
              style={{ height: '32px', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Right Navigation Tabs */}
        <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '12px', gap: '4px', border: '1px solid #cbd5e1' }}>
          
          <button
            onClick={() => setActiveTab('campus_admin')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              padding: '8px 18px',
              borderRadius: '9px',
              border: 'none',
              background: activeTab === 'campus_admin' ? '#043263' : 'transparent',
              color: activeTab === 'campus_admin' ? '#ffffff' : '#475569',
              fontWeight: activeTab === 'campus_admin' ? 800 : 600,
              fontSize: '0.84rem',
              cursor: 'pointer',
              boxShadow: activeTab === 'campus_admin' ? '0 4px 12px rgba(4, 50, 99, 0.3)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <GraduationCap size={16} /> Campus Program
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              padding: '8px 18px',
              borderRadius: '9px',
              border: 'none',
              background: activeTab === 'submissions' ? '#043263' : 'transparent',
              color: activeTab === 'submissions' ? '#ffffff' : '#475569',
              fontWeight: activeTab === 'submissions' ? 800 : 600,
              fontSize: '0.84rem',
              cursor: 'pointer',
              boxShadow: activeTab === 'submissions' ? '0 4px 12px rgba(4, 50, 99, 0.3)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Database size={16} /> Form Submissions
          </button>

          <button
            onClick={() => setActiveTab('lessons')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              padding: '8px 18px',
              borderRadius: '9px',
              border: 'none',
              background: activeTab === 'lessons' ? '#043263' : 'transparent',
              color: activeTab === 'lessons' ? '#ffffff' : '#475569',
              fontWeight: activeTab === 'lessons' ? 800 : 600,
              fontSize: '0.84rem',
              cursor: 'pointer',
              boxShadow: activeTab === 'lessons' ? '0 4px 12px rgba(4, 50, 99, 0.3)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <BookOpen size={16} /> Pathways ({filteredActivities.length})
          </button>

        </div>
      </header>

      {/* MAIN CONTAINER CONTENT */}
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '24px 20px' }}>

        {/* TAB 1: CAMPUS PROGRAM ADMIN */}
        {activeTab === 'campus_admin' && (
          <div className="animate-fade-in">
            <CampusAdminDashboard />
          </div>
        )}

        {/* TAB 2: FORM SUBMISSIONS TABLE DATA */}
        {activeTab === 'submissions' && (
          <div className="animate-fade-in">
            <SubmissionsTable />
          </div>
        )}

        {/* TAB 3: LESSONS & ACTIVITIES PATHWAYS */}
        {activeTab === 'lessons' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h1 style={{ margin: '0 0 4px', fontSize: '1.6rem', fontWeight: 900, color: '#03254c' }}>
                  Pathways & Lessons ({filteredActivities.length})
                </h1>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                  Explore and test provider pathways across services
                </p>
              </div>

              {/* Service Filter Pills Bar */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', marginRight: '4px' }}>
                  <Filter size={14} /> Service:
                </span>
                {serviceOptions.map(svc => {
                  const isActive = selectedService === svc;
                  return (
                    <button
                      key={svc}
                      onClick={() => handleServiceSelect(svc)}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '20px',
                        border: isActive ? '1px solid #043263' : '1px solid #cbd5e1',
                        background: isActive ? '#043263' : '#ffffff',
                        color: isActive ? '#ffffff' : '#334155',
                        fontWeight: isActive ? 800 : 600,
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {svc === 'all' ? 'All Services' : svc.replace('_', ' ')}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search Bar */}
            <div style={{ position: 'relative', marginTop: '4px' }}>
              <div style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                pointerEvents: 'none'
              }}>
                <Search size={18} />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search pathways by name or route..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 44px',
                  borderRadius: '12px',
                  border: '2px solid #00a8e8',
                  fontSize: '0.92rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  background: '#ffffff'
                }}
              />
            </div>

            {/* Pathways Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px', marginTop: '8px' }}>
              {filteredActivities.length === 0 ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px 16px', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', color: '#64748b' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>No Pathways Found</div>
                  <div style={{ fontSize: '0.82rem', marginTop: '4px' }}>No pathways match service <strong>"{selectedService}"</strong> and search <strong>"{searchQuery}"</strong></div>
                </div>
              ) : (
                filteredActivities.map(act => (
                  <div
                    key={act.lessonId || act.route}
                    style={{
                      background: '#ffffff',
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justify: 'space-between',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '0.73rem', fontWeight: 800, color: '#043263', background: '#eff6ff', border: '1px solid #bfdbfe', padding: '2px 8px', borderRadius: '6px' }}>
                          +{act.rewardPoints || 5} Points
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={13} /> {act.estimatedDuration || '3 min'}
                        </span>
                      </div>

                      <h3 style={{ margin: '0 0 6px', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.35 }}>
                        {act.title}
                      </h3>

                      <div style={{ fontSize: '0.76rem', color: '#64748b', fontFamily: 'monospace', margin: '4px 0 12px' }}>
                        {act.route || `/task/${act.lessonId}`}
                      </div>
                    </div>

                    <div style={{ paddingTop: '12px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'capitalize' }}>
                        Services: {Array.isArray(act.services) ? act.services.join(', ') : (act.services || 'All')}
                      </span>

                      <button
                        onClick={() => launchPathway(act)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '8px',
                          border: 'none',
                          background: '#00a8e8',
                          color: '#ffffff',
                          fontWeight: 800,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        Open Pathway <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
