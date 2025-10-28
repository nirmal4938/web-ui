import styled from "styled-components";

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.5)};
`;

export const Label = styled.label`
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};
  font-size: ${({ theme }) => theme.font.size.label};
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ theme }) => theme.TEXT_MUTED};
`;

export const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(1)};
  padding-right: 36px;
  border: 1px solid
    ${({ hasError, theme }) => (hasError ? theme.CTA_ERROR : theme.BORDER)};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.font.size.body};
  font-family: ${({ theme }) => theme.fontFamily};
  background-color: ${({ theme }) => theme.SURFACE};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.CTA_COLOR};
    outline: none;
    box-shadow: 0 0 0 2px rgba(31, 97, 135, 0.2);
  }
`;

export const ToggleButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.TEXT};
`;

export const ToggleIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  cursor: pointer;
  user-select: none;
`;

export const ErrorText = styled.span`
  color: ${({ theme }) => theme.CTA_ERROR};
  font-size: ${({ theme }) => theme.font.size.small};
  margin-top: ${({ theme }) => theme.spacing(0.5)};
`;
