// src/state/types/authTypes.ts

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const RESET_AUTH_STATE = "RESET_AUTH_STATE"; // 🆕 Add this

export interface User {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: any
  organization?: {
    id: string;
    name: string;
  };
}

export interface AuthState {
  isAuthenticated: string | null;
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Action Interfaces
interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}
interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: { token: string; user: User };
}
interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: string;
}
interface LogoutAction {
  type: typeof LOGOUT;
}
interface ResetAuthStateAction {   // 🆕 Add this
  type: typeof RESET_AUTH_STATE;
}

export type AuthActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | ResetAuthStateAction; // 🆕 Include here
