import styled, { css } from "styled-components";

interface StyledButtonProps {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(1)};
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 1px solid transparent;

  ${({ size, theme }) => {
    switch (size) {
      case "sm":
        return css`
          font-size: ${theme.font.size.small};
          padding: ${theme.spacing(0.75)} ${theme.spacing(1.5)};
        `;
      case "lg":
        return css`
          font-size: ${theme.font.size.lg};
          padding: ${theme.spacing(1.5)} ${theme.spacing(3)};
        `;
      default:
        return css`
          font-size: ${theme.font.size.body};
          padding: ${theme.spacing(1)} ${theme.spacing(2)};
        `;
    }
  }}

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
      display: flex;
    `}

  ${({ variant, theme }) => {
    switch (variant) {
      case "outline":
        return css`
          background-color: ${theme.WHITE};
          color: ${theme.CTA_COLOR};
          border: 1px solid ${theme.CTA_COLOR};
          &:hover {
            background-color: ${theme.CTA_COLOR_LIGHT};
          }
        `;
      case "ghost":
        return css`
          background-color: transparent;
          color: ${theme.CTA_COLOR};
          &:hover {
            background-color: ${theme.HOVER_BG};
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

  ${({ disabled, theme }) =>
    disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
      background-color: ${theme.GREY_DISABLED};
      border-color: ${theme.GREY_DISABLED};
      color: ${theme.TEXT_MUTED};
    `}

  .btn-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;
