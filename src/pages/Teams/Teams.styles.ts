import styled from 'styled-components';

export const PageWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.CTA_COLOR_LIGHT};
  font-size: 2rem;
`;
