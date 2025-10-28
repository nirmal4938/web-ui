import styled from 'styled-components';

export const SidebarContainer = styled.aside<{ collapsed: boolean }>`
  width: ${({ collapsed }) => (collapsed ? '72px' : '240px')};
  height: 100vh;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.DARKISH_GREEN};
  border-right: 1px solid ${({ theme }) => theme.GREY_DISABLED};
  transition: width 0.3s ease, background-color 0.25s ease;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    position: absolute;
    transform: ${({ collapsed }) =>
      collapsed ? 'translateX(-100%)' : 'translateX(0)'};
    width: 240px;
  }
`;

export const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const SidebarHeader = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  color: ${({ theme }) => theme.WHITE};
  letter-spacing: 0.5px;
  font-size: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.CTA_COLOR_LIGHT};
`;

export const ComposeButton = styled.button`
  background-color: ${({ theme }) => theme.YELLOW};
  color: ${({ theme }) => theme.BLACK};
  padding: 12px 20px;
  border: none;
  border-radius: 24px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  margin: 16px 16px 8px 16px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.CTA_COLOR_ALERT_HOVER};
    color: ${({ theme }) => theme.WHITE};
  }
`;

export const CollapseButton = styled.button`
  position: absolute;
  top: 12px;
  right: -14px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.WHITE};
  color: ${({ theme }) => theme.DARKISH_GREEN};
  border: 1px solid ${({ theme }) => theme.LIGHT_GREY};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.YELLOW};
    color: ${({ theme }) => theme.BLACK};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
`;

export const NavItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NavItemButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  background: ${({ active, theme }) =>
    active ? theme.CTA_COLOR_LIGHT : 'transparent'};
  color: ${({ active, theme }) =>
    active ? theme.WHITE : theme.WHITE_HOVER};
  border: none;
  width: 100%;
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background: ${({ theme, active }) =>
      active ? theme.CTA_COLOR_HOVER : theme.CTA_COLOR_LIGHT};
    color: ${({ theme }) => theme.WHITE};
  }

  svg {
    margin-right: 12px;
    font-size: 18px;
  }
`;

export const NavLabel = styled.span`
  flex-grow: 1;
  font-size: 14px;
`;

export const SubMenu = styled.div`
  padding-left: 1.5rem;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.CTA_COLOR_LIGHT};
  border-left: 2px solid ${({ theme }) => theme.YELLOW};
`;

export const SubNavItem = styled.div<{ active?: boolean }>`
  padding: 8px 20px;
  color: ${({ active, theme }) =>
    active ? theme.YELLOW : theme.WHITE};
  cursor: pointer;
  font-size: 0.9rem;
  border-radius: 4px;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.CTA_COLOR_HOVER};
    color: ${({ theme }) => theme.YELLOW};
  }
`;

export const UnreadCount = styled.span`
  background-color: ${({ theme }) => theme.CTA_COLOR_ALERT};
  color: ${({ theme }) => theme.BLACK};
  font-size: 12px;
  padding: 2px 6px;
  margin-left: auto;
  border-radius: 12px;
  font-weight: 600;
`;

export const UpgradeBox = styled.div`
  background: ${({ theme }) => theme.CTA_COLOR_LIGHT};
  color: ${({ theme }) => theme.WHITE};
  margin: 1rem;
  padding: 1rem;
  font-size: 0.875rem;
  text-align: center;
  border-radius: 6px;
  font-weight: 500;
  border: 1px solid ${({ theme }) => theme.YELLOW};

  &:hover {
    background: ${({ theme }) => theme.CTA_COLOR_HOVER};
  }
`;
