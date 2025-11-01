import React from "react";
import { StyledButton } from "./Button.styles";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  isLoading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  isLoading = false,
  icon,
  children,
  disabled,
  ...rest
}) => {
  return (
    <StyledButton
      variant={variant}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {children}
        </>
      )}
    </StyledButton>
  );
};

export default Button;
