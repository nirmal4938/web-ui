import styled, { css } from "styled-components";

interface BadgeProps {
  muted?: boolean;
}

export const Badge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  line-height: 1;
  font-weight: 500;

  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: ${({ theme }) => theme.font.size.small};

  ${({ muted, theme }) =>
    muted
      ? css`
          background: ${theme.SURFACE};
          color: ${theme.TEXT_MUTED};
          border: 1px solid ${theme.CONTENT_BORDER};
        `
      : css`
          background: ${theme.CTA_COLOR_LIGHT};
          color: ${theme.CTA_COLOR};
        `}
`;
