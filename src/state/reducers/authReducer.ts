// src/state/reducers/authReducer.ts
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  RESET_AUTH_STATE,
  type AuthState,
  type AuthActionTypes,
} from "../types/authTypes";

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
  isAuthenticated: null,
};

export const authReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: "true",
      };

    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case LOGOUT:
      return { ...initialState };

    case RESET_AUTH_STATE: // 🆕 reset case
      return { ...initialState };

    default:
      return state;
  }
};
