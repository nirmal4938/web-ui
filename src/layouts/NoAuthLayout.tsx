import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

/* ---------------------- Layout Wrapper ---------------------- */
interface NoAuthLayoutProps {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.BACKGROUND || "#fff"};
`;

/* ---------------------- Header ---------------------- */
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

/* ---------------------- Nav ---------------------- */
const Nav = styled.nav<{ open?: boolean }>`
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
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.97);
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem 1.5rem;
    gap: 1rem;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease-in-out;
    max-height: ${({ open }) => (open ? "300px" : "0")};
    overflow: hidden;
    opacity: ${({ open }) => (open ? 1 : 0)};
  }
`;

/* ---------------------- CTA Button ---------------------- */
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
  color: #ffffff !important;
  font-weight: 600;
  font-size: ${({ theme }) => theme.font.size.body};
  padding: ${({ theme }) => `${theme.spacing(1.25)} ${theme.spacing(3)}`};
  border-radius: ${({ theme }) => theme.radius.lg};
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(31, 97, 135, 0.25);
  transition: all 0.25s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 6px 18px rgba(31, 97, 135, 0.35);
  }

  &:active {
    transform: translateY(0) scale(0.98);
    box-shadow: 0 3px 8px rgba(31, 97, 135, 0.2);
  }
`;

/* ---------------------- Hamburger Menu ---------------------- */
const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.6rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
    color: ${({ theme }) => theme.TEXT || "#333"};
  }
`;

/* ---------------------- Content ---------------------- */
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

/* ---------------------- Footer ---------------------- */
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

    &:hover {
      color: #ffffff;
      text-decoration: underline;
    }
  }

  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    padding-top: 12px;
    font-size: 0.85rem;
    color: #b0c4de;
  }
`;

/* ---------------------- Component ---------------------- */
const NoAuthLayout: React.FC<NoAuthLayoutProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Wrapper>
      <Header>
        <Logo to="/home-page">Synqware</Logo>

        <MenuButton onClick={() => setMenuOpen((o) => !o)}>
          {menuOpen ? "✕" : "☰"}
        </MenuButton>

        <Nav open={menuOpen}>
          <Link to="/about-us" onClick={() => setMenuOpen(false)}>
            AboutUs
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <CTAButton to="/login" onClick={() => setMenuOpen(false)}>
            Login / Sign Up
          </CTAButton>
        </Nav>
      </Header>

      <Content>{children}</Content>

      <Footer>
        <div className="footer-grid">
          <div>
            <h4>Synqware Technologies</h4>
            <p>
              Building secure and scalable SaaS solutions for teams and
              enterprises. Empowering digital workflows with simplicity and
              trust.
            </p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <Link to="/home-page">Home</Link>
            <Link to="/about-us">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/login">Login / Register</Link>
          </div>

          <div>
            <h4>Legal</h4>
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/refund-policy">Refund & Cancellation</Link>
            <Link to="/shipping-policy">Shipping Policy</Link>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Synqware Technologies 
        </div>
      </Footer>
    </Wrapper>
  );
};

export default NoAuthLayout;
