import styled from "styled-components";
import { Typography } from "@/components/atoms/Questions/Typography";
import { Badge } from "@/components/atoms/Questions/Badge";
import { Button } from "@/components/atoms/Questions/Button";
import { MCQQuestionCard } from "@/components/organisms/Questions/MCQQuestionCard";

const Page = styled.div`
  background: ${({ theme }) => theme.CONTENT_BG};
  min-height: 100vh;
`;

const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.SURFACE};
  border-bottom: 1px solid ${({ theme }) => theme.CONTENT_BORDER};
`;

const Content = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(4)};
`;

export default function MCQLayout() {
  return (
    <Page>
      <ControlBar>
        <div style={{ display: "flex", gap: 12 }}>
          <Typography variant="label" muted>Question Type</Typography>
          <Badge>MCQ</Badge>

          <Typography variant="label" muted>Correct Answers</Typography>
          <Badge muted>Multiple</Badge>
        </div>

        <Button>Add Question</Button>
      </ControlBar>

      <Content>
        <MCQQuestionCard />
      </Content>
    </Page>
  );
}
