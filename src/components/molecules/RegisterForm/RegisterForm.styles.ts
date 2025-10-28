import styled from "styled-components";

export const FormWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing(3)};
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormSection = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.SURFACE};
  border-radius: ${({ theme }) => theme.spacing(1)}; /* theme.radius.md not defined, using spacing fallback */
  padding: ${({ theme }) => theme.spacing(3)};
  box-shadow: ${({ theme }) => theme.CONTENT_SHADOW};

  h3 {
    margin-bottom: ${({ theme }) => theme.spacing(2)};
    color: ${({ theme }) => theme.CTA_COLOR};
    font-size: 1.5rem; /* fallback if theme.font.size.lg not defined */
    font-weight: 600;
  }

  .form-body {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
  }
`;

export const ErrorText = styled.span`
  color: ${({ theme }) => theme.CTA_ERROR};
  font-size: 0.8125rem; /* 13px */
`;

export const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;
