import React from "react";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 leading-relaxed">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
      <p className="mb-6 text-gray-700">
        Welcome to our SaaS platform. These Terms & Conditions govern your
        access to and use of our services, applications, and related products.
        By accessing or using our services, you agree to comply with and be
        bound by these terms.
      </p>

      <h2 className="text-xl font-semibold mt-4">1. Use of Services</h2>
      <p className="text-gray-700">
        You agree to use our services only for lawful purposes and in
        accordance with applicable laws. Unauthorized or fraudulent use of the
        platform is strictly prohibited.
      </p>

      <h2 className="text-xl font-semibold mt-4">2. Intellectual Property</h2>
      <p className="text-gray-700">
        All content, trademarks, graphics, and software are the intellectual
        property of our company. You may not copy or distribute any materials
        without written consent.
      </p>

      <h2 className="text-xl font-semibold mt-4">3. Limitation of Liability</h2>
      <p className="text-gray-700">
        We are not responsible for any indirect, incidental, or consequential
        damages arising from your use of our services.
      </p>

      <h2 className="text-xl font-semibold mt-4">4. Governing Law</h2>
      <p className="text-gray-700">
        These terms are governed by the laws of India. Disputes shall be
        resolved under the jurisdiction of courts in New Delhi.
      </p>

      <p className="mt-8 text-gray-500 italic">
        © {new Date().getFullYear()} YourCompanyName. All rights reserved.
      </p>
    </div>
  );
}
