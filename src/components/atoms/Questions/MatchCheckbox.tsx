import styled from "styled-components";

export const MatchCheckbox = styled.input.attrs({ type: "checkbox" })`
  cursor: pointer;
  width: 20px;
  height: 20px;
  accent-color: ${({ theme }) => theme.TEXT_PRIMARY || "#4caf50"};
  transition: transform 0.2s ease;
`;
