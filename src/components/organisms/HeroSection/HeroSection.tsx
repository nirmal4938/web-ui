import React from "react";
import styled from "styled-components";
import Title from "@/components/atoms/Title/Title";
import ButtonPrimary from "@/components/atoms/ButtonPrimary/ButtonPrimary";

const HeroWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: ${({ theme }) => theme.BACKGROUND};
  padding: ${({ theme }) => theme.spacing(10)} ${({ theme }) => theme.spacing(3)};
  min-height: 80vh;

  @media (min-width: 768px) {
    padding: ${({ theme }) => theme.spacing(12)} ${({ theme }) => theme.spacing(4)};
  }
`;

const HeroContent = styled.div`
  max-width: 700px;
`;

const Tagline = styled.p`
  color: ${({ theme }) => theme.TEXT_MUTED};
  font-size: ${({ theme }) => theme.font.size.lg};
  line-height: 1.6;
  margin: ${({ theme }) => theme.spacing(3)} 0 ${({ theme }) => theme.spacing(5)};
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.CTA_COLOR};
  font-weight: 600;
`;

const HeroImage = styled.img`
  margin-top: ${({ theme }) => theme.spacing(5)};
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.CONTENT_SHADOW};
`;

const HeroSection: React.FC = () => {
  return (
    <HeroWrapper>
      <HeroContent>
        <Title>Synqware — Where <Highlight>Software</Highlight> Meets <Highlight>Hardware</Highlight></Title>
        <Tagline>
          Transform your business with next-gen APIs, SaaS platforms, and IoT integrations.
          <br />We help you <Highlight>sync innovation with reality</Highlight>.
        </Tagline>
        <ButtonPrimary>Start Your Project</ButtonPrimary>

        {/* Optional illustration (add later if available) */}
        {/* <HeroImage src="/assets/images/hero-illustration.png" alt="Synqware Hero Illustration" /> */}
      </HeroContent>
    </HeroWrapper>
  );
};

export default HeroSection;
