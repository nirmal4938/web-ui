import React from "react";
import styled from "styled-components";

const SIDEBAR_WIDTH = {
  collapsed: "72px",
  expanded: "240px",
};


  // margin-left: ${({ collapsed }) =>
  //   collapsed ? SIDEBAR_WIDTH.collapsed : SIDEBAR_WIDTH.expanded};

const Wrapper = styled.div<{ collapsed: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  background: ${({ theme }) => theme.CONTENT_BG};
  color: ${({ theme }) => theme.TEXT};
  transition: margin-left 0.3s ease, background 0.3s ease;

  @media (max-width: 992px) {
    margin-left: 0;
  }
`;

const HeaderSection = styled.header`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.LIGHT_GREY};
  background: ${({ theme }) => theme.WHITE};
  flex-shrink: 0;
`;

const Content = styled.section`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  // padding: 2rem clamp(1rem, 2vw, 2rem);
  scrollbar-width: thin;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.CTA_COLOR};
    border-radius: 3px;
  }

  > *:first-child {
    margin-top: 0;
  }

  @media (max-width: 1024px) {
    padding: .5rem;
  }

  @media (max-width: 768px) {
    padding: 0rem;
  }
`;

type ContentWrapperProps = {
  header?: React.ReactNode;
  children: React.ReactNode;
  collapsed: boolean;
};

export const ContentWrapper = ({ header, children, collapsed }: ContentWrapperProps) => {
  return (
    <Wrapper collapsed={collapsed}>
      {header && <HeaderSection>{header}</HeaderSection>}
      <Content>{children}</Content>
    </Wrapper>
  );
};
