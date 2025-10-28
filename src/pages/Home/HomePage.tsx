import React from "react";
import HeroSection from "@/components/organisms/HeroSection/HeroSection";
import FeatureGrid from "@/components/organisms/FeatureGrid/FeatureGrid";
import PaymentDemoSection from "@/components/organisms/PaymentDemoSection/PaymentDemoSection";
import TestimonialsSection from "@/components/organisms/TestimonialsSection/TestimonialsSection";
import FooterCTASection from "@/components/organisms/FooterCTASection/FooterCTASection";

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <FeatureGrid />
      <PaymentDemoSection />
      <TestimonialsSection />
      <FooterCTASection />
    </>
  );
};

export default HomePage;
