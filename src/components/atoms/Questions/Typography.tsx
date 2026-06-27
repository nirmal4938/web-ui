import styled from "styled-components";

interface Props {
  variant?: "h3" | "h5" | "body" | "label" | "small";
  muted?: boolean;
}

export const Typography = styled.p<Props>`
  margin: 0;
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ muted, theme }) =>
    muted ? theme.TEXT_MUTED : theme.TEXT};

  font-size: ${({ variant, theme }) =>
    variant ? theme.font.size[variant] : theme.font.size.body};
`;
