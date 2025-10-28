import React from "react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 leading-relaxed">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-6 text-gray-700">
        This Privacy Policy explains how we collect, use, and protect your
        personal information while using our SaaS platform. By using our
        services, you consent to our data practices.
      </p>

      <h2 className="text-xl font-semibold mt-4">1. Information We Collect</h2>
      <p className="text-gray-700">
        We may collect personal details such as your name, email, organization,
        billing address, and usage data to improve our services.
      </p>

      <h2 className="text-xl font-semibold mt-4">2. Use of Data</h2>
      <p className="text-gray-700">
        We use your data to operate the platform, process payments, and enhance
        user experience. We never sell user data to third parties.
      </p>

      <h2 className="text-xl font-semibold mt-4">3. Data Security</h2>
      <p className="text-gray-700">
        We use secure servers, SSL encryption, and tokenized payments (via
        Razorpay) to safeguard your information.
      </p>

      <h2 className="text-xl font-semibold mt-4">4. Cookies</h2>
      <p className="text-gray-700">
        We use cookies to track preferences and enhance your browsing
        experience. You can disable cookies in your browser settings.
      </p>

      <p className="mt-8 text-gray-500 italic">
        Updated: {new Date().toLocaleDateString()}  
        <br />
        © {new Date().getFullYear()} YourCompanyName. All rights reserved.
      </p>
    </div>
  );
}
