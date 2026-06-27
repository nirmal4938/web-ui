import styled from "styled-components";
import { Typography } from "@/components/atoms/Questions/Typography";
import { SCQQuestionCard } from "@/components/organisms/Questions/SCQQuestionCard";
import { Button } from "@/components/atoms/Questions/Button";
import { Badge } from "@/components/atoms/Questions/Badge";

const Page = styled.div`
  background: ${({ theme }) => theme.CONTENT_BG};
  min-height: 100vh;
`;

/* 🔹 Command / Control Bar */
const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.SURFACE};
  border-bottom: 1px solid ${({ theme }) => theme.CONTENT_BORDER};
`;

const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

/* 🔹 Main Content Wrapper */
const Content = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(4)};
`;

/* 🔹 Section Framing */
const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export default function SCQLayout() {
  return (
    <Page>
      {/* 🔹 Control Bar */}
      <ControlBar>
        <ControlGroup>
          <Typography variant="label" muted>
            Question Type
          </Typography>
          <Badge>SCQ</Badge>

          <Typography variant="label" muted>
            Difficulty
          </Typography>
          <Badge muted>All</Badge>
        </ControlGroup>

        <ControlGroup>
          <Button>Add Question</Button>
        </ControlGroup>
      </ControlBar>

      {/* 🔹 Main Content */}
      <Content>
        <Section>
          <SCQQuestionCard />
        </Section>
      </Content>
    </Page>
  );
}
