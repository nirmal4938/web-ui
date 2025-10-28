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
  text-align: center;
  font-size: 0.9rem;
  padding: 16px;
  color: #666;
  border-top: 1px solid #ddd;
  background: #fafafa;

  a {
    margin: 0 8px;
    color: ${({ theme }) => theme.CTA_COLOR || "#0a66c2"};
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
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
        <div>© {new Date().getFullYear()} Synqware Technologies. All rights reserved.</div>
        <div>
          <Link to="/about">About</Link> |{" "}
          <Link to="/contact">Contact</Link> |{" "}
          <a
            href="https://your-render-domain.onrender.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </div>
      </Footer>
    </Wrapper>
  );
};

export default NoAuthLayout;
