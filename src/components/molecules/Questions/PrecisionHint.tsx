import styled from "styled-components";
import { Typography } from "@/components/atoms/Questions/Typography";

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  border-left: 3px solid ${({ theme }) => theme.CTA_COLOR};
  background: ${({ theme }) => theme.CONTENT_SURFACE};
`;

export const PrecisionHint = () => (
  <Wrapper>
    <Typography variant="small" muted>
      Enter the answer correct up to two decimal places if required.
    </Typography>
  </Wrapper>
);
