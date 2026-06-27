// ===================================================================================
// src/api/authService.ts
// Enterprise Ready Auth Service
// SyncWare SaaS v2
// ===================================================================================

import axiosInstance from './axiosInstance';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
}

export interface AuthRole {
  id: string;
  name: string;
  slug: string;
  scope: string;
  level: number;
}

export interface BusinessCategory {
  id: string;
  key: string;
  name: string;
  subdomain: string;
}

export interface Business {
  id: string;
  name: string;
  slug: string;
  domain?: string | null;
  category: BusinessCategory;
}

export interface LoginResponse {
  success: boolean;

  scope: 'platform' | 'business';

  accessToken: string;

  redirectUrl: string;

  user: AuthUser;

  role: AuthRole;

  business: Business | null;

  permissions: string[];

  businesses: Business[];
}

export const AuthService = {
  // ============================================================================
  // LOGIN
  // ============================================================================

  async login(payload: LoginPayload): Promise<LoginResponse> {
    const { data } = await axiosInstance.post<LoginResponse>('/auth/login', payload, {
      withCredentials: true,
    });

    return data;
  },

  // ============================================================================
  // LOGOUT
  // ============================================================================

  async logout() {
    const { data } = await axiosInstance.post(
      '/auth/logout',
      {},
      {
        withCredentials: true,
      }
    );

    return data;
  },

  // ============================================================================
  // REFRESH ACCESS TOKEN
  // Cookie Based
  // ============================================================================

  async refreshToken() {
    const { data } = await axiosInstance.post(
      '/auth/refresh',
      {},
      {
        withCredentials: true,
      }
    );

    return data;
  },

  // ============================================================================
  // CURRENT USER
  // Bootstrap Application
  // ============================================================================

  async getProfile() {
    const { data } = await axiosInstance.get('/auth/me', {
      withCredentials: true,
    });

    return data;
  },

  // ============================================================================
  // TENANT SESSION
  // ============================================================================

  async getTenantSession() {
    const { data } = await axiosInstance.get('/auth/tenant-session', {
      withCredentials: true,
    });

    return data;
  },

  // ============================================================================
  // GOOGLE LOGIN
  // ============================================================================

  async loginWithGoogle() {
    const { data } = await axiosInstance.get('/auth/google/url');

    window.location.href = data.url;
  },

  // ============================================================================
  // GOOGLE CALLBACK
  // Called from AuthSuccess Page
  // ============================================================================

  async bootstrapGoogleLogin(accessToken: string) {
    localStorage.setItem('token', accessToken);

    const profile = await this.getProfile();

    return profile;
  },

  // ============================================================================
  // SESSION EXISTS?
  // ============================================================================

  async hasSession(): Promise<boolean> {
    try {
      await this.getProfile();
      return true;
    } catch {
      return false;
    }
  },

  // ============================================================================
  // SAVE ACCESS TOKEN
  // ============================================================================

  saveAccessToken(token: string) {
    localStorage.setItem('token', token);
  },

  // ============================================================================
  // GET ACCESS TOKEN
  // ============================================================================

  getAccessToken(): string | null {
    return localStorage.getItem('token');
  },

  // ============================================================================
  // REMOVE ACCESS TOKEN
  // ============================================================================

  removeAccessToken() {
    localStorage.removeItem('token');
  },

  // ============================================================================
  // SAVE USER
  // ============================================================================

  saveUser(user: unknown) {
    localStorage.setItem('user', JSON.stringify(user));
  },

  // ============================================================================
  // GET USER
  // ============================================================================

  getUser() {
    const user = localStorage.getItem('user');

    if (!user) return null;

    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  },

  // ============================================================================
  // CLEAR LOCAL SESSION
  // ============================================================================

  clearLocalSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export default AuthService;
