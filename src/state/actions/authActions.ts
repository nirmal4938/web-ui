// src/state/actions/authActions.ts
import type { Dispatch } from "redux";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  RESET_AUTH_STATE,
  REHYDRATE_AUTH,
  type AuthActionTypes,
} from "../types/authTypes";
import { AuthService } from "@/api/authService";

// 🔐 LOGIN ACTION
export const login =
  (email: string, password: string) =>
  async (dispatch: Dispatch<AuthActionTypes>): Promise<boolean> => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const response = await AuthService.login({ email, password });
      const { token, user } = response;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch({ type: LOGIN_SUCCESS, payload: { token, user } });
      return true;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Invalid email or password.";
      dispatch({ type: LOGIN_FAILURE, payload: message });
      return false;
    }
  };

// 🚪 LOGOUT ACTION
export const logout =
  () =>
  async (dispatch: Dispatch<AuthActionTypes>): Promise<void> => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.warn("Logout API call failed, continuing local cleanup.", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch({ type: LOGOUT });
    }
  };

// 🔄 RESET AUTH STATE
export const resetAuth = (): AuthActionTypes => ({
  type: RESET_AUTH_STATE,
});

// ♻️ REHYDRATE AUTH (from localStorage)
export const rehydrateAuth = (): AuthActionTypes => {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  return {
    type: REHYDRATE_AUTH,
    payload: { token, user },
  };
};

// 🔐 GOOGLE LOGIN
export const loginWithGoogle =
  () => async (dispatch: Dispatch<AuthActionTypes>): Promise<void> => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      // 🚧 If this returns a token/user directly:
      const response: any = await AuthService.loginWithGoogle();

      if (response?.token && response?.user) {
        const { token, user } = response;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: LOGIN_SUCCESS, payload: { token, user } });
      } else {
        // If using redirect OAuth flow:
        dispatch({
          type: LOGIN_FAILURE,
          payload: "Redirecting to Google login...",
        });
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Google login initialization failed.";
      dispatch({ type: LOGIN_FAILURE, payload: message });
    }
  };
