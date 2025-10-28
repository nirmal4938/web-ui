import axiosInstance from "./axiosInstance";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

export const AuthService = {
  async login(payload: LoginPayload) {
    const response = await axiosInstance.post("/auth/login", payload);
    return response.data;
  },

  async register(payload: RegisterPayload) {
    const response = await axiosInstance.post("/auth/register", payload);
    return response.data;
  },
};
