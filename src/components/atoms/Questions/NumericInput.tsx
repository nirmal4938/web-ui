import styled from "styled-components";

export const NumericInput = styled.input.attrs({
  type: "number",
})`
  width: 160px;
  padding: ${({ theme }) => theme.spacing(1)};
  font-size: ${({ theme }) => theme.font.size.lg};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.CONTENT_BORDER};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.CTA_COLOR};
  }
`;
