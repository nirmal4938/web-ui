import styled from "styled-components";

export const RadioInput = styled.input.attrs({ type: "radio" })`
  accent-color: ${({ theme }) => theme.CTA_COLOR};
`;
