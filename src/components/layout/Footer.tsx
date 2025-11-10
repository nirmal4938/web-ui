// components/layout/Footer.tsx
import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.CONTENT_SURFACE};
  border-top: 1px solid ${({ theme }) => theme.CONTENT_BORDER};
  color: ${({ theme }) => theme.TEXT_MUTED};
  font-size: ${({ theme }) => theme.font.size.small};
  font-family: ${({ theme }) => theme.fontFamily};
  padding: ${({ theme }) => `${theme.spacing(1.5)} ${theme.spacing(3)}`};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  flex-shrink: 0;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

interface FooterProps {
  /** Left-side element (like a status summary or breadcrumb) */
  leftContent?: React.ReactNode;
  /** Center element (branding, copyright, etc.) */
  centerContent?: React.ReactNode;
  /** Right-side element (actions, buttons, etc.) */
  rightContent?: React.ReactNode;
  /** Compact variant toggle */
  compact?: boolean;
}

/**
 * 🔹 Dynamic Footer component for SaaS layout.
 * Fully flexible layout: left/center/right props control structure.
 */
const Footer: React.FC<FooterProps> = ({
  leftContent,
  centerContent,
  rightContent,
  compact = false,
}) => {
  return (
    <FooterContainer
      style={{
        padding: compact ? "8px 16px" : undefined,
      }}
    >
      <div>{leftContent}</div>
      <div>{centerContent}</div>
      <div>{rightContent}</div>
    </FooterContainer>
  );
};

export default Footer;
