// src/state/types/authTypes.ts
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const RESET_AUTH_STATE = "RESET_AUTH_STATE";
export const REHYDRATE_AUTH = "REHYDRATE_AUTH";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  avatarUrl?: string;
  fullName?: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
}

// Action interfaces
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
interface ResetAuthAction {
  type: typeof RESET_AUTH_STATE;
}
interface RehydrateAuthAction {
  type: typeof REHYDRATE_AUTH;
  payload: { token: string | null; user: User | null };
}

export type AuthActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | ResetAuthAction
  | RehydrateAuthAction;
