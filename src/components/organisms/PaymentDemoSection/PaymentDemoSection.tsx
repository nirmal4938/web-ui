import React from "react";
import styled from "styled-components";
import ButtonPrimary from "@/components/atoms/ButtonPrimary/ButtonPrimary";
import Title from "@/components/atoms/Title/Title";

const Section = styled.section`
  background: ${({ theme }) => theme.CTA_COLOR};
  color: ${({ theme }) => theme.WHITE};
  text-align: center;
  padding: ${({ theme }) => theme.spacing(10)} ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radius.lg};
  max-width: 1100px;
  margin: ${({ theme }) => theme.spacing(10)} auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const Subtext = styled.p`
  font-size: ${({ theme }) => theme.font.size.body};
  max-width: 600px;
  margin: ${({ theme }) => theme.spacing(3)} auto ${({ theme }) => theme.spacing(5)};
  color: ${({ theme }) => theme.WHITE_HOVER};
  line-height: 1.6;
`;

const PaymentDemoSection: React.FC = () => {
  return (
    <Section>
      <Title level="h2" style={{ color: "#fff" }}>
        Experience Seamless Payments with Synqware
      </Title>
      <Subtext>
        Test our integrated payment demo — explore how Synqware securely handles online transactions, 
        invoicing, and recurring billing for your SaaS or eCommerce app.
      </Subtext>
      <ButtonPrimary
        onClick={() => window.open("/demo/payments", "_blank")}
        style={{ background: "#fff", color: "#1F6187" }}
      >
        Try Payment Demo
      </ButtonPrimary>
    </Section>
  );
};

export default PaymentDemoSection;
