import styled from "styled-components";
import { Typography } from "@/components/atoms/Questions/Typography";

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing(3)};
  padding-top: ${({ theme }) => theme.spacing(2)};
  border-top: 1px solid ${({ theme }) => theme.CONTENT_BORDER};
`;

const Left = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export function QuestionMeta() {
  return (
    <Meta>
      <Left>
        <Typography variant="small" muted>
          Difficulty: Medium
        </Typography>
        <Typography variant="small" muted>
          Topic: Thermodynamics
        </Typography>
      </Left>

      <Typography variant="small" muted>
        Marks: +1 &nbsp;|&nbsp; Negative: −0.33
      </Typography>
    </Meta>
  );
}
