import { useState } from "react";
import styled from "styled-components";
import { Button } from "@/components/atoms/Questions/Button";
import { QuestionHeader } from "@/components/molecules/Questions/QuestionHeader";
import { ExplanationBlock } from "@/components/molecules/Questions/ExplanationBlock";
import { Typography } from "@/components/atoms/Questions/Typography";
import { MatchCell } from "@/components/molecules/Questions/MatchCell";

const Card = styled.div`
  background: ${({ theme }) => theme.CONTENT_CARD};
  border: 1px solid ${({ theme }) => theme.CONTENT_BORDER};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing(4)};
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)} 0;
  border-bottom: 2px solid ${({ theme }) => theme.CONTENT_BORDER};
`;

const RowLabel = styled.div`
  flex: 2;
  font-weight: 600;
  padding-left: ${({ theme }) => theme.spacing(2)};
`;

const CheckboxCell = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const MatrixRow = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)} 0;
  border-bottom: 1px solid ${({ theme }) => theme.CONTENT_BORDER};
  background: ${({ disabled, theme }) =>
    disabled ? theme.DISABLED_BG || "#f9f9f9" : "transparent"};

  &:hover {
    background: ${({ disabled, theme }) =>
      !disabled ? theme.HOVER_BG || "#f5f5f5" : undefined};
  }
`;

const ActionBar = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)};
  display: flex;
  justify-content: flex-end;
`;

// Real-time data: Physical laws
const rows = [
  "Newton’s First Law",
  "Ohm’s Law",
  "Snell’s Law",
  "Faraday’s Law",
];

// Real-time data: Correct descriptions for matching
const headers = [
  "Column I",
  "An object remains in motion or rest unless acted upon by an external force", // Newton’s First Law
  "The current through a conductor is proportional to the voltage across it", // Ohm’s Law
  "The ratio of sine of incidence angle to sine of refraction angle is constant", // Snell’s Law
  "A changing magnetic field induces an electromotive force (EMF)", // Faraday’s Law
];

// Optional: Correct answer mapping for highlighting after submission
const correctMapping: Record<number, number> = {
  0: 0, // Newton → Desc 1
  1: 1, // Ohm → Desc 2
  2: 2, // Snell → Desc 3
  3: 3, // Faraday → Desc 4
};

export const MatrixMatchQuestionCard = () => {
  const [state, setState] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const toggle = (r: number, c: number) => {
    const key = `${r}-${c}`;
    setState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Card>
      <QuestionHeader
        questionNumber={1}
        question="Match the physical laws in Column I with their correct descriptions in Column II."
      />

      {/* Header Row */}
      <HeaderRow>
        {headers.map((h, idx) =>
          idx === 0 ? (
            <RowLabel key={idx}>{h}</RowLabel>
          ) : (
            <CheckboxCell key={idx}>
              <Typography variant="h5">{`Desc ${idx}`}</Typography>
            </CheckboxCell>
          )
        )}
      </HeaderRow>

      {/* Rows */}
      {rows.map((row, r) => (
        <MatrixRow key={r} disabled={submitted}>
          <RowLabel>{row}</RowLabel>
          {[0, 1, 2, 3].map((c) => (
            <CheckboxCell key={c}>
              <MatchCell
                checked={state[`${r}-${c}`]}
                disabled={submitted}
                onToggle={() => toggle(r, c)}
              />
            </CheckboxCell>
          ))}
        </MatrixRow>
      ))}

      {!submitted && (
        <ActionBar>
          <Button onClick={() => setSubmitted(true)}>Submit Matches</Button>
        </ActionBar>
      )}

      {/* {submitted && (
        <ExplanationBlock>
          <Typography variant="body1">
            Correct Matches:
            <ul>
              <li>Newton’s First Law → {headers[1]}</li>
              <li>Ohm’s Law → {headers[2]}</li>
              <li>Snell’s Law → {headers[3]}</li>
              <li>Faraday’s Law → {headers[4]}</li>
            </ul>
          </Typography>
        </ExplanationBlock>
      )} */}
    </Card>
  );
};
