import React from "react";
import { CustomButton } from "./ButtonPrimary.styles";

export interface ButtonPrimaryProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  loading?: boolean;
  children?: React.ReactNode;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  label,
  loading,
  disabled,
  children,
  ...rest
}) => {
  return (
    <CustomButton disabled={disabled || loading} {...rest}>
      {loading ? "Loading..." : children || label}
    </CustomButton>
  );
};

export default ButtonPrimary;
