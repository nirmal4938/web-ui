// src/hooks/useUserRegister.ts
import { useState } from "react";

export const useUserRegister = () => {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [message, setMessage] = useState<string>("");

  const handleSendOtp = async (phone: string) => {
    if (!/^\d{10}$/.test(phone)) {
      setMessage("❌ Please enter a valid 10-digit number.");
      return;
    }

    setLoading(true);
    setMessage("📤 Sending OTP...");
    setTimeout(() => {
      setOtpSent(true);
      setMessage("✅ OTP sent successfully. Please check your SMS.");
      setLoading(false);
    }, 1000);
  };

  const handleVerifyOtp = async (otp: string) => {
    if (otp === "1234") {
      setOtpVerified(true);
      setMessage("✅ Mobile number verified successfully!");
    } else {
      setMessage("❌ Invalid OTP. Please try again.");
    }
  };

  const handleRegister = async (values: any) => {
    if (!otpVerified) {
      setMessage("⚠️ Please verify your mobile number before registering.");
      return;
    }

    setLoading(true);
    setMessage("🕒 Registering your account...");
    setTimeout(() => {
      setMessage("🎉 Registration successful! Welcome aboard.");
      setLoading(false);
    }, 1500);
  };

  return {
    loading,
    otpSent,
    otpVerified,
    message,
    handleSendOtp,
    handleVerifyOtp,
    handleRegister,
  };
};
