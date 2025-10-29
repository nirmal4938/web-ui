import styled, { css } from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.5)};
  position: relative;
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.font.size.label};
  color: ${({ theme }) => theme.TEXT}; /* ✅ corrected key */
  font-weight: 500;
  letter-spacing: 0.3px;
  font-family: ${({ theme }) => theme.fontFamily};
  transition: color 0.2s ease;

  /* Highlight label when input inside is focused */
  ${InputWrapper}:focus-within & {
    color: ${({ theme }) => theme.CTA_COLOR};
  }
`;

export const Input = styled.input<{ hasError?: boolean }>`
  height: 46px;
  padding: 0 ${({ theme }) => theme.spacing(1)};
  border: 1px solid
    ${({ hasError, theme }) => (hasError ? theme.CTA_ERROR : theme.BORDER)};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.SURFACE};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.font.size.body};
  color: ${({ theme }) => theme.TEXT}; /* ✅ corrected key */
  transition: all 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => theme.CTA_COLOR_HOVER};
  }

  &:focus {
    border-color: ${({ theme }) => theme.CTA_COLOR};
    outline: none;
    box-shadow: 0 0 0 3px rgba(31, 97, 135, 0.25); /* focus sheet */
    background-color: ${({ theme }) => theme.HOVER_BG};
  }

  ${({ hasError, theme }) =>
    hasError &&
    css`
      box-shadow: 0 0 0 2px rgba(212, 59, 39, 0.2);
    `}
`;

export const ErrorText = styled.span`
  color: ${({ theme }) => theme.CTA_ERROR};
  font-size: ${({ theme }) => theme.font.size.small};
  margin-top: ${({ theme }) => theme.spacing(0.25)};
  font-weight: 500;
`;
