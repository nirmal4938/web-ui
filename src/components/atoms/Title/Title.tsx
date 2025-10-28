import React from "react";
import styled from "styled-components";

type TitleLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface TitleProps {
  children: React.ReactNode;
  level?: TitleLevel;
  color?: string;
  className?: string;
}

const StyledTitle = styled.h1<{ level: TitleLevel; color?: string }>`
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ color, theme }) => color || theme.TEXT};
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  font-weight: ${({ level }) =>
    level === "h1"
      ? 700
      : level === "h2"
      ? 600
      : level === "h3"
      ? 500
      : 400};
  font-size: ${({ level, theme }) =>
    level === "h1"
      ? "2rem"
      : level === "h2"
      ? "1.75rem"
      : level === "h3"
      ? "1.5rem"
      : level === "h4"
      ? "1.25rem"
      : level === "h5"
      ? "1rem"
      : "0.875rem"};
`;

const Title: React.FC<TitleProps> = ({ children, level = "h3", color, className }) => {
  return (
    <StyledTitle as={level} level={level} color={color} className={className}>
      {children}
    </StyledTitle>
  );
};

export default Title;
