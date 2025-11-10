import styled from "styled-components";
import { motion } from "framer-motion";

import { SIDEBAR_WIDTH } from "@/config/SidebarConfig";
  // margin-left: ${({ collapsed }) =>
  //   collapsed ? `${SIDEBAR_WIDTH.collapsed}px` : `${SIDEBAR_WIDTH.expanded}px`};
  // width: calc(100% - ${({ collapsed }) =>
  //   collapsed ? `${SIDEBAR_WIDTH.collapsed}px` : `${SIDEBAR_WIDTH.expanded}px`});
export const HeaderContainer = styled(motion.header)<{ collapsed?: boolean; scrolled?: boolean }>`
  position: sticky;
  top: 0;
  z-index: 120;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  backdrop-filter: blur(12px);
  background: ${({ theme }) => `${theme.HEADER_BG}CC`};
  border-bottom: 1px solid ${({ theme }) => theme.HEADER_BORDER};
  box-shadow: ${({ scrolled, theme }) => (scrolled ? theme.HEADER_SHADOW : "none")};
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  
  padding: 6px 1.75rem;

  @media (max-width: 992px) {
    margin-left: 0;
    width: 100%;
    padding: 0 1.25rem;
  }

  &:hover {
    backdrop-filter: blur(14px);
  }
`;

export const HeaderTitle = styled.h1`
  font-size: 1.375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.TEXT};
  margin: 0;
  line-height: 1.2;
`;

export const BreadcrumbWrapper = styled(motion.nav)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.4;
  user-select: none;
  transition: color 0.3s ease, opacity 0.3s ease;

  span {
    display: flex;
    align-items: center;
    gap: 4px;
    transition: color 0.25s ease;
    color: ${({ theme }) => theme.TEXT_MUTED};
    letter-spacing: 0.25px;
  }

  span:last-child {
    color: ${({ theme }) => theme.CTA_COLOR};
    font-weight: 600;
  }

  span:hover:not(:last-child) {
    color: ${({ theme }) => theme.CTA_COLOR_HOVER || theme.CTA_COLOR};
    cursor: pointer;
    text-decoration: underline;
  }

  /* Separator styling */
  span + span::before {
    content: "›";
    color: ${({ theme }) => theme.LIGHT_GREY || "rgba(0,0,0,0.25)"};
    font-weight: 500;
    margin: 0 0.25rem;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    gap: 0.25rem;
  }
`;


export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.TEXT};
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.BG_GREY_HOVER};
    color: ${({ theme }) => theme.CTA_COLOR};
  }
`;
