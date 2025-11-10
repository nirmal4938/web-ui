// src/components/organisms/Question/QuestionCard.tsx
import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

const CardWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.CONTENT_BORDER};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.CONTENT_CARD};
  padding: ${({ theme }) => theme.spacing(3)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  position: relative;
`;

const QuestionText = styled.h4`
  font-weight: 600;
  color: ${({ theme }) => theme.TEXT};
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.5)};
`;

const OptionButton = styled.button<{ isSelected?: boolean; isCorrect?: boolean; isAnswered?: boolean }>`
  padding: ${({ theme }) => theme.spacing(1.5)};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.CONTENT_BORDER};
  cursor: ${({ isAnswered }) => (isAnswered ? "not-allowed" : "pointer")};
  background: ${({ theme, isSelected, isCorrect, isAnswered }) => {
    if (!isAnswered) return theme.WHITE;
    if (isSelected) return isCorrect ? theme.CTA_GREEN : theme.CTA_COLOR_ALERT;
    return theme.BG_GREY;
  }};
  color: ${({ theme }) => theme.TEXT};
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background: ${({ theme, isAnswered }) => (isAnswered ? undefined : theme.HOVER_BG)};
  }
`;

const Feedback = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.CTA_COLOR_ALERT};
  font-style: italic;
`;

const TimerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 5px;
  width: 100%;
  background: ${({ theme }) => theme.BG_GREY};
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
`;

const TimerBar = styled.div<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background: ${({ theme, progress }) => (progress < 25 ? theme.CTA_COLOR_ALERT : theme.CTA_COLOR)};
  transition: width 0.1s linear;
`;

interface QuestionCardProps {
  id: string;
  question: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  options: string[];
  correctOption: string;
  onAnswer: (isCorrect: boolean) => void;
  timeLimit?: number; // seconds
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  correctOption,
  onAnswer,
  timeLimit = 30,
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [aiHint, setAiHint] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleSelect = (option: string) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    const isCorrect = option === correctOption;
    onAnswer(isCorrect);
  };

  useEffect(() => {
    if (!answered) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            handleSelect(""); // auto mark incorrect
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current!);
  }, [answered]);

  useEffect(() => {
    if (answered) {
      clearInterval(intervalRef.current!);

      const fetchHint = async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_PROD_URL}/questions/hint`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ questionText: question }),
          });
          const data = await res.json();
          setAiHint(data.hint || "");
        } catch (err) {
          console.error(err);
        }
      };
      fetchHint();
    }
  }, [answered, question]);

  return (
    <CardWrapper>
      <TimerWrapper>
        <TimerBar progress={(timeLeft / timeLimit) * 100} />
      </TimerWrapper>

      <QuestionText>{question}</QuestionText>

      <OptionsWrapper>
        {options.map((opt) => (
          <OptionButton
            key={opt}
            onClick={() => handleSelect(opt)}
            isSelected={selected === opt}
            isCorrect={opt === correctOption}
            isAnswered={answered}
          >
            {opt}
          </OptionButton>
        ))}
      </OptionsWrapper>

      {answered && (
        <Feedback>
          {selected === correctOption
            ? "Correct! ✅"
            : `Wrong! ❌ Correct Answer: ${correctOption}`}
          {aiHint && <div>💡 Hint: {aiHint}</div>}
        </Feedback>
      )}
    </CardWrapper>
  );
};

export default QuestionCard;
