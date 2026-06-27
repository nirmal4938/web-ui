// ===================================================================================
// src/state/actions/authActions.ts
// Enterprise Auth Actions
// ===================================================================================

import type { Dispatch } from 'redux';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  RESET_AUTH_STATE,
  REHYDRATE_AUTH,
  type AuthActionTypes,
  type Role,
} from '../types/authTypes';

import { AuthService } from '@/api/authService';

//////////////////////////////////////////////////////////////////////////////////////
// LOGIN
//////////////////////////////////////////////////////////////////////////////////////

export const login =
  (email: string, password: string) =>
  async (dispatch: Dispatch<AuthActionTypes>): Promise<any> => {
    dispatch({
      type: LOGIN_REQUEST,
    });

    try {
      const response = await AuthService.login({
        email,
        password,
      });

      const { accessToken, user, role, business, scope, permissions, businesses } = response;

      AuthService.saveAccessToken(accessToken);
      AuthService.saveUser(user);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: accessToken,
          user,
          role,
          business,
          scope,
          permissions,
          businesses,
        },
      });

      return response;
    } catch (error: any) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error?.response?.data?.message || 'Invalid email or password.',
      });

      return null;
    }
  };

//////////////////////////////////////////////////////////////////////////////////////
// LOGOUT
//////////////////////////////////////////////////////////////////////////////////////

export const logout =
  () =>
  async (dispatch: Dispatch<AuthActionTypes>): Promise<void> => {
    try {
      await AuthService.logout();
    } catch (err) {
      console.warn('Logout API failed.', err);
    } finally {
      AuthService.clearLocalSession();

      dispatch({
        type: LOGOUT,
      });
    }
  };

//////////////////////////////////////////////////////////////////////////////////////
// RESET
//////////////////////////////////////////////////////////////////////////////////////

export const resetAuth = (): AuthActionTypes => ({
  type: RESET_AUTH_STATE,
});

//////////////////////////////////////////////////////////////////////////////////////
// REHYDRATE
//////////////////////////////////////////////////////////////////////////////////////

export const rehydrateAuth = (): AuthActionTypes => {
  const token = AuthService.getAccessToken();

  const user = AuthService.getUser();

  return {
    type: REHYDRATE_AUTH,

    payload: {
      token,

      user,

      role: null,

      business: null,

      scope: null,

      permissions: [],

      businesses: [],
    },
  };
};

//////////////////////////////////////////////////////////////////////////////////////
// BOOTSTRAP
// Called by AuthProvider
//////////////////////////////////////////////////////////////////////////////////////

export const bootstrapAuth =
  () =>
  async (dispatch: Dispatch<AuthActionTypes>): Promise<boolean> => {
    try {
      const token = AuthService.getAccessToken();

      if (!token) {
        return false;
      }

      const profile = await AuthService.getProfile();

      dispatch({
        type: LOGIN_SUCCESS,

        payload: {
          token,

          user: profile.user,

          role: profile.role ?? null,

          business: profile.business ?? null,

          scope: profile.scope ?? null,

          permissions: profile.permissions ?? [],

          businesses: profile.businesses ?? [],
        },
      });

      return true;
    } catch (err) {
      AuthService.clearLocalSession();

      dispatch({
        type: LOGOUT,
      });

      return false;
    }
  };

//////////////////////////////////////////////////////////////////////////////////////
// GOOGLE LOGIN
//////////////////////////////////////////////////////////////////////////////////////

export const loginWithGoogle =
  () =>
  async (dispatch: Dispatch<AuthActionTypes>): Promise<void> => {
    dispatch({
      type: LOGIN_REQUEST,
    });

    try {
      await AuthService.loginWithGoogle();
    } catch (error: any) {
      dispatch({
        type: LOGIN_FAILURE,

        payload: error?.response?.data?.message || 'Google login initialization failed.',
      });
    }
  };
