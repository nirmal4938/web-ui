import styled, { css } from "styled-components";

interface ButtonProps {
  variant?: "primary" | "secondary" | "success" | "warning" | "error" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const CustomButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: 500;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.25s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  /* 🔹 Button Sizes */
  ${({ size }) => {
    switch (size) {
      case "sm":
        return css`
          height: 36px;
          padding: 0 14px;
          font-size: 0.85rem;
        `;
      case "lg":
        return css`
          height: 56px;
          padding: 0 24px;
          font-size: 1.05rem;
        `;
      default:
        return css`
          height: 48px;
          padding: 0 20px;
          font-size: 0.95rem;
        `;
    }
  }}

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  /* 🎨 Variants */
  ${({ theme, variant }) => {
    switch (variant) {
      case "secondary":
        return css`
          background-color: ${theme.BG_GREY};
          color: ${theme.TEXT};
          &:hover {
            background-color: ${theme.BG_GREY_HOVER};
          }
        `;
      case "success":
        return css`
          background-color: ${theme.CTA_GREEN};
          color: ${theme.WHITE};
          &:hover {
            background-color: ${theme.CTA_SUCCESS};
          }
        `;
      case "warning":
        return css`
          background-color: ${theme.CTA_WARN};
          color: ${theme.BLACK};
          &:hover {
            background-color: ${theme.CTA_WARN_HOVER};
          }
        `;
      case "error":
        return css`
          background-color: ${theme.CTA_ERROR};
          color: ${theme.WHITE};
          &:hover {
            filter: brightness(0.9);
          }
        `;
      case "outline":
        return css`
          background-color: transparent;
          border: 1.5px solid ${theme.CTA_COLOR};
          color: ${theme.CTA_COLOR};
          &:hover {
            background-color: ${theme.CTA_COLOR_LIGHT};
          }
        `;
      default:
        return css`
          background-color: ${theme.CTA_COLOR};
          color: ${theme.WHITE};
          &:hover {
            background-color: ${theme.CTA_COLOR_HOVER};
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
  }

  &:active {
    transform: scale(0.97);
  }
`;
