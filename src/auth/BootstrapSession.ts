// ===================================================================================
// src/auth/BootstrapSession.ts
// Enterprise Bootstrap Session
// SyncWare SaaS v2
// ===================================================================================

import axiosInstance from '@/api/axiosInstance';

export interface BootstrapSession {
  accessToken: string;
  businessId: string;
  timestamp: number;
}

/**
 * Decode session received from Platform App.
 */
export const decodeBootstrapSession = (encoded: string): BootstrapSession | null => {
  try {
    const json = atob(encoded);
    return JSON.parse(json);
  } catch (error) {
    console.error('Invalid bootstrap session.', error);
    return null;
  }
};

/**
 * Save bootstrap session.
 */
export const saveBootstrapSession = (session: BootstrapSession) => {
  localStorage.setItem('token', session.accessToken);
  localStorage.setItem('businessId', session.businessId);
};

/**
 * Remove bootstrap session.
 */
export const clearBootstrapSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('businessId');
};

/**
 * Verify current token with backend.
 */
export const verifyBootstrapSession = async () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      return null;
    }

    const response = await axiosInstance.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.user ?? response.data;
  } catch (error) {
    clearBootstrapSession();
    return null;
  }
};

/**
 * Complete bootstrap flow.
 *
 * Used on:
 *
 * /bootstrap?session=xxxxx
 */
export const bootstrapLogin = async (encoded: string) => {
  const session = decodeBootstrapSession(encoded);

  if (!session) {
    return null;
  }

  saveBootstrapSession(session);

  const user = await verifyBootstrapSession();

  if (!user) {
    return null;
  }

  return {
    user,
    token: session.accessToken,
    businessId: session.businessId,
  };
};

export default {
  decodeBootstrapSession,
  saveBootstrapSession,
  clearBootstrapSession,
  verifyBootstrapSession,
  bootstrapLogin,
};
