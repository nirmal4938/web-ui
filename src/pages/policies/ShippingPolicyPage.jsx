import React from "react";

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 leading-relaxed">
      <h1 className="text-3xl font-bold mb-4">Shipping Policy</h1>
      <p className="mb-6 text-gray-700">
        Since our services are entirely digital (SaaS-based), no physical
        shipping is involved. Account access and product delivery occur
        instantly after successful payment confirmation.
      </p>

      <h2 className="text-xl font-semibold mt-4">1. Digital Delivery</h2>
      <p className="text-gray-700">
        Once payment is completed, users receive access credentials or
        subscription activation instantly via email or dashboard.
      </p>

      <h2 className="text-xl font-semibold mt-4">2. Delays or Issues</h2>
      <p className="text-gray-700">
        In rare cases of delays due to system errors, our support team will
        manually activate your subscription within 24 hours.
      </p>

      <h2 className="text-xl font-semibold mt-4">3. Contact Support</h2>
      <p className="text-gray-700">
        For assistance, email us at <strong>support@yourcompany.in</strong>.
      </p>

      <p className="mt-8 text-gray-500 italic">
        © {new Date().getFullYear()} YourCompanyName. All rights reserved.
      </p>
    </div>
  );
}
