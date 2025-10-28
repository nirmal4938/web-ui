// src/layouts/DashboardLayout.tsx
import React from 'react';
// import Sidebar from './Sidebar';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
`;

const MainContent = styled.main`
  margin-left: 240px;
  padding: 2rem;
  width: 100%;
`;

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LayoutContainer>
      {/* <Sidebar /> */}
      <MainContent>{children}</MainContent>
    </LayoutContainer>
  );
};

export default DashboardLayout;
