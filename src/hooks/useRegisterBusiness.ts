// src/hooks/useRegisterBusiness.ts

import { useState } from 'react';

import Swal from 'sweetalert2';

import { registerBusiness } from '@/services/onboardingService';

export const useRegisterBusiness = () => {
  const [loading, setLoading] = useState(false);

  const submit = async (values: any, resetForm: () => void, navigate: any) => {
    try {
      setLoading(true);

      const res = await registerBusiness(values);

      localStorage.setItem('accessToken', res.data.token);
      console.log('res', res);
      //   Swal.fire({
      //     icon: 'success',

      //     title: 'Business Created',

      //     text: `Welcome to SyncWare ${res.data.business.name}`,
      //   });

      //   resetForm();

      //   navigate('/dashboard');
    } catch (err: any) {
      Swal.fire({
        icon: 'error',

        title: 'Registration Failed',

        text: err?.response?.data?.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,

    submit,
  };
};
