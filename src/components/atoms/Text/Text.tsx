import styled, { css } from "styled-components";

interface TextProps {
  variant?: "body" | "muted" | "title";
  weight?: 400 | 500 | 600 | 700;
}

export const Text = styled.span<TextProps>`
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: ${({ weight }) => weight || 400};
  ${({ variant, theme }) => {
    switch (variant) {
      case "title":
        return css`
          font-size: ${theme.font.size.h5};
          color: ${theme.TEXT_PRIMARY};
        `;
      case "muted":
        return css`
          font-size: ${theme.font.size.small};
          color: ${theme.TEXT_MUTED};
        `;
      default:
        return css`
          font-size: ${theme.font.size.body};
          color: ${theme.TEXT_PRIMARY};
        `;
    }
  }}
`;
