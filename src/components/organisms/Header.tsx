import React from "react";
import {
  HeaderContainer,
  HeaderTitle,
  BreadcrumbWrapper,
  HeaderActions,
  IconButton,
} from "@components/atoms/Header/HeaderAtoms";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";

type HeaderProps = {
  title?: string;
  breadcrumbs?: string[];
  collapsed?: boolean;
  scrolled?: boolean;
  onMobileMenuToggle?: () => void;
};

export const Header: React.FC<HeaderProps> = ({
  title = "Dashboard",
  breadcrumbs = ["Home"],
  collapsed = false,
  scrolled = false,
  onMobileMenuToggle,
}) => {
  return (
    <HeaderContainer
      collapsed={collapsed}
      scrolled={scrolled}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Left: Hamburger + Title + Breadcrumbs */}
      <motion.div style={{ display: "flex", alignItems: "center", flex: 1, gap: "1rem" }}>
        {onMobileMenuToggle && (
          <IconButton onClick={onMobileMenuToggle} title="Menu" style={{ fontSize: "1.4rem" }}>
            ☰
          </IconButton>
        )}

        <motion.div
          layout
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          <HeaderTitle as={motion.h1}>{title}</HeaderTitle>
          <BreadcrumbWrapper>
            {breadcrumbs.map((bc, idx) => (
              <React.Fragment key={idx}>
                <span
                  style={{
                    color: idx === breadcrumbs.length - 1 ? "#1F6187" : "#6B7280",
                    fontWeight: idx === breadcrumbs.length - 1 ? 600 : 400,
                  }}
                >
                  {bc}
                </span>
                {idx < breadcrumbs.length - 1 && <span>›</span>}
              </React.Fragment>
            ))}
          </BreadcrumbWrapper>
        </motion.div>
      </motion.div>

      {/* Right: Actions */}
      <HeaderActions>
        <IconButton title="Notifications">
          <FaBell />
        </IconButton>
        <IconButton title="Profile">
          <FaUserCircle />
        </IconButton>
      </HeaderActions>
    </HeaderContainer>
  );
};
