// ===================================================================================
// src/state/types/authTypes.ts
// Enterprise Auth Types
// SyncWare SaaS v2
// ===================================================================================

/* ============================================================================
 * ACTION TYPES
 * ========================================================================== */

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const RESET_AUTH_STATE = 'RESET_AUTH_STATE';
export const REHYDRATE_AUTH = 'REHYDRATE_AUTH';

/* ============================================================================
 * USER
 * ========================================================================== */

export interface User {
  id: string;
  email: string;

  name?: string;
  fullName?: string;

  avatar?: string;
  avatarUrl?: string;
}

/* ============================================================================
 * ROLE
 * ========================================================================== */

export interface Role {
  id: string;

  name: string;

  slug: string;

  scope: 'platform' | 'business';

  level: number;
}

/* ============================================================================
 * BUSINESS CATEGORY
 * ========================================================================== */

export interface BusinessCategory {
  id: string;

  key: string;

  name: string;

  subdomain: string;
}

/* ============================================================================
 * BUSINESS
 * ========================================================================== */

export interface Business {
  id: string;

  name: string;

  slug: string;

  domain?: string | null;

  category: BusinessCategory;
}

/* ============================================================================
 * AUTH STATE
 * ========================================================================== */

export interface AuthState {
  /**
   * JWT Access Token
   */
  token: string | null;

  /**
   * Logged in user
   */
  user: User | null;

  /**
   * Current role
   */
  role: Role | any;

  /**
   * Current Business
   */
  business: Business | null;

  /**
   * Current Scope
   * platform | business
   */
  scope: 'platform' | 'business' | null;

  /**
   * Permission Slugs
   */
  permissions: string[];

  /**
   * User Businesses
   */
  businesses: Business[];

  /**
   * Loading State
   */
  loading: boolean;

  /**
   * Bootstrap Finished?
   */
  initialized: boolean;

  /**
   * Logged In?
   */
  isAuthenticated: boolean;

  /**
   * Error
   */
  error: string | null;

  /**
   * Async Status
   */
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

/* ============================================================================
 * ACTIONS
 * ========================================================================== */

export interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;

  payload: {
    token: string;

    user: User;

    role: Role | any;

    business: Business | null;

    scope: 'platform' | 'business';

    permissions: string[];

    businesses: Business[];
  };
}

export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;

  payload: string;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export interface ResetAuthAction {
  type: typeof RESET_AUTH_STATE;
}

export interface RehydrateAuthAction {
  type: typeof REHYDRATE_AUTH;

  payload: {
    token: string | null;

    user: User | null;

    role: Role | null;

    business: Business | null;

    scope: 'platform' | 'business' | null;

    permissions: string[];

    businesses: Business[];
  };
}

/* ============================================================================
 * UNION
 * ========================================================================== */

export type AuthActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | ResetAuthAction
  | RehydrateAuthAction;
