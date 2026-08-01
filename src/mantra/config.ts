/**
 * Mantra Care Platform Configuration
 */
let cachedSubpathPrefix: string | null = null;

const getDynamicApiBase = () => {
  if (typeof window === 'undefined') return '';
  
  if (import.meta.env.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL.replace(/\/api\/?$/, '');
  }

  if (!import.meta.env.PROD) {
    return 'http://localhost:5000';
  }

  if (cachedSubpathPrefix !== null) {
    return cachedSubpathPrefix;
  }

  try {
    const stored = sessionStorage.getItem('mantra_subpath_prefix');
    if (stored) {
      cachedSubpathPrefix = stored;
      return stored;
    }
  } catch (e) {}

  const p = window.location.pathname;
  const segments = p.split('/').filter(Boolean);
  const firstSegment = segments[0] ? `/${segments[0]}` : '';

  let prefix = '/provider_pathways_dashboard_v2'; // Default fallback production subpath
  if (firstSegment && firstSegment !== '/api' && firstSegment !== '/task') {
    prefix = firstSegment;
  }

  try {
    sessionStorage.setItem('mantra_subpath_prefix', prefix);
  } catch (e) {}

  cachedSubpathPrefix = prefix;
  return prefix;
};

export const MANTRA_CONFIG = {
  get apiBaseUrl() {
    return getDynamicApiBase();
  },

  dashboardUrl: 'https://provider.mantracare.com/pathway',

  webhookUrl: 'https://api.mantracare.com/webhook/pathway',

  /**
   * Default webhook intent.
   * Supported values:
   * - complete_activity
   * - assign_activity
   * - assign_pathway
   * - assign_and_complete_activity
   */
  defaultWebhookIntent: 'complete_activity',

  redirectAfterCompletion: false,

  devMode: true
} as const;