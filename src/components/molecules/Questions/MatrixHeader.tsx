import styled from "styled-components";
import { Typography } from "@/components/atoms/Questions/Typography";

const Row = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(4, 1fr);
  padding: ${({ theme }) => theme.spacing(1)};
  border-bottom: 1px solid ${({ theme }) => theme.CONTENT_BORDER};
`;

export const MatrixHeader = () => (
  <Row>
    <Typography variant="label" muted>Column I</Typography>
    <Typography variant="label" muted>A</Typography>
    <Typography variant="label" muted>B</Typography>
    <Typography variant="label" muted>C</Typography>
    <Typography variant="label" muted>D</Typography>
  </Row>
);
