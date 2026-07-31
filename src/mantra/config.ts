/**
 * Mantra Care Platform Configuration
 */
export const MANTRA_CONFIG = {
  apiBaseUrl: import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5000'),

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