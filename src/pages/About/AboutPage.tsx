import React from "react";
import styled from "styled-components";
import Title from "@/components/atoms/Title/Title";
import { FaLightbulb, FaHandshake, FaCogs, FaRocket } from "react-icons/fa";
import GoodTeam from "@/assets/illustrations/syncware_landing_page/good_team.svg";
import IntegritySVG from "@/assets/illustrations/syncware_landing_page/trust.svg"
import InnovationSVG from "@/assets/illustrations/syncware_landing_page/problem-solving.svg"
import ExcellenceSVG from "@/assets/illustrations/syncware_landing_page/success.svg"

const PageWrapper = styled.section`
  background: linear-gradient(180deg, #f9fafc 0%, #eef2f6 100%);
  min-height: 100vh;
  padding: 100px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentBox = styled.div`
  max-width: 950px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
  padding: 60px 50px;
  text-align: center;
  color: ${({ theme }) => theme.TEXT || "#333"};
  line-height: 1.8;

  @media (max-width: 768px) {
    padding: 40px 24px;
  }

  h2 {
    margin-bottom: 16px;
  }

  p {
    font-size: 1.05rem;
    color: ${({ theme }) => theme.TEXT_MUTED || "#555"};
    margin-bottom: 1.5rem;
  }

  strong {
    color: ${({ theme }) => theme.CTA_COLOR || "#1F6187"};
  }
`;

const Section = styled.div`
  margin: 60px 0;
  text-align: left;

  h3 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.CTA_COLOR || "#1F6187"};
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  p {
    font-size: 1.05rem;
    color: ${({ theme }) => theme.TEXT_MUTED || "#555"};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
  }

  li {
    padding-left: 1.5rem;
    position: relative;
    margin-bottom: 0.75rem;
  }

  li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.CTA_COLOR || "#1F6187"};
    font-weight: bold;
  }
`;

const IconCircle = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.CTA_COLOR_LIGHT || "#e3f2fd"};
  color: ${({ theme }) => theme.CTA_COLOR || "#1F6187"};
  border-radius: 50%;
  width: 36px;
  height: 36px;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

const ValueCard = styled.div`
  background: #fdfdfd;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  }

  h4 {
    margin-top: 12px;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.TEXT || "#222"};
  }

  p {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.TEXT_MUTED || "#555"};
  }
`;

const FooterNote = styled.div`
  text-align: center;
  margin-top: 60px;
  font-size: 0.95rem;
  color: #666;
  max-width: 700px;
`;

const AboutPage: React.FC = () => (
  <PageWrapper>
    <ContentBox>
      <Title level="h2">
        About <strong>Synqware</strong>
      </Title>

      <p>
        <strong>Synqware</strong> is a forward-thinking technology company dedicated to connecting software,
        hardware, and human experience. We help businesses synchronize systems, automate operations,
        and build scalable digital ecosystems for the future.
      </p>

      <p>
        From SaaS and IoT platforms to enterprise automation, Synqware empowers organizations to
        <strong> innovate, scale, and simplify</strong> their technology landscape — securely and efficiently.
      </p>

      <Section>
        <h3>
          <IconCircle><FaLightbulb /></IconCircle> Our Vision
        </h3>
        <p>
          To become a globally trusted enabler of <strong>connected intelligence</strong> — where businesses,
          data, and technology work together in harmony to create smarter outcomes.
        </p>
      </Section>

      <Section>
        <h3>
          <IconCircle><FaRocket /></IconCircle> Our Mission
        </h3>
        <p>
          To simplify complex digital operations through intuitive, reliable, and secure platforms — aligning
          innovation with real-world business needs.
        </p>
      </Section>

      <Section>
        <h3>
          <IconCircle><FaCogs /></IconCircle> What We Do
        </h3>
        <ul>
          <li>Build scalable SaaS and automation platforms for enterprises.</li>
          <li>Develop secure API and data integration systems.</li>
          <li>Enable IoT device management and smart infrastructure.</li>
          <li>Provide digital transformation consulting and DevOps services.</li>
          <li>Support AI, analytics, and performance optimization strategies.</li>
        </ul>
      </Section>

      <Section>
        <h3>
          <IconCircle><FaHandshake /></IconCircle> Our Values
        </h3>
        <ValuesGrid>
<ValueCard>
  <img src={IntegritySVG} alt="Integrity" width="120" height="120" />
  <h4>Integrity</h4>
  <p>We build trust through transparency, accountability, and consistency in everything we do.</p>
</ValueCard>
          <ValueCard>
  <img src={InnovationSVG} alt="Integrity" width="120" height="120" />

            <h4>Innovation</h4>
            <p>We constantly explore new ways to deliver meaningful digital impact and smarter automation.</p>
          </ValueCard>
          <ValueCard>
  <img src={GoodTeam} alt="Integrity" width="120" height="120" />
            <h4>Collaboration</h4>
            <p>We work together with clients, partners, and teams to drive shared success and growth.</p>
          </ValueCard>
          <ValueCard>
  <img src={ExcellenceSVG} alt="Integrity" width="120" height="120" />

            <h4>Excellence</h4>
            <p>We aim for quality and precision — every product, every project, every time.</p>
          </ValueCard>
        </ValuesGrid>
      </Section>

      <Section>
        <h3>Our Team</h3>
        <p>
          Synqware is powered by a multidisciplinary team of engineers, designers, and strategists
          who’ve built and scaled products across cloud, IoT, and SaaS domains.
          Together, we deliver <strong>future-ready solutions</strong> with creativity and reliability.
        </p>
      </Section>

      <FooterNote>
        <p>
          As we grow, Synqware continues to explore new frontiers in AI automation,
          connected ecosystems, and human-centric design.  
          <strong> We’re not just building software — we’re synchronizing the digital world.</strong>
        </p>
      </FooterNote>
    </ContentBox>
  </PageWrapper>
);

export default AboutPage;
