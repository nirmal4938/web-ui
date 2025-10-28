import React from "react";
import styled from "styled-components";

type TitleLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  level?: TitleLevel;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const StyledTitle = styled.h1<{ $level: TitleLevel; $color?: string }>`
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ $color, theme }) => $color || theme.TEXT};
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  font-weight: ${({ $level }) =>
    $level === "h1"
      ? 700
      : $level === "h2"
      ? 600
      : $level === "h3"
      ? 500
      : 400};
  font-size: ${({ $level, theme }) =>
    $level === "h1"
      ? theme.font.size.h1
      : $level === "h2"
      ? theme.font.size.h2
      : $level === "h3"
      ? theme.font.size.h3
      : $level === "h4"
      ? theme.font.size.h4
      : $level === "h5"
      ? theme.font.size.h5
      : theme.font.size.h6};
`;

const Title: React.FC<TitleProps> = ({
  children,
  level = "h3",
  color,
  className,
  style,
  ...rest
}) => {
  return (
    <StyledTitle
      as={level}
      $level={level}
      $color={color}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </StyledTitle>
  );
};

export default Title;
