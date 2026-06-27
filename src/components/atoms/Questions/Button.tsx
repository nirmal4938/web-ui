import styled from "styled-components";

export const Button = styled.button`
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radius.md};
  border: none;
  cursor: pointer;
  font-weight: 500;

  background: ${({ theme }) => theme.CTA_COLOR};
  color: ${({ theme }) => theme.WHITE};

  &:hover {
    background: ${({ theme }) => theme.CTA_COLOR_HOVER};
  }
`;
