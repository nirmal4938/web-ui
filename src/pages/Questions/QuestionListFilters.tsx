import React, { useState, useMemo } from "react";
import styled from "styled-components";

/* -------------------------- Styled UI -------------------------- */
const FilterBox = styled.div`
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.CONTENT_BORDER};
  background: ${({ theme }) => theme.CONTENT_CARD};
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 24px;
  }
`;

const Select = styled.select`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.CONTENT_BORDER};
`;

const Button = styled.button`
  padding: 10px 16px;
  background: ${({ theme }) => theme.CTA_COLOR};
  color: white;
  border-radius: 8px;
  border: 0;
  cursor: pointer;
  font-weight: 600;
`;

/* ---------------------------- Props ----------------------------- */
export interface Filters {
  competition: string;
  subject: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard" | "";
}

interface Props {
  onApply: (filters: Filters) => void;
}

/* ------------------------- Mock Lists --------------------------- */
const COMPETITIONS = ["General", "NEET", "JEE", "SSC", "UPSC"];

const SUBJECT_MAP: Record<string, string[]> = {
  General: ["Math", "Geography", "History", "Reasoning"],
  NEET: ["Biology", "Botany", "Zoology", "Physics", "Chemistry"],
  JEE: ["Math", "Physics", "Chemistry"],
  SSC: ["Reasoning", "Math", "English", "GK"],
  UPSC: ["Economy", "Polity", "History", "Geography", "Environment"]
};

const TOPIC_MAP: Record<string, string[]> = {
  Math: ["Algebra", "Arithmetic", "Calculus"],
  Geography: ["World", "India"],
  Biology: ["Cell Biology", "Genetics", "Ecology", "Human Physiology"],
  Physics: ["Mechanics", "Thermo", "Optics"],
  Chemistry: ["Organic", "Inorganic", "Physical"],
  Reasoning: ["Coding-Decoding", "Series"],
};

/* ------------------------- Component ----------------------------- */
const QuestionListFilters: React.FC<Props> = ({ onApply }) => {

  const [competition, setCompetition] = useState("General");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState<Filters["difficulty"]>("");

  const subjectOptions = useMemo(() => SUBJECT_MAP[competition] || [], [competition]);
  const topicOptions = useMemo(() => TOPIC_MAP[subject] || [], [subject]);

  return (
    <FilterBox>
      <Row>
        <label>Competition:</label>
        <Select
          value={competition}
          onChange={(e) => {
            setCompetition(e.target.value);
            setSubject("");
            setTopic("");
          }}
        >
          {COMPETITIONS.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </Select>
      </Row>

      <Row>
        <label>Subject:</label>
        <Select
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
            setTopic("");
          }}
        >
          <option value="">-- Select Subject --</option>
          {subjectOptions.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </Select>
      </Row>

      <Row>
        <label>Topic:</label>
        <Select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        >
          <option value="">-- Select Topic --</option>
          {topicOptions.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </Select>
      </Row>

      <Row>
        <label>Difficulty:</label>
        <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value as any)}>
          <option value="">Any</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </Select>
      </Row>

      <Button
        onClick={() =>
          onApply({ competition, subject, topic, difficulty })
        }
      >
        Apply Filters
      </Button>
    </FilterBox>
  );
};

export default QuestionListFilters;
