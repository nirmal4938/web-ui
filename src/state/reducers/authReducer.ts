// src/state/reducers/authReducer.ts
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  RESET_AUTH_STATE,
  REHYDRATE_AUTH,
  type AuthState,
  type AuthActionTypes,
} from "../types/authTypes";

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  status: "idle",
};

export const authReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        status: "loading",
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        error: null,
        status: "succeeded",
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
        status: "failed",
      };

    case LOGOUT:
      return { ...initialState };

    case RESET_AUTH_STATE:
      return {
        ...state,
        loading: false,
        error: null,
        status: "idle",
      };

    case REHYDRATE_AUTH:
      if (action.payload.token && action.payload.user) {
        return {
          ...state,
          token: action.payload.token,
          user: action.payload.user,
          isAuthenticated: true,
          status: "succeeded",
        };
      }
      return { ...initialState };

    default:
      return state;
  }
};
