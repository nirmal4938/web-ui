import styled from "styled-components";

export const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing(2)};
  border-bottom: 1px solid ${({ theme }) => theme.CONTENT_BORDER};
  color: ${({ theme }) => theme.TEXT_PRIMARY};
  font-size: ${({ theme }) => theme.font.size.body};
  vertical-align: middle;
`;
