// src/components/atoms/DropdownBase.tsx
import React from "react";
import styled from "styled-components";

interface DropdownBaseProps {
  label?: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const DropdownBase: React.FC<DropdownBaseProps> = ({ label, open, onToggle, children }) => {
  return (
    <Container>
      <Trigger onClick={onToggle}>
        {label}
        <span className="chevron">{open ? "▲" : "▼"}</span>
      </Trigger>
      {open && <Menu>{children}</Menu>}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-width: 180px;
`;

const Trigger = styled.button`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.CONTENT_BORDER};
  border-radius: ${({ theme }) => theme.radius.md};
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.TEXT};

  .chevron {
    font-size: 0.75rem;
    opacity: 0.6;
  }

  &:hover {
    background: ${({ theme }) => theme.HOVER_BG};
  }
`;

const Menu = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.CONTENT_BORDER};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  z-index: 20;
  padding: 0.5rem;
`;
