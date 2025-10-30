import axiosInstance from "./axiosInstance";

export interface LoginPayload {
  email: string;
  password: string;
}

export const AuthService = {
  // 🔐 Login
  async login(payload: LoginPayload) {
    const response = await axiosInstance.post("/auth/login", payload, {
      withCredentials: true, // important if you’re using cookies/session
    });
    return response.data;
  },

  // 🚪 Logout
  async logout() {
    const response = await axiosInstance.post(
      "/auth/logout",
      {},
      {
        withCredentials: true, // ensures cookies are cleared on the same domain
      }
    );
    return response.data;
  },

  // ✅ Optional: check active session (for persistent login)
  async checkSession() {
    const response = await axiosInstance.get("/auth/session", {
      withCredentials: true,
    });
    return response.data;
  },
};
