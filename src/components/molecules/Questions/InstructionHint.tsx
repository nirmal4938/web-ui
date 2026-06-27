import styled from "styled-components";
import { Typography } from "@/components/atoms/Questions/Typography";

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  border: 1px dashed ${({ theme }) => theme.CONTENT_BORDER};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.CONTENT_SURFACE};
`;

export const InstructionHint = () => (
  <Wrapper>
    <Typography variant="small" muted>
      This question may have more than one correct answer. Select all that apply.
    </Typography>
  </Wrapper>
);
