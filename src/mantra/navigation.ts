import { MANTRA_CONFIG } from './config';
import { getLesson } from './api';

/**
 * Centrally preserves all active URL query parameters (service, upa_id, uid, locale, etc.)
 * when navigating to a new path or route.
 */
export const preserveQueryParams = (targetPath: string): string => {
  if (typeof window === 'undefined' || !window.location) {
    return targetPath;
  }

  const currentSearch = window.location.search;
  if (!currentSearch) {
    return targetPath;
  }

  const [pathname, targetQuery] = targetPath.split('?');
  const currentParams = new URLSearchParams(currentSearch);

  if (targetQuery) {
    const targetParams = new URLSearchParams(targetQuery);
    targetParams.forEach((value, key) => {
      currentParams.set(key, value);
    });
  }

  const mergedSearch = currentParams.toString();
  return mergedSearch ? `${pathname}?${mergedSearch}` : pathname;
};

/**
 * Universal Exit / Back button handler for production embedding contexts:
 * 1. React Native WebView inside mobile app
 * 2. iframe inside web.mantracare.com
 * 3. Standalone browser
 */
export const handleExit = () => {
  if (typeof window === 'undefined') return;

  // 1. React Native WebView
  if ((window as any).ReactNativeWebView) {
    (window as any).ReactNativeWebView.postMessage(
      JSON.stringify({ action: "exit" })
    );
    return;
  }

  // 2. iframe inside provider.mantracare.com
  if (window.parent !== window) {
    window.parent.postMessage(
      { action: "exit" },
      "https://provider.mantracare.com"
    );
    return;
  }

  // 3. Standalone browser
  window.location.href = "https://provider.mantracare.com";
};

/**
 * Handles back routing. Navigates to Developer Dashboard in dev mode.
 */
export const goBack = (onBackCallback?: () => void) => {
  if (onBackCallback) {
    onBackCallback();
  } else {
    goToDashboard();
  }
};

/**
 * Redirects back to Developer Dashboard in dev mode, or handles exit in production.
 */
export const goToDashboard = () => {
  if (MANTRA_CONFIG.devMode) {
    goToLesson('/dev');
  } else {
    handleExit();
  }
};

/**
 * Navigates popstate router to the selected task route pathway,
 * automatically preserving query parameters.
 */
export const goToLesson = (route: string) => {
  const fullRoute = preserveQueryParams(route);
  window.history.pushState(null, '', fullRoute);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

/**
 * Controls completion redirection actions.
 */
export const redirectAfterCompletion = (lessonId: string, onBackCallback?: () => void) => {
  goToDashboard();
};
