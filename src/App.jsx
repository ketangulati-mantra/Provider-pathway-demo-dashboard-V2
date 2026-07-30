import React, { useState, useEffect } from 'react';
import './App.css';
import { MANTRA_CONFIG, getCurrentService, getAvailableActivities, preserveQueryParams } from './mantra';
import { resolveLessonView } from './views/viewResolver';
import DeveloperLessonsPage from './views/DeveloperLessonsPage';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  // Dynamic base path support for root (Vercel/local) or subfolder (/provider_pathways) deployments
  const envBase = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

  const getPath = () => {
    let p = window.location.pathname;
    if (envBase && p.startsWith(envBase)) {
      p = p.slice(envBase.length) || '/';
    } else if (p.startsWith('/provider_pathways')) {
      p = p.slice('/provider_pathways'.length) || '/';
    }
    return p || '/';
  };

  const [currentPath, setCurrentPath] = useState(getPath());

  // Current service context extracted once at startup via URL parameter (e.g. ?service=therapy)
  const currentService = getCurrentService();

  // Custom router state listener
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    const activeBase = envBase || (window.location.pathname.startsWith('/provider_pathways') ? '/provider_pathways' : '');
    const fullPath = path === '/' ? (activeBase || '/') : ((activeBase + path).replace('//', '/'));
    const targetUrl = preserveQueryParams(fullPath);
    window.history.replaceState(null, '', targetUrl);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get activities filtered for the current service context
  const availableActivities = getAvailableActivities(currentService);

  // Render view based on route path and service context
  const renderView = () => {
    if (currentPath === '/dev') {
      if (!MANTRA_CONFIG.devMode) {
        window.location.replace(preserveQueryParams(MANTRA_CONFIG.dashboardUrl));
        return null;
      }
      return (
        <DeveloperLessonsPage
          onNavigate={navigate}
        />
      );
    }

    const onBackCallback = () => navigate('/dev');

    // Use viewResolver to map route and service to appropriate lesson component
    const resolvedView = resolveLessonView({
      currentPath,
      currentService,
      onBack: onBackCallback,
      activities: availableActivities
    });

    if (resolvedView) {
      return resolvedView;
    }

    // Default Bare-bones Branded Fallback for Root / and unmapped paths
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'var(--bg-app)',
        padding: '24px',
        textAlign: 'center'
      }}>
        <div className="academy-card glass-panel text-center animate-scale-in" style={{ maxWidth: '440px', padding: '40px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <img src="https://res.cloudinary.com/hxbamdqf/image/upload/v1784698269/Mantra_logo_yptwwe.svg" alt="Mantra Logo" style={{ height: '36px', display: 'block', marginBottom: '8px' }} />

          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text-main)', fontSize: '1.35rem', marginBottom: '8px' }}>
              Mantra Provider Academy
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '4px' }}>
              This application powers interactive learning modules for providers.
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6', textTransform: 'capitalize' }}>
              Active Service Pathway: <strong>{currentService}</strong>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="academy-layout">
      <ErrorBoundary>
        {renderView()}
      </ErrorBoundary>
    </div>
  );
}

export default App;
