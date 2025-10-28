// src/hooks/useRazorpayPayment.ts
import { useState } from "react";
import { createPaymentOrder } from "../api/paymentService";

export const useRazorpayPayment = () => {
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.id = "razorpay-script";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async (amount: number, onSuccess?: (id: string) => void) => {
    setLoading(true);
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Failed to load Razorpay SDK");

      const order = await createPaymentOrder(amount);
      if (!order?.id) throw new Error("Order creation failed");

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Champ SaaS Platform",
        description: "₹1 Verification Payment",
        order_id: order.id,
        handler: (response: any) => {
          alert("✅ Payment successful: " + response.razorpay_payment_id);
          onSuccess?.(response.razorpay_payment_id);
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#0d6efd",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment initiation failed:", err);
      alert("Payment initiation failed. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return { initiatePayment, loading };
};
