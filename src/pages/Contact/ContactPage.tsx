import React from "react";
import styled from "styled-components";
import Title from "@/components/atoms/Title/Title";

const PageWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  background: ${({ theme }) => theme.BACKGROUND || "#f9fafb"};
  min-height: 100vh;
`;

const Header = styled.div`
  max-width: 700px;
  text-align: center;
  margin-bottom: 60px;

  p {
    color: ${({ theme }) => theme.TEXT || "#555"};
    font-size: 1.1rem;
    margin-top: 12px;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  width: 100%;
  max-width: 900px;
  margin-bottom: 60px;
`;

const ContactCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }

  h3 {
    margin-bottom: 10px;
    font-size: 1.25rem;
    color: ${({ theme }) => theme.CTA_COLOR_LIGHT || "#0a2540"};
  }

  p, a {
    color: ${({ theme }) => theme.TEXT || "#333"};
    font-size: 1rem;
    text-decoration: none;
  }

  a:hover {
    color: ${({ theme }) => theme.CTA_COLOR_LIGHT || "#0a66c2"};
  }
`;

const FormWrapper = styled.form`
  background: #fff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  input, textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s ease;
  }

  input:focus, textarea:focus {
    border-color: ${({ theme }) => theme.CTA_COLOR_LIGHT || "#0a66c2"};
  }

  button {
    background: ${({ theme }) => theme.CTA_COLOR_LIGHT || "#0a66c2"};
    color: #fff;
    font-weight: 600;
    border: none;
    padding: 12px 18px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.2s ease;
  }

  button:hover {
    background: ${({ theme }) => theme.CTA_COLOR_LIGHT || "#084d94"};
  }
`;

const ContactPage: React.FC = () => (
  <PageWrapper>
    <Header>
      <Title level="h2" color="#0a2540">Let’s Build Something Amazing Together</Title>
      <p>We’d love to hear from you! Reach out for project collaborations, service inquiries, or partnership opportunities.</p>
    </Header>

    <ContactGrid>
      <ContactCard>
        <h3>Email</h3>
        <p><a href="mailto:contact.champ@gmail.com">contact@synqware.com</a></p>
      </ContactCard>

      <ContactCard>
        <h3>Phone</h3>
        <p><a href="tel:+919876543210">+91 98765 43210</a></p>
      </ContactCard>

      <ContactCard>
        <h3>Office</h3>
        <p>Supaul, Bihar, India</p>
      </ContactCard>
    </ContactGrid>

    <FormWrapper onSubmit={(e) => e.preventDefault()}>
      <input type="text" placeholder="Your Name" required />
      <input type="email" placeholder="Your Email" required />
      <textarea placeholder="Your Message" rows={5} required />
      <button type="submit">Send Message</button>
    </FormWrapper>
  </PageWrapper>
);

export default ContactPage;
