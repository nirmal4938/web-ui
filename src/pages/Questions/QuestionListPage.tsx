import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import QuestionCard from "@/components/organisms/Question/QuestionCard";
import { defaultTheme } from "@/theme/theme";

const PageWrapper = styled.div`display:flex; flex-direction:column; padding:${({ theme })=>theme.spacing(4)}; min-height:100vh;`;
const TopBar = styled.div`display:flex; flex-direction:column; gap:${({ theme })=>theme.spacing(2)}; margin-bottom:${({ theme })=>theme.spacing(3)};
  @media(min-width:768px){flex-direction:row; justify-content:space-between; align-items:center;}
`;
const ProgressBar = styled.div`height:10px;width:100%; background:${({ theme })=>theme.BG_GREY}; border-radius:${({ theme })=>theme.radius.sm}; overflow:hidden;`;
const Progress = styled.div<{ progress: number }>`height:100%; width:${({ progress })=>progress}%; background:${({ theme })=>theme.CTA_COLOR}; transition:width 0.3s ease;`;
const QuizWrapper = styled.div`display:flex; flex-direction:column; gap:${({ theme })=>theme.spacing(3)};`;
const TimerWrapper = styled.div`font-weight:600;color:${({ theme })=>theme.CTA_COLOR_ALERT};`;
const RecommendationPanel = styled.div`margin-top:${({ theme })=>theme.spacing(4)}; padding:${({ theme })=>theme.spacing(3)}; border:1px solid ${({ theme })=>theme.CONTENT_BORDER}; border-radius:${({ theme })=>theme.radius.md}; background:${({ theme })=>theme.CONTENT_CARD}; min-height:80px;`;

interface Question { id:string; question:string; topic:string; difficulty:"Easy"|"Medium"|"Hard"; options:string[]; correctOption:string; }
const PAGE_TIME = 30;
const MOCK_QUESTIONS: Question[] = [
  { id:"q1", question:"What is the capital of France?", topic:"Geography", difficulty:"Easy", options:["Paris","Rome","Madrid","Berlin"], correctOption:"Paris" },
  { id:"q2", question:"What is 15 × 12?", topic:"Math", difficulty:"Medium", options:["170","180","160","190"], correctOption:"180" },
  { id:"q3", question:"Who wrote 'Hamlet'?", topic:"Literature", difficulty:"Medium", options:["Shakespeare","Dickens","Tolstoy","Hemingway"], correctOption:"Shakespeare" },
  { id:"q4", question:"Solve: ∫ x dx", topic:"Math", difficulty:"Hard", options:["x","x²/2 + C","1/x","ln(x)"], correctOption:"x²/2 + C" },
];

const MemoizedQuestionCard = React.memo(QuestionCard);

// --- Fully Independent Timer ---
interface TimerProps { time:number; onTimeout:()=>void; keyProp:number; }
const Timer: React.FC<TimerProps> = ({ time, onTimeout, keyProp }) => {
  const [timeLeft, setTimeLeft] = useState(time);
  const callbackRef = useRef(onTimeout);
  callbackRef.current = onTimeout;

  useEffect(() => {
    setTimeLeft(time);
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if(prev <= 1){ callbackRef.current(); return time; }
        return prev-1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [time, keyProp]); // keyProp changes on question change

  return <TimerWrapper>Time Left: {timeLeft}s</TimerWrapper>;
};

// --- Main Component ---
const QuestionListPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState<Question|null>(null);
  const [recommendations, setRecommendations] = useState<Question[]>([]);
  const [currentDifficulty, setCurrentDifficulty] = useState<"Easy"|"Medium"|"Hard">("Medium");

  const questionsRef = useRef<Question[]>([]);
  const currentDifficultyRef = useRef<"Easy"|"Medium"|"Hard">("Medium");

  useEffect(() => { 
    setQuestions(MOCK_QUESTIONS); 
    questionsRef.current = MOCK_QUESTIONS;
  }, []);

  const getRecommendations = useCallback((current:Question)=>questionsRef.current.filter(q=>q.id!==current.id).slice(0,2), []);

  const computeNextDifficulty = useCallback((prevDiff:"Easy"|"Medium"|"Hard", correct:boolean):"Easy"|"Medium"|"Hard"=> {
    if(correct) return prevDiff==="Easy"?"Medium":prevDiff==="Medium"?"Hard":"Hard";
    return prevDiff==="Hard"?"Medium":prevDiff==="Medium"?"Easy":"Easy";
  }, []);

  const getNextQuestion = useCallback((correct:boolean):Question|null=>{
    if(!selectedQuestion) return null;
    const nextDiff = computeNextDifficulty(currentDifficultyRef.current, correct);
    const remaining = questionsRef.current.filter(q=>q.difficulty===nextDiff && q.id!==selectedQuestion.id);
    return remaining[0] || questionsRef.current.find(q=>q.id!==selectedQuestion.id) || null;
  }, [selectedQuestion, computeNextDifficulty]);

  const handleAnswer = useCallback((correct:boolean)=>{
    const nextQuestion = getNextQuestion(correct);
    setScore(prev=>correct?prev+1:prev);
    if(nextQuestion){
      setSelectedQuestion(nextQuestion);
      setCurrentIndex(questionsRef.current.indexOf(nextQuestion));
      setRecommendations(getRecommendations(nextQuestion));
      const nextDiff = computeNextDifficulty(currentDifficultyRef.current, correct);
      setCurrentDifficulty(nextDiff);
      currentDifficultyRef.current = nextDiff; // update ref for timer
    } else { setSelectedQuestion(null); }
  }, [getNextQuestion, getRecommendations, computeNextDifficulty]);

  useEffect(() => {
    if(!questions.length) return;
    const first = questions.find(q=>q.difficulty===currentDifficulty) || questions[0];
    setSelectedQuestion(first);
    setCurrentIndex(questions.indexOf(first));
    setRecommendations(getRecommendations(first));
    currentDifficultyRef.current = currentDifficulty;
  }, [questions]);

  const progress = useMemo(()=>((currentIndex+1)/questions.length)*100,[currentIndex,questions.length]);

  if(!questions.length || !selectedQuestion) return <div>Loading questions...</div>;

  return (
    <ThemeProvider theme={defaultTheme}>
      <PageWrapper>
        <TopBar>
          <div>Quiz Mode: Question {currentIndex+1} of {questions.length} | Score: {score} | Difficulty: {currentDifficulty}</div>
          <ProgressBar><Progress progress={progress}/></ProgressBar>
          <Timer time={PAGE_TIME} onTimeout={()=>handleAnswer(false)} keyProp={currentIndex}/>
        </TopBar>

        {selectedQuestion ? (
          <QuizWrapper>
            <MemoizedQuestionCard {...selectedQuestion} onAnswer={handleAnswer} timeLimit={PAGE_TIME}/>
            <RecommendationPanel>
              <h4>AI Recommended Questions:</h4>
              <ul>
                {recommendations.map(r=><li key={r.id}>{r.question} ({r.topic} - {r.difficulty})</li>)}
              </ul>
            </RecommendationPanel>
          </QuizWrapper>
        ) : (
          <div><h3>Quiz Completed!</h3><p>Your Score: {score}/{questions.length}</p></div>
        )}
      </PageWrapper>
    </ThemeProvider>
  );
};

export default QuestionListPage;
