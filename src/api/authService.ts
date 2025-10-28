import axiosInstance from "./axiosInstance";
export interface OrgRegisterPayload {
  name: string;
  email: string;
  phone: string;
  password?: string;
  logoUrl?: string;
}
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

   async registerOrganization(payload: OrgRegisterPayload) {
    const res = await axiosInstance.post("/organizations/register", payload);
    return res.data; // should return organizationId or similar
  },

  async createPaymentOrder(amount: number, orgId: string) {
    const res = await axiosInstance.post("/payments/create-order", {
      amount,
      organizationId: orgId,
    });
    return res.data;
  },
};
