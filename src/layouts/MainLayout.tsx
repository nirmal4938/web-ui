import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@components/organisms/Header";
import { ContentWrapper } from "./ContentWrapper";
import { SIDEBAR_WIDTH, sidebarConfig } from "@/config/SidebarConfig";
import { useLocation } from "react-router-dom";
import { AIChatbot } from "@/components/layout/AIChatbot";

/* Layout Wrapper */
const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.BACKGROUND};
`;

/* Main Section (Flex Column) */
const MainSection = styled.main<{ collapsed: boolean; mobileOpen: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: margin-left 0.3s ease, width 0.3s ease;

  margin-left: ${({ collapsed, mobileOpen }) =>
    mobileOpen ? "0" : collapsed ? `${SIDEBAR_WIDTH.collapsed}px` : `${SIDEBAR_WIDTH.expanded}px`};
  width: ${({ collapsed, mobileOpen }) =>
    mobileOpen
      ? "100%"
      : collapsed
      ? `calc(100% - ${SIDEBAR_WIDTH.collapsed}px)`
      : `calc(100% - ${SIDEBAR_WIDTH.expanded}px)`};

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;

/* Content Wrapper */
const StyledContentWrapper = styled(ContentWrapper)`
  flex: 1;
  overflow-y: auto;
  background: ${({ theme }) => theme.CONTENT_BG};
  transition: all 0.3s ease;
`;

/* Breadcrumb / Page Info */
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

/* Layout Component */
const MainLayout: React.FC<{
  children: React.ReactNode;
  footer?: React.ReactNode;
}> = ({ children, footer }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggle={() => setCollapsed(!collapsed)}
        onMobileToggle={() => setMobileOpen(!mobileOpen)}
      />

      <MainSection collapsed={collapsed} mobileOpen={mobileOpen}>
        <Header
          collapsed={collapsed}
          title={title}
          breadcrumbs={breadcrumbs}
          scrolled={scrolled}
          onMobileMenuToggle={() => setMobileOpen(!mobileOpen)}
        />

        <StyledContentWrapper collapsed={collapsed}>{children}</StyledContentWrapper>

        {/* {footer && footer} */}
        {/* <AIChatbot /> */}
      </MainSection>
    </LayoutWrapper>
  );
};

export default MainLayout;
