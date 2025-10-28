import styled from 'styled-components';

export const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.BACKGROUND};
  color: white;
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
