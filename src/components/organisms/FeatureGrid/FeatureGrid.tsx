import React from "react";
import styled from "styled-components";
import FeatureCard from "@/components/molecules/FeatureCard/FeatureCard";
import Title from "@/components/atoms/Title/Title";
import { FaCloud, FaCogs, FaCode, FaServer } from "react-icons/fa";

const Section = styled.section`
  background: ${({ theme }) => theme.CONTENT_BG};
  padding: ${({ theme }) => theme.spacing(10)} ${({ theme }) => theme.spacing(3)};
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing(4)};
  margin-top: ${({ theme }) => theme.spacing(6)};
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
`;

const FeatureGrid: React.FC = () => {
  return (
    <Section>
      <Title>Our Core Capabilities</Title>
      <Grid>
        <FeatureCard
          icon={<FaCode />}
          title="API Development"
          desc="Design and build scalable, secure RESTful APIs with modern frameworks."
        />
        <FeatureCard
          icon={<FaCloud />}
          title="Cloud Deployment"
          desc="Deploy and manage cloud-native solutions using AWS, Azure, or Vercel."
        />
        <FeatureCard
          icon={<FaCogs />}
          title="Custom SaaS Solutions"
          desc="Develop tailored SaaS products to automate your business operations."
        />
        <FeatureCard
          icon={<FaServer />}
          title="Static & Dynamic Websites"
          desc="Create fast, SEO-optimized, and responsive websites for your brand."
        />
      </Grid>
    </Section>
  );
};

export default FeatureGrid;
