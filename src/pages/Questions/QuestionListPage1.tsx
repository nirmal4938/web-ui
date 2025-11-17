import React, { useCallback, useEffect, useMemo, useRef, useReducer } from "react";
import styled, { ThemeProvider } from "styled-components";
import QuestionCard from "@/components/organisms/Question/QuestionCard";
import { defaultTheme } from "@/theme/theme";
import QuestionListFilters, { type Filters } from "./QuestionListFilters";
import './styles/index.css'
/* ----------------------------- Styled components ----------------------------*/
const PageWrapper = styled.div`
  display:flex;
  flex-direction:column;
  padding:${({ theme })=>theme.spacing(4)};
  min-height:100vh;
`;
const TopBar = styled.div`
  display:flex;
  flex-direction:column;
  gap:${({ theme })=>theme.spacing(2)};
  margin-bottom:${({ theme })=>theme.spacing(3)};
  @media(min-width:768px){flex-direction:row; justify-content:space-between; align-items:center;}
`;
const ProgressBar = styled.div`
  height:10px;width:100%; background:${({ theme })=>theme.BG_GREY}; border-radius:${({ theme })=>theme.radius.sm}; overflow:hidden;
`;
const Progress = styled.div<{ progress:number }>`
  height:100%; width:${({ progress })=>progress}%; background:${({ theme })=>theme.CTA_COLOR}; transition:width 300ms ease;
`;
const QuizWrapper = styled.div`display:flex; flex-direction:column; gap:${({ theme })=>theme.spacing(3)};`;
const TimerWrapper = styled.div`font-weight:600;color:${({ theme })=>theme.CTA_COLOR_ALERT};`;
const RecommendationPanel = styled.div`
  margin-top:${({ theme })=>theme.spacing(4)};
  padding:${({ theme })=>theme.spacing(3)};
  border:1px solid ${({ theme })=>theme.CONTENT_BORDER};
  border-radius:${({ theme })=>theme.radius.md};
  background:${({ theme })=>theme.CONTENT_CARD};
  min-height:80px;
`;

/* --------------------------------- Types ----------------------------------*/
interface Question { id:string; question:string; topic:string; difficulty:"Easy"|"Medium"|"Hard"; options:string[]; correctOption:string; }

/* ------------------------------- Mock Data --------------------------------*/
const MOCK_QUESTIONS: Question[] = [
  { id:"q1", question:"What is the capital of France?", topic:"Geography", difficulty:"Easy", options:["Paris","Rome","Madrid","Berlin"], correctOption:"Paris" },
  { id:"q2", question:"What is 15 × 12?", topic:"Math", difficulty:"Medium", options:["170","180","160","190"], correctOption:"180" },
  { id:"q3", question:"Who wrote 'Hamlet'?", topic:"Literature", difficulty:"Medium", options:["Shakespeare","Dickens","Tolstoy","Hemingway"], correctOption:"Shakespeare" },
  { id:"q4", question:"Solve: ∫ x dx", topic:"Math", difficulty:"Hard", options:["x","x²/2 + C","1/x","ln(x)"], correctOption:"x²/2 + C" },
];

const PAGE_TIME = 30; // seconds per question
const SESSION_LENGTH = 10; // max questions per session (adaptive)

/* ---------------------------- Quiz Engine (reducer) -------------------------*/
type State = {
  pool: Question[]; // all available
  askedOrder: string[]; // ids in order asked
  currentId: string | null;
  score: number;
  used: Set<string>; // asked questions
  remainingCount: number; // how many left to ask in session
  completed: boolean;
  lastAnswerCorrect: boolean | null;
  difficulty: "Easy"|"Medium"|"Hard";
};

type Action =
  | { type: 'init'; pool: Question[]; startDifficulty: State['difficulty']; sessionLen:number }
  | { type: 'answer'; correct:boolean }
  | { type: 'timeout' }
  | { type: 'restart' };

const computeNextDifficulty = (prev:"Easy"|"Medium"|"Hard", correct:boolean):"Easy"|"Medium"|"Hard"=>{
  if(correct) return prev==="Easy"?"Medium":prev==="Medium"?"Hard":"Hard";
  return prev==="Hard"?"Medium":prev==="Medium"?"Easy":"Easy";
};

function pickNextQuestion(pool:Question[], used:Set<string>, desiredDifficulty:"Easy"|"Medium"|"Hard"){
  // Priority: unused same difficulty -> unused adjacent difficulty -> any unused -> null
  const byDiff = (d:Question['difficulty'])=>pool.filter(q=>q.difficulty===d && !used.has(q.id));
  const same = byDiff(desiredDifficulty);
  if(same.length) return same[0];
  if(desiredDifficulty === 'Medium'){
    const m = [...byDiff('Easy'), ...byDiff('Hard')];
    if(m.length) return m[0];
  }
  if(desiredDifficulty === 'Easy'){
    const m = byDiff('Medium'); if(m.length) return m[0];
    const h = byDiff('Hard'); if(h.length) return h[0];
  }
  if(desiredDifficulty === 'Hard'){
    const m = byDiff('Medium'); if(m.length) return m[0];
    const e = byDiff('Easy'); if(e.length) return e[0];
  }
  // As last resort, return any unused
  const anyUnused = pool.find(q=>!used.has(q.id));
  return anyUnused || null;
}

function quizReducer(state:State, action:Action):State{
  switch(action.type){
    case 'init':{
      const used = new Set<string>();
      const desired = action.startDifficulty;
      const first = pickNextQuestion(action.pool, used, desired);
      if(!first) return { ...state, pool:action.pool, used, currentId:null, completed:true };
      used.add(first.id);
      return {
        pool: action.pool,
        askedOrder: [first.id],
        currentId: first.id,
        score: 0,
        used,
        remainingCount: action.sessionLen - 1, // first consumed
        completed: false,
        lastAnswerCorrect: null,
        difficulty: action.startDifficulty,
      };
    }
    case 'answer':{
      if(state.completed || !state.currentId) return state;
      const correct = action.correct;
      const newScore = correct ? state.score + 1 : state.score;
      const nextDifficulty = computeNextDifficulty(state.difficulty, correct);
      if(state.remainingCount <= 0){
        return { ...state, score:newScore, lastAnswerCorrect:correct, currentId:null, completed:true, difficulty:nextDifficulty };
      }
      const nextQ = pickNextQuestion(state.pool, state.used, nextDifficulty);
      if(!nextQ){
        return { ...state, score:newScore, lastAnswerCorrect:correct, currentId:null, completed:true, difficulty:nextDifficulty };
      }
      const newUsed = new Set(state.used);
      newUsed.add(nextQ.id);
      return {
        ...state,
        score:newScore,
        lastAnswerCorrect:correct,
        currentId: nextQ.id,
        askedOrder: [...state.askedOrder, nextQ.id],
        used: newUsed,
        remainingCount: state.remainingCount - 1,
        difficulty: nextDifficulty,
      };
    }
    case 'timeout':{
      // treat like incorrect answer
      return quizReducer(state, { type:'answer', correct:false });
    }
    case 'restart':{
      return { ...initialState };
    }
    default: return state;
  }
}

const initialState:State = {
  pool: [], askedOrder: [], currentId:null, score:0, used:new Set(), remainingCount:0, completed:false, lastAnswerCorrect:null, difficulty:"Medium"
};

/* ------------------------------- Timer Component ---------------------------*/
interface TimerProps { time:number; onTimeout:()=>void; resetKey:any; running:boolean }
const Timer:React.FC<TimerProps> = ({ time, onTimeout, resetKey, running })=>{
  const [timeLeft, setTimeLeft] = React.useState(time);
  const timeoutRef = useRef(onTimeout);
  timeoutRef.current = onTimeout;

  // Reset when resetKey changes
  useEffect(()=>{
    setTimeLeft(time);
  }, [time, resetKey]);

  useEffect(()=>{
    if(!running) return;
    if(timeLeft <= 0){
      timeoutRef.current();
      return;
    }
    const id = setInterval(()=>{
      setTimeLeft(prev=>{
        if(prev <= 1){
          // call once and stop
          timeoutRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return ()=> clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, timeLeft]);

  return <TimerWrapper>Time Left: {timeLeft}s</TimerWrapper>;
};

/* ---------------------------- Helper: Recommendations -----------------------*/
function recommendFor(current:Question | null, pool:Question[], used:Set<string>, max=2){
  if(!current) return [] as Question[];
  // score candidates by (topic match) + (difficulty closeness) + (not used)
  const difficultyRank = { 'Easy':0, 'Medium':1, 'Hard':2 } as Record<string,number>;
  const candidates = pool
    .filter(q=>q.id !== current.id)
    .map(q=>{
      const topicScore = q.topic === current.topic ? 2 : 0;
      const diffScore = Math.max(0, 1 - Math.abs(difficultyRank[q.difficulty] - difficultyRank[current.difficulty]));
      const unusedBonus = used && !used.has(q.id) ? 1 : 0;
      const score = topicScore + diffScore + unusedBonus;
      return { q, score };
    })
    .sort((a,b)=>b.score - a.score)
    .slice(0,max)
    .map(x=>x.q);
  return candidates;
}

/* ------------------------------- Main Page ---------------------------------
  - Uses reducer-based engine
  - Safe timer that stops on timeout
  - Recommendation ranking
  - Progress based on asked questions / session length
----------------------------------------------------------------------------*/
const QuestionListPage: React.FC = ()=>{
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const pool = useMemo(()=>MOCK_QUESTIONS, []);

  useEffect(()=>{
    // initialize engine
    dispatch({ type:'init', pool, startDifficulty:'Medium', sessionLen: Math.min(SESSION_LENGTH, pool.length) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentQuestion = useMemo(()=> state.currentId ? state.pool.find(p=>p.id===state.currentId) || null : null, [state.currentId, state.pool]);

  const handleAnswer = useCallback((correct:boolean)=>{
    dispatch({ type:'answer', correct });
  }, []);

  const handleTimeout = useCallback(()=>{
    dispatch({ type:'timeout' });
  }, []);

  // Derived values
  const askedCount = state.askedOrder.length;
  const sessionTotal = Math.min(SESSION_LENGTH, state.pool.length || pool.length);
  const progress = Math.round((askedCount / sessionTotal) * 100);

  const recommendations = useMemo(()=> recommendFor(currentQuestion, state.pool.length ? state.pool : pool, state.used, 2), [currentQuestion, state.pool, pool, state.used]);

  if(!state.pool.length || !currentQuestion) {
    if(state.completed){
      return (
        <ThemeProvider theme={defaultTheme}>
          <PageWrapper>
            <h3>Quiz Completed!</h3>
            <p>Your Score: {state.score}/{sessionTotal}</p>
          </PageWrapper>
        </ThemeProvider>
      );
    }
    return <div>Loading questions...</div>;
  }

return (
    <ThemeProvider theme={defaultTheme}>
      <PageWrapper>
        <QuestionListFilters
  onApply={(filters: Filters) => {
    // filter the pool
    const newPool = MOCK_QUESTIONS.filter(q => {
      const matchCompetition = true; // competition rules come from DB later
      const matchSubject = filters.subject ? q.topic === filters.subject : true;
      const matchTopic = filters.topic ? q.topic === filters.topic : true;
      const matchDifficulty = filters.difficulty ? q.difficulty === filters.difficulty : true;
      return matchCompetition && matchSubject && matchTopic && matchDifficulty;
    });

    dispatch({
      type: "init",
      pool: newPool,
      startDifficulty: "Medium",
      sessionLen: Math.min(SESSION_LENGTH, newPool.length)
    });
  }}
/>
        <TopBar>
          <div>Quiz Mode: Question {askedCount} of {sessionTotal} | Score: {state.score} | Difficulty: {state.difficulty}</div>
          <ProgressBar><Progress progress={progress}/></ProgressBar>
          <Timer time={PAGE_TIME} onTimeout={handleTimeout} resetKey={state.currentId} running={!state.completed} />
        </TopBar>

        <QuizWrapper>
          <QuestionCard
            key={currentQuestion.id}
            {...currentQuestion}
            onAnswer={(correct:boolean)=>handleAnswer(correct)}
            timeLimit={PAGE_TIME}
          />

          <RecommendationPanel>
            <h4>AI Recommended Questions:</h4>
            <ul>
              {recommendations.map(r=>(
                <li key={r.id}>{r.question} ({r.topic} - {r.difficulty})</li>
              ))}
            </ul>
          </RecommendationPanel>
        </QuizWrapper>
      </PageWrapper>
    </ThemeProvider>
);

};

export default QuestionListPage;
