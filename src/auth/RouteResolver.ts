// ===================================================================================
// src/auth/RouteResolver.ts
// Enterprise Route Resolver
// SyncWare SaaS v2
// ===================================================================================

export interface RouteResolverResponse {
  scope: 'platform' | 'business';

  redirectUrl?: string;

  role?: {
    slug: string;
    level: number;
  };

  business?: {
    id: string;
    slug: string;
    domain: string;
    category?: {
      key: string;
      subdomain: string;
    };
  } | null;
}

/**
 * Resolve the first landing page after login.
 * Pure function.
 * No navigation.
 */
export const resolveLandingRoute = (auth: RouteResolverResponse): string => {
  ////////////////////////////////////////////////////////////////////////////
  // Platform Users
  ////////////////////////////////////////////////////////////////////////////

  if (auth.scope === 'platform') {
    if (auth.redirectUrl) {
      return auth.redirectUrl;
    }

    return '/dashboard';
  }

  ////////////////////////////////////////////////////////////////////////////
  // Business Users
  ////////////////////////////////////////////////////////////////////////////

  if (auth.scope === 'business') {
    if (auth.redirectUrl) {
      return auth.redirectUrl;
    }

    return '/dashboard';
  }

  ////////////////////////////////////////////////////////////////////////////
  // Fallback
  ////////////////////////////////////////////////////////////////////////////

  return '/';
};

/**
 * Returns whether browser must leave current SPA.
 */
export const requiresExternalRedirect = (auth: RouteResolverResponse): boolean => {
  if (auth.scope !== 'business') {
    return false;
  }

  const host = window.location.hostname;

  if (host === 'localhost') {
    return true;
  }

  if (auth.business?.domain && host !== auth.business.domain) {
    return true;
  }

  return false;
};

/**
 * Local development URL resolver.
 */
export const resolveLocalBusinessURL = (auth: RouteResolverResponse): string => {
  const category = auth.business?.category?.key ?? '';

  const ports: Record<string, number> = {
    mobile: 5174,
    garments: 5175,
  };

  const port = ports[category] ?? 5174;

  return `http://localhost:${port}`;
};

/**
 * Production URL resolver.
 */
export const resolveProductionBusinessURL = (auth: RouteResolverResponse): string => {
  return `https://${auth.business?.domain}`;
};

/**
 * Final Business URL.
 */
export const resolveBusinessBaseURL = (auth: RouteResolverResponse): string => {
  if (window.location.hostname === 'localhost') {
    return resolveLocalBusinessURL(auth);
  }

  return resolveProductionBusinessURL(auth);
};

export default {
  resolveLandingRoute,
  requiresExternalRedirect,
  resolveBusinessBaseURL,
  resolveLocalBusinessURL,
  resolveProductionBusinessURL,
};
