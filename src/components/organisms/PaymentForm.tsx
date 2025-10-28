// import React, { useState } from "react";
// import ButtonPrimary from "../atoms/ButtonPrimary/ButtonPrimary";

// interface PaymentFormProps {
//   amount: number;
//   onSuccess: (paymentId: string) => void;
// }

// const PaymentForm: React.FC<PaymentFormProps> = ({ amount, onSuccess }) => {
//   const [loading, setLoading] = useState(false);

//   const loadRazorpayScript = () => {
//     return new Promise<boolean>((resolve) => {
//       if (document.getElementById("razorpay-script")) return resolve(true);
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.id = "razorpay-script";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handlePayment = async () => {
//     setLoading(true);
//     const loaded = await loadRazorpayScript();
//     if (!loaded) {
//       alert("Razorpay SDK failed to load. Check your connection.");
//       setLoading(false);
//       return;
//     }

//     // ✅ Call backend to create order
//     const orderRes = await fetch("http://localhost:5000/api/payments/create-order", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ amount }),
//     });

//     const orderData = await orderRes.json();
//     console.log("Order Data:", orderData);

//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY,
//       amount: orderData.amount,
//       currency: "INR",
//       name: "Gym Fitness Zone",
//       description: "Registration Fee",
//       order_id: orderData.id, // ✅ use order ID from backend
//       handler: function (response: any) {
//         alert("Payment successful! ID: " + response.razorpay_payment_id);
//         onSuccess(response.razorpay_payment_id);
//       },
//       theme: { color: "#3399cc" },
//     };

//     const rzp = new (window as any).Razorpay(options);
//     rzp.open();

//     setLoading(false);
//   };

//   return (
//     <div style={{ margin: "16px 0" }}>
//       <ButtonPrimary type="button" onClick={handlePayment} disabled={loading}>
//         {loading ? "Loading..." : `Pay ₹${amount} Now`}
//       </ButtonPrimary>
//     </div>
//   );
// };

// export default PaymentForm;

import React from "react";
import ButtonPrimary from "@/components/atoms/ButtonPrimary/ButtonPrimary";
import { useRazorpayPayment } from "@/hooks/useRazorpayPayment";

interface PaymentFormProps {
  amount?: number;
  onSuccess?: (paymentId: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  amount = 1,
  onSuccess = () => {},
}) => {
  const { initiatePayment, loading } = useRazorpayPayment();

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <ButtonPrimary
        type="button"
        onClick={() => initiatePayment(amount, onSuccess)}
        disabled={loading}
        style={{ padding: "12px 32px", fontSize: "16px" }}
      >
        {loading ? "Processing..." : `Pay ₹${amount} Now`}
      </ButtonPrimary>
    </div>
  );
};

export default PaymentForm;
