import styled from "styled-components";
import { Typography } from "@/components/atoms/Questions/Typography";
import { Badge } from "@/components/atoms/Questions/Badge";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

interface QuestionHeaderProps {
  questionNumber: number;
  question: string;
}

export function QuestionHeader({
  questionNumber,
  question,
}: QuestionHeaderProps) {
  return (
    <Header>
      <Left>
        <Typography variant="label" muted>
          Question {questionNumber}
        </Typography>

        <Typography variant="h5">
          {question}
        </Typography>
      </Left>

      <Right>
        <Badge muted>SCQ</Badge>
      </Right>
    </Header>
  );
}
