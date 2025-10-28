// useOtp.ts
import { useState } from "react";

export const useOtp = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const sendOtp = async (phone: string) => {
    setMessage("Sending OTP...");
    // Call backend API securely
    await new Promise(res => setTimeout(res, 1000));
    setOtpSent(true);
    setMessage("OTP sent!");
  };

  const verifyOtp = async (otp: string) => {
    setMessage("Verifying OTP...");
    // Call backend verification
    await new Promise(res => setTimeout(res, 1000));
    setOtpVerified(true);
    setMessage("Verified ✅");
  };

  return { otpSent, otpVerified, message, sendOtp, verifyOtp };
};
