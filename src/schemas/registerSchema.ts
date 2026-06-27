// src/schemas/registerSchema.ts

import * as Yup from 'yup';

export const RegisterSchema = Yup.object({
  fullName: Yup.string().min(3).max(60).required('Full name is required'),

  email: Yup.string().email('Invalid email').required('Email is required'),

  password: Yup.string()
    .min(8, 'Minimum 8 characters')
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, 'Must contain uppercase, lowercase and number')
    .required(),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required(),

  businessCategoryId: Yup.string().required(),

  businessName: Yup.string().min(3).max(120).required(),

  phone: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Invalid mobile number')
    .required(),

  address: Yup.string().min(5).required(),

  agreeToTerms: Yup.boolean().oneOf([true], 'Accept Terms'),
});
