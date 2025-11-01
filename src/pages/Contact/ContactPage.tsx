import React from "react";
import styled from "styled-components";
import Title from "@/components/atoms/Title/Title";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaClock, FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";

const PageWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 20px;
  background: linear-gradient(180deg, #f9fafc 0%, #eef2f6 100%);
  min-height: 100vh;
`;

const Header = styled.div`
  max-width: 750px;
  text-align: center;
  margin-bottom: 60px;

  p {
    color: #555;
    font-size: 1.1rem;
    margin-top: 12px;
    line-height: 1.6;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  width: 100%;
  max-width: 950px;
  margin-bottom: 80px;
`;

const ContactCard = styled.div`
  background: #fff;
  border-radius: 18px;
  padding: 32px 24px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  text-align: center;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  }

  svg {
    font-size: 2rem;
    color: #1f6187;
    margin-bottom: 16px;
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 8px;
    color: #0a2540;
  }

  p,
  a {
    color: #333;
    font-size: 1rem;
    text-decoration: none;
  }

  a:hover {
    color: #1f6187;
  }
`;

const FormWrapper = styled.form`
  background: #fff;
  padding: 48px;
  border-radius: 18px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  input,
  textarea,
  select {
    width: 100%;
    padding: 14px 18px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 1rem;
    transition: border-color 0.2s ease;
    background: #fafbfc;
  }

  input:focus,
  textarea:focus,
  select:focus {
    border-color: #1f6187;
    outline: none;
  }

  button {
    background: #1f6187;
    color: #fff;
    font-weight: 600;
    border: none;
    padding: 14px 20px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.2s ease;
  }

  button:hover {
    background: #15506e;
  }
`;

const FooterInfo = styled.div`
  text-align: center;
  margin-top: 80px;
  color: #666;
  font-size: 0.95rem;

  .socials {
    margin-top: 16px;
    display: flex;
    justify-content: center;
    gap: 16px;

    a {
      color: #1f6187;
      font-size: 1.3rem;
      transition: color 0.2s ease;
    }

    a:hover {
      color: #0a2540;
    }
  }
`;

const ContactPage: React.FC = () => (
  <PageWrapper>
    <Header>
      <Title level="h2" color="#0a2540">
        Connect with Syncware
      </Title>
      <p>
        Whether you're exploring IoT integration, enterprise automation, or digital transformation,
        our team is here to guide your business toward solid, scalable, and future-ready solutions.
      </p>
    </Header>

    <ContactGrid>
      <ContactCard>
        <FaEnvelope />
        <h3>Email</h3>
        <p><a href="mailto:contact@synqware.com">contact@synqware.com</a></p>
      </ContactCard>

      <ContactCard>
        <FaPhoneAlt />
        <h3>Phone</h3>
        <p><a href="tel:+919876543210">+91 98765 43210</a></p>
      </ContactCard>

      <ContactCard>
        <FaMapMarkerAlt />
        <h3>Office</h3>
        <p>Synqware Technologies Pvt. Ltd.<br />Supaul, Bihar, India — 852131</p>
      </ContactCard>

      <ContactCard>
        <FaClock />
        <h3>Working Hours</h3>
        <p>Mon – Sat: 9:30 AM – 6:00 PM<br />Closed on Sundays</p>
      </ContactCard>
    </ContactGrid>

    <FormWrapper onSubmit={(e) => e.preventDefault()}>
      <select required>
        <option value="">Select Inquiry Type</option>
        <option value="project">Project Collaboration</option>
        <option value="support">Technical Support</option>
        <option value="partnership">Business Partnership</option>
        <option value="career">Career / Internship</option>
        <option value="other">Other</option>
      </select>

      <input type="text" placeholder="Your Name" required />
      <input type="email" placeholder="Your Email" required />
      <input type="text" placeholder="Company / Organization (optional)" />
      <textarea placeholder="Your Message" rows={5} required />
      <button type="submit">Send Message</button>
    </FormWrapper>

    <FooterInfo>
      <p>
        © {new Date().getFullYear()} Synqware Technologies — Building connected, cloud-ready, and intelligent systems.
      </p>
      <div className="socials">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
        <a href="https://synqware.com" target="_blank" rel="noopener noreferrer"><FaGlobe /></a>
      </div>
    </FooterInfo>
  </PageWrapper>
);

export default ContactPage;
