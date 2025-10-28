import React from "react";
import ButtonPrimary from "@/components/atoms/ButtonPrimary/ButtonPrimary";

const PaymentPage: React.FC = () => {
  const handlePayment = () => {
    const options = {
      key: "rzp_test_xxxxxx", // replace later with LIVE key
      amount: 50000, // 500 INR
      currency: "INR",
      name: "Champ",
      description: "Tournament Registration Fee",
      image: "https://your-logo-url.png",
      handler: function (response: any) {
        alert("Payment Successful! ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Demo User",
        email: "demo@champ.com",
        contact: "9999999999",
      },
      theme: {
        color: "#1F6187",
      },
    };
    const rzp1 = new (window as any).Razorpay(options);
    rzp1.open();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>Test Payment</h2>
      <p>Click below to simulate a tournament payment.</p>
      <ButtonPrimary onClick={handlePayment}>Pay ₹500</ButtonPrimary>
    </div>
  );
};

export default PaymentPage;
