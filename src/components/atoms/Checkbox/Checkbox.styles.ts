import styled from "styled-components";

export const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.size.body};
  color: ${({ theme }) => theme.TEXT}; // ← updated
`;

export const Input = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${({ theme }) => theme.CTA_COLOR}; // ← updated
`;

export const Label = styled.span`
  font-size: ${({ theme }) => theme.font.size.body}; // or medium if defined
  color: ${({ theme }) => theme.TEXT}; // ← updated
`;
