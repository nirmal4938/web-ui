import type { Dispatch } from "redux";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  RESET_AUTH_STATE,
  type AuthActionTypes,
} from "../types/authTypes";
import { AuthService } from "@/api/authService"; // ✅ Make sure path matches your structure

// 🔐 LOGIN ACTION
export const login =
  (email: string, password: string) =>
  async (dispatch: Dispatch<AuthActionTypes>): Promise<boolean> => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const response = await AuthService.login({ email, password });
      const { token, user } = response;

      // ✅ Store session token in localStorage
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

// 🚪 LOGOUT ACTION (API + Redux + Local Cleanup)
export const logout =
  () =>
  async (dispatch: Dispatch<AuthActionTypes>): Promise<void> => {
    try {
      await AuthService.logout(); // 🔁 Call server to invalidate session/cookie
    } catch (error) {
      console.warn("Logout API call failed, continuing local cleanup.", error);
    } finally {
      // 🧹 Clean up local storage + Redux
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      dispatch({ type: LOGOUT });
    }
  };

// 🔄 RESET AUTH STATE (useful for closing modals, etc.)
export const resetAuth = (): AuthActionTypes => ({
  type: RESET_AUTH_STATE,
});
