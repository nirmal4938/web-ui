import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { sidebarConfig } from "@/config/SidebarConfig";
import { usePermissions } from "@hooks/usePermissions";
import { useAuth } from "@hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const Overlay = styled(motion.div)`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 900;
  }
`;

const SidebarContainer = styled(motion.aside)<{ collapsed: boolean }>`
  width: ${({ collapsed }) => (collapsed ? "72px" : "240px")};
  height: 100vh;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.DARKISH_GREEN};
  border-right: 1px solid ${({ theme }) => theme.GREY_DISABLED};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: width 0.3s ease;

  @media (max-width: 768px) {
    width: 240px;
    transform: translateX(${({ collapsed }) => (collapsed ? "-100%" : "0")});
    transition: transform 0.3s ease;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  min-height: 60px;
  color: #fff;
`;

const Avatar = styled.div<{ collapsed: boolean }>`
  width: ${({ collapsed }) => (collapsed ? "40px" : "50px")};
  height: ${({ collapsed }) => (collapsed ? "40px" : "50px")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ collapsed }) => (collapsed ? "1.3rem" : "1.5rem")};
  background-color: #2c3e50;
  color: #ecf0f1;
  overflow: hidden;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.2;
`;

const UserName = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
`;

const UserEmail = styled.span`
  font-size: 0.8rem;
  color: #bdc3c7;
`;

const NavSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
`;

const NavItemButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  background: ${({ active, theme }) => (active ? theme.CTA_COLOR_LIGHT : "transparent")};
  color: ${({ active, theme }) => (active ? theme.WHITE : theme.WHITE_HOVER)};
  border: none;
  width: 100%;
  padding: 12px 16px;
  cursor: pointer;
  font-size: 0.9rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;

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

const SubMenu = styled.div`
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
`;

const CollapseButton = styled.button<{ collapsed: boolean }>`
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
  transform: ${({ collapsed }) => (collapsed ? "rotate(180deg)" : "rotate(0deg)")};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.YELLOW};
    color: ${({ theme }) => theme.BLACK};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoutWrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  width: 100%;
`;

const HamburgerButton = styled.button`
  display: none;
  position: fixed;
  top: 10px;
  left: 200px;
  z-index: 1100;
  background: ${({ theme }) => theme.WHITE};
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

interface SidebarProps {
  collapsed: boolean;
  mobileOpen?: boolean;
  onToggle: () => void;
  onMobileToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle, mobileOpen = false, onMobileToggle }) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { hasPermission } = usePermissions();
  const isMobile = window.innerWidth <= 768;

  const renderNavItems = () =>
    sidebarConfig
      .filter(item => !item.permission || hasPermission(item.permission))
      .map(item => {
        const hasChildren = Array.isArray(item.children) && item.children.length > 0;
        const isExpanded = expandedItem === item.label;
        const isActive = item.path ? location.pathname.startsWith(item.path) : false;

        const handleClick = () => {
          if (item.path) navigate(item.path);
          if (hasChildren) setExpandedItem(isExpanded ? null : item.label);
          if (isMobile && onMobileToggle) onMobileToggle();
        };

        return (
          <div key={item.label}>
            <NavItemButton active={isActive} onClick={handleClick} title={collapsed ? item.label : undefined}>
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </NavItemButton>
            {!collapsed && hasChildren && isExpanded && (
              <SubMenu>
                {item.children
                  ?.filter(child => !child.permission || hasPermission(child.permission))
                  .map(sub => (
                    <NavItemButton
                      key={sub.label}
                      active={location.pathname === sub.path}
                      onClick={() => {
                        navigate(sub.path || "/");
                        if (isMobile && onMobileToggle) onMobileToggle();
                      }}
                      style={{ fontSize: "0.85rem", paddingLeft: "2.5rem" }}
                    >
                      {sub.label}
                    </NavItemButton>
                  ))}
              </SubMenu>
            )}
          </div>
        );
      });

  return (
    <>
      {/* <HamburgerButton onClick={onMobileToggle}>☰</HamburgerButton> */}

      <AnimatePresence>
        {isMobile && mobileOpen && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileToggle}
          />
        )}
      </AnimatePresence>

      <SidebarContainer
        collapsed={collapsed && !mobileOpen}
        initial={{ x: isMobile && !mobileOpen ? -300 : 0 }}
        animate={{ x: isMobile && !mobileOpen ? -300 : 0 }}
      >
        <SidebarHeader>
          <Avatar collapsed={collapsed}>
            {user?.avatarUrl ? <img src={user.avatarUrl} alt="avatar" /> : <FaUserCircle />}
          </Avatar>
          {!collapsed && (
            <UserInfo>
              <UserName>{user?.fullName || "Guest User"}</UserName>
              <UserEmail>{user?.email || "Not logged in"}</UserEmail>
            </UserInfo>
          )}
          <CollapseButton collapsed={collapsed} onClick={onToggle}>
            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </CollapseButton>
        </SidebarHeader>

        <NavSection>{renderNavItems()}</NavSection>

        <LogoutWrapper>
          <NavItemButton
            active={false}
            onClick={() => {
              logout();
              if (isMobile && onMobileToggle) onMobileToggle();
            }}
            style={{ justifyContent: collapsed ? "center" : "flex-start", color: "#e74c3c" }}
          >
            <FaSignOutAlt />
            {!collapsed && <span>Logout</span>}
          </NavItemButton>
        </LogoutWrapper>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
