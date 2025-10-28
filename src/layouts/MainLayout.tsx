import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@components/organisms/Header";
import { ContentWrapper } from "./ContentWrapper";
import { useLocation } from "react-router-dom";
import { SIDEBAR_WIDTH, sidebarConfig } from "@/config/SidebarConfig";

const LayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.BACKGROUND};
  overflow: hidden;
`;

const MainSection = styled.main<{ collapsed: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease, width 0.3s ease;
  margin-left: ${({ collapsed }) =>
    collapsed ? `${SIDEBAR_WIDTH.collapsed}px` : `${SIDEBAR_WIDTH.expanded}px`};
  width: calc(
    100% - ${({ collapsed }) =>
      collapsed ? `${SIDEBAR_WIDTH.collapsed}px` : `${SIDEBAR_WIDTH.expanded}px`}
  );
  background: ${({ theme }) => theme.CONTENT_GRADIENT};

  @media (max-width: 992px) {
    margin-left: 0;
    width: 100%;
  }
`;

const StyledContentWrapper = styled(ContentWrapper)`
  flex: 1;
  overflow-y: auto;
  background: ${({ theme }) => theme.CONTENT_BG};
  transition: all 0.3s ease;
`;

const findPageInfo = (path: string) => {
  for (const item of sidebarConfig) {
    if (item.path === path) return { title: item.label, breadcrumbs: [item.label] };
    if (item.children) {
      for (const child of item.children) {
        if (child.path === path)
          return { title: child.label, breadcrumbs: [item.label, child.label] };
      }
    }
  }
  return { title: "Dashboard", breadcrumbs: ["Home", "Dashboard"] };
};

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { title, breadcrumbs } = findPageInfo(location.pathname);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <LayoutWrapper>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <MainSection collapsed={collapsed}>
        <Header
          collapsed={collapsed}
          title={title}
          breadcrumbs={breadcrumbs}
          scrolled={scrolled}
        />
        <StyledContentWrapper collapsed={collapsed}>{children}</StyledContentWrapper>
      </MainSection>
    </LayoutWrapper>
  );
};

export default MainLayout;
