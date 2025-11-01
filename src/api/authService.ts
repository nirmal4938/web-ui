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

  //   async loginWithGoogle() {
  //   try {
  //     // Backend route handles redirect to Google
  //     const { data } = await axiosInstance.get("/auth/google/url");
  //     // The backend can send the correct Google consent URL
  //     window.location.href = data.url; // clean single responsibility
  //   } catch (error) {
  //     console.error("Failed to start Google OAuth:", error);
  //   }
  // },

  async getProfile(token: string) {
    const response = await axiosInstance.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
      
    });
    return response.data.user || response.data; // flexible with backend shape
  },
async loginWithGoogle() {
  try {
    // ✅ Ask backend for the correct OAuth URL
    const { data } = await axiosInstance.get("/auth/google/url");
    // ✅ Then redirect browser (no CORS issue)
    window.location.href = data.url;
  } catch (error) {
    console.error("Failed to start Google OAuth:", error);
  }
}
};



