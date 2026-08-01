/**
 * Mantra Care Platform Configuration
 */
const getDynamicApiBase = () => {
  if (typeof window === 'undefined') return '';
  const p = window.location.pathname;
  // Match subpath slug (e.g. /provider_pathways_dashboard_v2)
  const subpathMatch = p.match(/^(\/[^\/]+)/);
  const prefix = (subpathMatch && subpathMatch[1] && !subpathMatch[1].startsWith('/api') && !subpathMatch[1].startsWith('/task')) ? subpathMatch[1] : '';
  
  if (import.meta.env.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL.replace(/\/api\/?$/, '');
  }
  
  return import.meta.env.PROD ? prefix : 'http://localhost:5000';
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