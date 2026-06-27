// ===================================================================================
// src/auth/LoginRedirect.ts
// Enterprise Login Redirect Helper
// SyncWare SaaS v2
// ===================================================================================

interface LoginResponse {
  success: boolean;
  scope: 'platform' | 'business';

  accessToken: string;

  redirectUrl?: string;

  business?: {
    id: string;
    name: string;
    slug: string;
    domain: string;
    category?: {
      id: string;
      key: string;
      name: string;
      subdomain: string;
    };
  } | null;

  businesses?: any[];
}

/**
 * Redirect user after successful login
 */
export const loginRedirect = (response: LoginResponse) => {
  if (!response.success) return;

  ////////////////////////////////////////////////////////////////////////////
  // Platform User
  ////////////////////////////////////////////////////////////////////////////

  if (response.scope === 'platform') {
    window.location.replace('/dashboard');
    return;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Business User
  ////////////////////////////////////////////////////////////////////////////

  if (response.scope === 'business') {
    if (!response.business) {
      window.location.replace('/select-business');
      return;
    }

    const isLocal = window.location.hostname === 'localhost';

    /////////////////////////////////////////////////////////////////////////
    // LOCAL DEVELOPMENT
    /////////////////////////////////////////////////////////////////////////

    if (isLocal) {
      const category = response.business.category?.key;

      const portMap: Record<string, number> = {
        mobile: 5174,
        garments: 5175,
      };

      const port = portMap[category ?? ''] ?? 5174;

      const session = btoa(
        JSON.stringify({
          accessToken: response.accessToken,
          businessId: response.business.id,
          timestamp: Date.now(),
        })
      );

      window.location.replace(`http://localhost:${port}/bootstrap?session=${session}`);

      return;
    }

    /////////////////////////////////////////////////////////////////////////
    // PRODUCTION
    /////////////////////////////////////////////////////////////////////////

    window.location.replace(`https://${response.business.domain}/bootstrap`);

    return;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Fallback
  ////////////////////////////////////////////////////////////////////////////

  window.location.replace('/dashboard');
};

export default loginRedirect;
