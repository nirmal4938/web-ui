import styled from "styled-components";

export const TableHeaderCell = styled.th`
  padding: ${({ theme }) => theme.spacing(2)};
  text-align: left;
  background: ${({ theme }) => theme.CONTENT_SURFACE};
  border-bottom: 2px solid ${({ theme }) => theme.CONTENT_BORDER};
  color: ${({ theme }) => theme.TEXT_PRIMARY};
  font-weight: 600;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.font.size.small};
`;
