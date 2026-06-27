// ===================================================================================
// src/state/reducers/authReducer.ts
// Enterprise Auth Reducer
// SyncWare SaaS v2
// ===================================================================================

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  RESET_AUTH_STATE,
  REHYDRATE_AUTH,
  type AuthActionTypes,
  type AuthState,
} from '../types/authTypes';

const initialState: AuthState = {
  token: null,

  user: null,

  role: null,

  business: null,

  scope: null,

  permissions: [],

  businesses: [],

  loading: false,

  initialized: false,

  isAuthenticated: false,

  error: null,

  status: 'idle',
};

export const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    ////////////////////////////////////////////////////////////////////////////
    // LOGIN REQUEST
    ////////////////////////////////////////////////////////////////////////////

    case LOGIN_REQUEST:
      return {
        ...state,

        loading: true,

        error: null,

        status: 'loading',
      };

    ////////////////////////////////////////////////////////////////////////////
    // LOGIN SUCCESS
    ////////////////////////////////////////////////////////////////////////////

    case LOGIN_SUCCESS:
      return {
        ...state,

        loading: false,

        initialized: true,

        isAuthenticated: true,

        error: null,

        status: 'succeeded',

        token: action.payload.token,

        user: action.payload.user,

        role: action.payload.role,

        business: action.payload.business,

        scope: action.payload.scope,

        permissions: action.payload.permissions,

        businesses: action.payload.businesses,
      };

    ////////////////////////////////////////////////////////////////////////////
    // LOGIN FAILURE
    ////////////////////////////////////////////////////////////////////////////

    case LOGIN_FAILURE:
      return {
        ...state,

        loading: false,

        initialized: true,

        isAuthenticated: false,

        error: action.payload,

        status: 'failed',
      };

    ////////////////////////////////////////////////////////////////////////////
    // REHYDRATE
    ////////////////////////////////////////////////////////////////////////////

    case REHYDRATE_AUTH:
      return {
        ...state,

        token: action.payload.token,

        user: action.payload.user,

        role: action.payload.role,

        business: action.payload.business,

        scope: action.payload.scope,

        permissions: action.payload.permissions,

        businesses: action.payload.businesses,

        initialized: true,

        isAuthenticated: !!action.payload.token,

        status: action.payload.token ? 'succeeded' : 'idle',

        loading: false,

        error: null,
      };

    ////////////////////////////////////////////////////////////////////////////
    // RESET
    ////////////////////////////////////////////////////////////////////////////

    case RESET_AUTH_STATE:
      return {
        ...state,

        loading: false,

        error: null,

        status: 'idle',
      };

    ////////////////////////////////////////////////////////////////////////////
    // LOGOUT
    ////////////////////////////////////////////////////////////////////////////

    case LOGOUT:
      return {
        ...initialState,

        initialized: true,
      };

    ////////////////////////////////////////////////////////////////////////////
    // DEFAULT
    ////////////////////////////////////////////////////////////////////////////

    default:
      return state;
  }
};

export default authReducer;
