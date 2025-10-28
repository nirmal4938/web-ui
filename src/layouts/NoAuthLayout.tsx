import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface NoAuthLayoutProps {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.BACKGROUND || "#fff"};
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.75);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 12px 20px;
  }
`;

const Logo = styled(Link)`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.CTA_COLOR_LIGHT || "#0a2540"};
  text-decoration: none;
  letter-spacing: 0.5px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 24px;

  a {
    font-size: 1rem;
    color: ${({ theme }) => theme.TEXT || "#333"};
    text-decoration: none;
    transition: color 0.2s ease;
    &:hover {
      color: ${({ theme }) => theme.CTA_COLOR_LIGHT || "#0a2540"};
    }
  }

  @media (max-width: 768px) {
    gap: 12px;
  }
`;
export const CTAButton = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.CTA_COLOR} 0%,
    ${({ theme }) => theme.CTA_COLOR_HOVER} 100%
  );
  color: ${({ theme }) => theme.WHITE};
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: 600;
  font-size: ${({ theme }) => theme.font.size.body};
  padding: ${({ theme }) => `${theme.spacing(1.25)} ${theme.spacing(3)}`};
  border-radius: ${({ theme }) => theme.radius.lg};
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(31, 97, 135, 0.25);
  transition: all 0.25s ease-in-out;
  cursor: pointer;
  letter-spacing: 0.3px;
  overflow: hidden;
  z-index: 0;
  user-select: none;

  /* ✅ Keep text crisp white always */
  color: #ffffff !important;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.15);

  &:hover {
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.CTA_COLOR_HOVER} 0%,
      ${({ theme }) => theme.CTA_COLOR} 100%
    );
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 6px 18px rgba(31, 97, 135, 0.35);
    color: #ffffff !important; /* ✅ reinforce readability */
  }

  &:active {
    transform: translateY(0) scale(0.98);
    box-shadow: 0 3px 8px rgba(31, 97, 135, 0.2);
    color: #ffffff !important;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.CTA_COLOR_LIGHT};
    outline-offset: 3px;
    color: #ffffff !important;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -75%;
    width: 50%;
    height: 100%;
    background: rgba(255, 255, 255, 0.15);
    transform: skewX(-25deg);
    transition: all 0.4s ease;
    z-index: 1;
  }

  &:hover::after {
    left: 130%;
  }
`;




const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(6)} ${({ theme }) => theme.spacing(3)};
  box-sizing: border-box;
`;

const Footer = styled.footer`
  background: #0a2540;
  color: #ffffff;
  padding: 48px 24px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .footer-grid {
    width: 100%;
    max-width: 1200px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
  }

  h4 {
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 12px;
    color: #ffffff;
  }

  a {
    display: block;
    color: #d1e0ff;
    font-size: 0.95rem;
    text-decoration: none;
    margin: 6px 0;
    transition: all 0.2s ease;
  }

  a:hover {
    color: #ffffff;
    text-decoration: underline;
  }

  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    padding-top: 12px;
    font-size: 0.85rem;
    color: #b0c4de;
  }

  @media (max-width: 768px) {
    text-align: center;
  }
`;


const NoAuthLayout: React.FC<NoAuthLayoutProps> = ({ children }) => {
  return (
    <Wrapper>
      <Header>
        <Logo to="/home-page">Synqware</Logo>
        <Nav>
          <Link to="/about-us">AboutUs</Link>
          <Link to="/contact">Contact</Link>
          <CTAButton to="/login">Login / Sign Up</CTAButton>
        </Nav>
      </Header>

      <Content>{children}</Content>

    <Footer>
  <div className="footer-grid">
    {/* Column 1: Company */}
    <div>
      <h4>Synqware Technologies</h4>
      <p className="text-sm text-gray-300">
        Building secure and scalable SaaS solutions for teams, enterprises, and innovators.  
        Empowering digital workflows with simplicity and trust.
      </p>
    </div>

    {/* Column 2: Quick Links */}
    <div>
      <h4>Quick Links</h4>
      <Link to="/home-page">Home</Link>
      <Link to="/about-us">About Us</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/login">Login / Register</Link>
    </div>

    {/* Column 3: Legal */}
    <div>
      <h4>Legal</h4>
      <Link to="/terms">Terms & Conditions</Link>
      <Link to="/privacy">Privacy Policy</Link>
      <Link to="/refund-policy">Refund & Cancellation</Link>
      <Link to="/shipping-policy">Shipping Policy</Link>
    </div>

    {/* Column 4: Connect */}
    <div>
      <h4>Connect</h4>
      <a href="mailto:support@synqware.in">support@synqware.in</a>
      <a
        href="https://linkedin.com/company/synqware"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
      <a
        href="https://twitter.com/synqware"
        target="_blank"
        rel="noopener noreferrer"
      >
        Twitter / X
      </a>
    </div>
  </div>

  <div className="footer-bottom">
    © {new Date().getFullYear()} Synqware Technologies Pvt. Ltd. | All rights reserved.  
    <br />
    Built with ❤️ for the SaaS ecosystem.
  </div>
</Footer>

    </Wrapper>
  );
};

export default NoAuthLayout;
