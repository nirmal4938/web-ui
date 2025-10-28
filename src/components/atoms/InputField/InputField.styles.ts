import styled from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.5)};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.font.size.label};
  color: ${({ theme }) => theme.TEXT_MUTED};
  font-family: ${({ theme }) => theme.fontFamily};
`;

export const Input = styled.input<{ hasError?: boolean }>`
  height: 44px;
  padding: 0 ${({ theme }) => theme.spacing(1)};
  border: 1px solid
    ${({ hasError, theme }) =>
      hasError ? theme.CTA_ERROR : theme.BORDER};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.SURFACE};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.font.size.body};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.CTA_COLOR};
    outline: none;
    box-shadow: 0 0 0 2px rgba(31, 97, 135, 0.2);
  }
`;

export const ErrorText = styled.span`
  color: ${({ theme }) => theme.CTA_ERROR};
  font-size: ${({ theme }) => theme.font.size.small};
  margin-top: ${({ theme }) => theme.spacing(0.25)};
`;
