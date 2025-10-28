import React from "react";

export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 leading-relaxed">
      <h1 className="text-3xl font-bold mb-4">Refund & Cancellation Policy</h1>
      <p className="mb-6 text-gray-700">
        We value your satisfaction with our services. Please read our refund
        and cancellation terms carefully.
      </p>

      <h2 className="text-xl font-semibold mt-4">1. Subscription Cancellations</h2>
      <p className="text-gray-700">
        Users can cancel subscriptions anytime through their account dashboard.
        Once cancelled, future billing stops immediately.
      </p>

      <h2 className="text-xl font-semibold mt-4">2. Refund Eligibility</h2>
      <p className="text-gray-700">
        Refunds are provided only for duplicate or erroneous transactions.
        Completed subscription periods are non-refundable.
      </p>

      <h2 className="text-xl font-semibold mt-4">3. Processing Time</h2>
      <p className="text-gray-700">
        Approved refunds will be credited within 7–10 business days via the
        original payment method.
      </p>

      <h2 className="text-xl font-semibold mt-4">4. Contact for Disputes</h2>
      <p className="text-gray-700">
        For billing or refund disputes, please reach out at
        <strong> support@yourcompany.in </strong>.
      </p>

      <p className="mt-8 text-gray-500 italic">
        © {new Date().getFullYear()} YourCompanyName. All rights reserved.
      </p>
    </div>
  );
}
