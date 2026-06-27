import { useState } from "react";
import styled from "styled-components";
import { Button } from "@/components/atoms/Questions/Button";
import { QuestionHeader } from "@/components/molecules/Questions/QuestionHeader";
import { ExplanationBlock } from "@/components/molecules/Questions/ExplanationBlock";
import { PrecisionHint } from "@/components/molecules/Questions/PrecisionHint";
import { NATAnswerField } from "@/components/molecules/Questions/NATAnswerField";

const Card = styled.div`
  background: ${({ theme }) => theme.CONTENT_CARD};
  border: 1px solid ${({ theme }) => theme.CONTENT_BORDER};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing(4)};
`;

const ActionBar = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)};
  display: flex;
  justify-content: flex-end;
`;

export const NATQuestionCard = () => {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <Card>
      <QuestionHeader
        questionNumber={1}
        question="Calculate the acceleration of a body moving with uniform velocity of 10 m/s over 5 seconds."
      />

      <PrecisionHint />

      <NATAnswerField
        value={answer}
        disabled={submitted}
        onChange={setAnswer}
      />

      {!submitted && (
        <ActionBar>
          <Button
            disabled={!answer}
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
