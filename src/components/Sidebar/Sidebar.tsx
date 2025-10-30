import React from 'react';
import {
  SidebarContainer,
  SidebarWrapper,
  NavSection,
  NavItemContainer,
  NavItemButton,
  NavLabel,
  SubMenu,
  CollapseButton
} from './Sidebar.styles';
import {
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
  FaSignOutAlt
} from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { sidebarConfig } from '@/config/SidebarConfig';
import type { NavItem } from '@/types/navigation';
import { usePermissions } from '@hooks/usePermissions';
import { useAuth } from '@hooks/useAuth'; // ✅ Added hook for logout

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();
  const { logout } = useAuth(); // ✅ use logout action
  const [expandedItem, setExpandedItem] = React.useState<string | null>(null);

  const renderNavItems = () =>
    sidebarConfig
      .filter(item => !item.permission || hasPermission(item.permission))
      .map((item: NavItem) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedItem === item.label;
        const isActive = item.path ? location.pathname.startsWith(item.path) : false;

        return (
          <NavItemContainer key={item.label}>
            <NavItemButton
              active={isActive}
              onClick={() => {
                if (item.path) navigate(item.path);
                if (hasChildren) setExpandedItem(isExpanded ? null : item.label);
              }}
            >
              {item.icon}
              {!collapsed && <NavLabel>{item.label}</NavLabel>}
              {!collapsed && hasChildren && (isExpanded ? <FaChevronUp /> : <FaChevronDown />)}
            </NavItemButton>

            <AnimatePresence initial={false}>
              {!collapsed && hasChildren && isExpanded && item.children && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <SubMenu>
                    {item.children
                      .filter(child => !child.permission || hasPermission(child.permission))
                      .map(sub => (
                        <NavItemButton
                          key={sub.label}
                          active={location.pathname === sub.path}
                          onClick={() => navigate(sub.path || '/')}
                          style={{ fontSize: '0.85rem', paddingLeft: '2.5rem' }}
                        >
                          {sub.label}
                        </NavItemButton>
                      ))}
                  </SubMenu>
                </motion.div>
              )}
            </AnimatePresence>
          </NavItemContainer>
        );
      });

  return (
    <SidebarContainer collapsed={collapsed}>
      {/* Collapse Button */}
      <CollapseButton onClick={onToggle}>
        {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </CollapseButton>

      {/* Sidebar Navigation */}
      <SidebarWrapper>
        <NavSection>{renderNavItems()}</NavSection>
      </SidebarWrapper>

      {/* ✅ Logout Button Fixed at Bottom */}
      <div
  style={{
    position: 'absolute',
    bottom: '1rem',
    width: '100%',
  }}
>
  <NavItemButton
    active={false} // ✅ REQUIRED because styled component expects it
    onClick={() => logout()}
    style={{
      justifyContent: collapsed ? 'center' : 'flex-start',
      color: '#e74c3c',
    }}
  >
    <FaSignOutAlt />
    {!collapsed && <NavLabel>Logout</NavLabel>}
  </NavItemButton>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
