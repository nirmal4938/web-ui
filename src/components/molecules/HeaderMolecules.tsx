import React from "react";
import {
  HeaderTitle,
  BreadcrumbWrapper,
  HeaderActions,
  IconButton,
} from "@components/atoms/Header/HeaderAtoms";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";

type HeaderMoleculesProps = {
  title?: string;
  breadcrumbs?: string[];
  collapsed?: boolean;
  scrolled?: boolean;
};

export const HeaderMolecules: React.FC<HeaderMoleculesProps> = ({
  title = "Dashboard",
  breadcrumbs = ["Home"],
  collapsed = false,
  
}) => {
  return (
    <motion.div
      layout
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      {/* Left: Title + Breadcrumbs */}
      <motion.div
        layout
        style={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          flex: 1,
          maxWidth: collapsed ? "70%" : "85%",
        }}
      >
        <HeaderTitle
          as={motion.h1}
          layout
          transition={{ duration: 0.3 }}
          style={{
            fontSize: collapsed ? "1.1rem" : "1.45rem",
            fontWeight: 700,
            letterSpacing: "-0.2px",
            lineHeight: 1.25,
          }}
        >
          {title}
        </HeaderTitle>

 <BreadcrumbWrapper
  as={motion.nav}
  layout
  transition={{ duration: 0.3 }}
  style={{
    opacity: collapsed ? 0.85 : 1,
    fontSize: collapsed ? "0.8rem" : "0.9rem",
    color: "#4B5563", // subtle slate grey for inactive
  }}
>
  {breadcrumbs.map((bc, idx) => (
    <React.Fragment key={idx}>
      <span
        style={{
          color:
            idx === breadcrumbs.length - 1
              ? "#1F6187" // active breadcrumb = primary CTA blue
              : "#6B7280", // intermediate ones muted
          fontWeight: idx === breadcrumbs.length - 1 ? 600 : 400,
          letterSpacing: "0.3px",
          transition: "color 0.25s ease",
        }}
      >
        {bc}
      </span>
      {idx < breadcrumbs.length - 1 && (
        <span
          style={{
            color: "#9CA3AF",
            margin: "0 4px",
            fontSize: "0.85em",
          }}
        >
          ›
        </span>
      )}
    </React.Fragment>
  ))}
</BreadcrumbWrapper>

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
    </motion.div>
  );
};
