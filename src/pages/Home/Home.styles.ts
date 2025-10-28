import styled from 'styled-components';
const mode = (theme: any) => theme; // helper for DRY access
export const PageWrapper = styled.div`
  padding: ${({ theme }) =>theme.spacing(2)};
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.TEXT};
  font-size: 2rem;
`;
