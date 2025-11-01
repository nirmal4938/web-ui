import styled, { css } from "styled-components";

interface ButtonProps {
  variant?: "primary" | "outline" | "ghost";
  disabled?: boolean;
}

export const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(1)};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.font.size.body};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(2)}`};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 1px solid transparent;

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
`;
