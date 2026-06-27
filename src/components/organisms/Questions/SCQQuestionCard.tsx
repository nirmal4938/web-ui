import { useState } from "react";
import styled from "styled-components";
import { Button } from "@/components/atoms/Questions/Button";
import { ExplanationBlock } from "@/components/molecules/Questions/ExplanationBlock";
import { QuestionHeader } from "@/components/molecules/Questions/QuestionHeader";
import { OptionItem } from "@/components/molecules/Questions/OptionItem";

const Card = styled.div`
  background: ${({ theme }) => theme.CONTENT_CARD};
  border: 1px solid ${({ theme }) => theme.CONTENT_BORDER};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing(4)};
  box-shadow: ${({ theme }) => theme.CONTENT_SHADOW};
`;

const Options = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const ActionBar = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)};
  display: flex;
  justify-content: flex-end;
`;

export const SCQQuestionCard = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <Card>
      <QuestionHeader
        questionNumber={1}
        question="A ray of light passes from air to glass. What happens to its speed?"
      />

      <Options>
        {[0, 1, 2, 3].map((i) => (
          <OptionItem
            key={i}
            index={i}
            text={`Option ${i + 1}`}
            selected={selected === i}
            disabled={submitted}
            onClick={() => setSelected(i)}
          />
        ))}
      </Options>

      {!submitted && (
        <ActionBar>
          <Button
            disabled={selected === null}
            onClick={() => setSubmitted(true)}
          >
            Submit Answer
          </Button>
        </ActionBar>
      )}

      {submitted && <ExplanationBlock />}
    </Card>
  );
};
