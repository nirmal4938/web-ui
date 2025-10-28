import React from "react";
import Title from "@/components/atoms/Title/Title";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 900px;
  margin: 100px auto;
  padding: 0 24px;
  line-height: 1.8;
  text-align: center;
  color: ${({ theme }) => theme.TEXT};

  p {
    font-size: ${({ theme }) => theme.font.size.body};
    color: ${({ theme }) => theme.TEXT_MUTED};
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: ${({ theme }) => theme.font.size.h3};
    margin: 2.5rem 0 1rem;
    color: ${({ theme }) => theme.TEXT};
  }

  ul {
    text-align: left;
    list-style: none;
    margin: 0 auto;
    padding: 0;
    max-width: 600px;

    li {
      margin-bottom: 0.75rem;
      font-size: ${({ theme }) => theme.font.size.body};
      position: relative;
      padding-left: 1.5rem;
    }

    li::before {
      content: "•";
      position: absolute;
      left: 0;
      color: ${({ theme }) => theme.CTA_COLOR};
      font-weight: bold;
    }
  }
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.CTA_COLOR};
  font-weight: 600;
`;

const AboutPage: React.FC = () => (
  <Wrapper>
    <Title level="h2">About <Highlight>Synqware</Highlight></Title>

    <p>
      Synqware is a forward-thinking technology company built to bridge the gap between
      <strong> software, hardware, and human experience</strong>.
      Our mission is to help businesses and developers connect their systems seamlessly
      — creating unified digital ecosystems that power the next generation of intelligent products.
    </p>

    <p>
      With a foundation in modern SaaS, IoT, and API-driven architecture, Synqware
      empowers organizations to <strong>innovate, scale, and automate</strong> faster than ever.
      We believe in synchronization — not just between systems, but between people, purpose,
      and technology.
    </p>

    <h3>Our Vision</h3>
    <p>
      To become a globally trusted enabler of <strong>connected intelligence</strong> —
      where businesses, machines, and data flow together effortlessly to create smarter outcomes.
    </p>

    <h3>Our Mission</h3>
    <p>
      To simplify complex digital operations through intuitive, reliable, and secure solutions,
      blending innovation with real-world business needs.
    </p>

    <h3>What We Do</h3>
    <ul>
      <li>Build scalable SaaS applications and automation platforms.</li>
      <li>Develop secure API infrastructures and system integrations.</li>
      <li>Enable IoT and hardware-software interoperability.</li>
      <li>Provide digital transformation consulting and custom tech solutions.</li>
      <li>Support organizations with analytics, AI readiness, and DevOps enablement.</li>
    </ul>

    <h3>Our Values</h3>
    <ul>
      <li><strong>Integrity:</strong> We build trust through transparency and consistency.</li>
      <li><strong>Innovation:</strong> We continuously explore new ways to solve real problems.</li>
      <li><strong>Collaboration:</strong> We grow together — with our clients, partners, and team.</li>
      <li><strong>Excellence:</strong> We aim for world-class performance in every line of code.</li>
    </ul>

    <h3>Our Team</h3>
    <p>
      Synqware is powered by a small but visionary team of engineers, designers, and strategists
      who’ve worked across leading SaaS, cloud, and enterprise platforms. We combine deep technical
      experience with a creative mindset to deliver <strong>future-ready digital solutions</strong>.
    </p>

    <h3>Looking Ahead</h3>
    <p>
      As Synqware continues to grow, we’re exploring new frontiers in AI-powered automation,
      connected infrastructure, and human-centric product design. Together, we’re not just
      building software — we’re synchronizing the digital world.
    </p>
  </Wrapper>
);

export default AboutPage;
