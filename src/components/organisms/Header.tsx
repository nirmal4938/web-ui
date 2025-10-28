import React from "react";
import { HeaderContainer } from "@components/atoms/Header/HeaderAtoms";
import { HeaderMolecules } from "@components/molecules/HeaderMolecules";

type HeaderProps = {
  title?: string;
  breadcrumbs?: string[];
  collapsed?: boolean;
  scrolled?: boolean;
};

export const Header: React.FC<HeaderProps> = ({
  title,
  breadcrumbs,
  collapsed = false,
  scrolled = false,
}) => {
  return (
    <HeaderContainer
      collapsed={collapsed}
      scrolled={scrolled}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <HeaderMolecules
        title={title}
        breadcrumbs={breadcrumbs}
        collapsed={collapsed}
        scrolled={scrolled}
      />
    </HeaderContainer>
  );
};
