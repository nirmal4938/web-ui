import { useState } from "react";
import styled from "styled-components";
import { Button } from "@/components/atoms/Questions/Button";
import { QuestionHeader } from "@/components/molecules/Questions/QuestionHeader";
import { ExplanationBlock } from "@/components/molecules/Questions/ExplanationBlock";
import { InstructionHint } from "@/components/molecules/Questions/InstructionHint";
import { MCQOptionItem } from "@/components/molecules/Questions/MCQOptionItem";

const Card = styled.div`
  background: ${({ theme }) => theme.CONTENT_CARD};
  border: 1px solid ${({ theme }) => theme.CONTENT_BORDER};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing(4)};
`;

export const MCQQuestionCard = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (i: number) => {
    setSelected((prev) =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    );
  };

  return (
    <Card>
      <QuestionHeader
        questionNumber={1}
        question="Which of the following are vector quantities?"
      />

      <InstructionHint />

      {[0, 1, 2, 3].map(i => (
        <MCQOptionItem
          key={i}
          index={i}
          text={`Option ${i + 1}`}
          selected={selected.includes(i)}
          disabled={submitted}
          onToggle={() => toggle(i)}
        />
      ))}

      {!submitted && (
        <div style={{ marginTop: 24, textAlign: "right" }}>
          <Button
            disabled={selected.length === 0}
            onClick={() => setSubmitted(true)}
          >
            Submit Answers
          </Button>
        </div>
      )}

      {submitted && <ExplanationBlock />}
    </Card>
  );
};
