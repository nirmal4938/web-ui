import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.BACKGROUND};
`;

export const Card = styled.div`
  width: 400px;
  padding: ${({ theme }) => theme.spacing(4)};
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: ${({ theme }) => theme.radius.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};

  h2 {
    font-size: ${({ theme }) => theme.font.size.h2};
    text-align: center;
    color: ${({ theme }) => theme.CTA_COLOR_LIGHT};
    margin-bottom: ${({ theme }) => theme.spacing(1)};
  }
`;
