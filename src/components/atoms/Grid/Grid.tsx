import styled, { css } from "styled-components";

interface GridProps {
  columns?: number;
  gap?: string;
  align?: string;
}

export const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: ${({ columns }) => `repeat(${columns || 3}, 1fr)`};
  gap: ${({ gap }) => gap || "1rem"};
  align-items: ${({ align }) => align || "center"};
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

interface GridItemProps {
  colSpan?: number;
}

export const GridItem = styled.div<GridItemProps>`
  ${({ colSpan }) =>
    colSpan &&
    css`
      grid-column: span ${colSpan};
    `}
`;
