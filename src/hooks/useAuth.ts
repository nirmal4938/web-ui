// ===================================================================================
// src/hooks/useAuth.ts
// Enterprise Ready Auth Hook
// SyncWare SaaS v2
// ===================================================================================

import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '@/state/reducers/rootReducer';
import type { AppDispatch } from '@/state/store/store';

import {
  login,
  logout,
  loginWithGoogle,
  bootstrapAuth,
  resetAuth,
} from '@/state/actions/authActions';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  const auth = useSelector((state: RootState) => state.auth);

  return {
    // =========================================================================
    // STATE
    // =========================================================================

    token: auth.token,

    user: auth.user,

    role: auth.role,

    business: auth.business,

    scope: auth.scope,

    permissions: auth.permissions,

    businesses: auth.businesses,

    loading: auth.loading,

    initialized: auth.initialized,

    error: auth.error,

    status: auth.status,

    isAuthenticated: auth.isAuthenticated,

    // =========================================================================
    // ROLE HELPERS
    // =========================================================================

    hasRole: (...roles: string[]) => {
      if (!auth.role) return false;

      return roles.includes(auth.role.slug);
    },

    // =========================================================================
    // PERMISSION HELPERS
    // =========================================================================

    hasPermission: (permission: string) => {
      return auth.permissions.includes(permission);
    },

    hasAnyPermission: (permissions: string[]) => {
      return permissions.some(permission => auth.permissions.includes(permission));
    },

    hasAllPermissions: (permissions: string[]) => {
      return permissions.every(permission => auth.permissions.includes(permission));
    },

    // =========================================================================
    // BUSINESS HELPERS
    // =========================================================================

    hasBusiness: (businessId: string) => {
      return auth.business?.id === businessId;
    },

    hasBusinessSlug: (slug: string) => {
      return auth.business?.slug === slug;
    },

    isPlatformUser: auth.scope === 'platform',

    isBusinessUser: auth.scope === 'business',

    // =========================================================================
    // ACTIONS
    // =========================================================================

    login: (email: string, password: string) => dispatch<any>(login(email, password)),

    logout: () => dispatch<any>(logout()),

    loginWithGoogle: () => dispatch<any>(loginWithGoogle()),

    bootstrap: () => dispatch<any>(bootstrapAuth()),

    reset: () => dispatch(resetAuth()),
  };
};

export default useAuth;
