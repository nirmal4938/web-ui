// src/layouts/NoAuthLayout.tsx
import React from "react";
import styled from "styled-components";

interface NoAuthLayoutProps {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.BACKGROUND};
  padding: ${({ theme }) => theme.spacing(4)};
`;

const NoAuthLayout: React.FC<NoAuthLayoutProps> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default NoAuthLayout;
