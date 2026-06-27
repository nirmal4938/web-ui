// src/services/onboardingService.ts

import axios from 'axios';

const API = import.meta.env.VITE_DEV_API_BASE_URL;

export const registerBusiness = async (payload: any) => {
  const res = await axios.post(`${API}/onboarding/register-business`, payload, {
    withCredentials: true,
  });

  return res.data;
};
