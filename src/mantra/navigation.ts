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
  const currentParams = new URLSearchParams(targetQuery);

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
 * Handles exit actions by navigating back to the Developer Dashboard (/dev).
 */
export const handleExit = () => {
  goToLesson('/dev');
};

/**
 * Handles back routing, navigating back to Developer Dashboard (/dev).
 */
export const goBack = (onBackCallback?: () => void) => {
  if (onBackCallback) {
    onBackCallback();
  } else {
    goToDashboard();
  }
};

/**
 * Redirects back to the Developer Dashboard (/dev).
 */
export const goToDashboard = () => {
  goToLesson('/dev');
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
