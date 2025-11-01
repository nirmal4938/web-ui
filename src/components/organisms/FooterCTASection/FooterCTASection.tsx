import React from "react";
import styled from "styled-components";
import ButtonPrimary from "@/components/atoms/ButtonPrimary/ButtonPrimary";
import Title from "@/components/atoms/Title/Title";
import { useNavigate } from "react-router-dom";

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.CTA_COLOR};
  color: ${({ theme }) => theme.WHITE};
  text-align: center;
  padding: ${({ theme }) => theme.spacing(10)} ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radius.lg} ${({ theme }) => theme.radius.lg} 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const SubText = styled.p`
  max-width: 600px;
  margin: ${({ theme }) => theme.spacing(3)} auto ${({ theme }) => theme.spacing(5)};
  font-size: ${({ theme }) => theme.font.size.body};
  color: ${({ theme }) => theme.WHITE_HOVER};
  line-height: 1.6;
`;

const FooterBottom = styled.div`
  margin-top: ${({ theme }) => theme.spacing(8)};
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: ${({ theme }) => theme.spacing(3)};
  font-size: ${({ theme }) => theme.font.size.small};
  color: rgba(255, 255, 255, 0.8);
`;

const FooterCTASection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <FooterWrapper>
      <Title level="h2">Ready to Build Something Great?</Title>
      <SubText>
        Synqware helps you transform your digital vision into scalable, cloud-powered, and IoT-ready software solutions.
        Let’s collaborate to create your next big innovation.
      </SubText>
      <ButtonPrimary
        style={{
          background: "white",
          color: "#1F6187",
          fontWeight: 600,
          padding: "12px 24px",
          fontSize: "1rem",
        }}
        onClick={() => navigate("/contact")}
      >
        Get in Touch
      </ButtonPrimary>

      <FooterBottom>
        © {new Date().getFullYear()} Synqware Technologies — All rights reserved.
      </FooterBottom>
    </FooterWrapper>
  );
};

export default FooterCTASection;
