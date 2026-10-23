import React, { useState, useEffect } from 'react';
import { Timer, CheckCircle, AlertCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import Button from '@/components/atoms/Button/Button';
// Importing your question UI variants from imports
import { SCQ } from '@/pages/Questions/SCQPage';
import { MCQ } from '@/pages/Questions/MCQPage';
import { NAT } from '@/pages/Questions/NATPage';
import { MatrixMatch } from '@/pages/Questions/MatrixMatchPage';

// Mock Data structure mirroring your imported question types
interface Question {
  id: string;
  type: 'SCQ' | 'MCQ' | 'NAT' | 'MATRIX';
  title: string;
  statement: string;
  options?: string[];
}

const MOCK_QUESTIONS: Question[] = [
  {
    id: 'q1',
    type: 'SCQ',
    title: 'Question 1: Closures',
    statement: 'What is output of a lexical scope closure variable modification?',
    options: ['A', 'B', 'C', 'D'],
  },
  {
    id: 'q2',
    type: 'MCQ',
    title: 'Question 2: CSS Layouts',
    statement: 'Select all valid CSS grid placement configurations.',
    options: ['grid-area', 'grid-template', 'justify-items', 'float-left'],
  },
  {
    id: 'q3',
    type: 'NAT',
    title: 'Question 3: Time Complexity',
    statement:
      'Calculate the numerical execution time complexity value for binary search over 1024 records.',
  },
  {
    id: 'q4',
    type: 'MATRIX',
    title: 'Question 4: React Lifecycles',
    statement: 'Match Hook effects to class equivalents.',
  },
  // Add remaining slots up to 10 for complete mock testing...
];

const PracticeDashboardPage: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(50 * 60); // 50 Minutes in seconds
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // 50-Minute countdown ticking mechanism
  useEffect(() => {
    if (timeLeft <= 0 || isSubmitted) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const activeQuestion = MOCK_QUESTIONS[currentIdx];

  const handleAnswerChange = (questionId: string, answerValue: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerValue }));
  };

  const renderQuestion = () => {
    const commonProps = {
      question: activeQuestion,
      value: answers[activeQuestion.id],
      onChange: (val: any) => handleAnswerChange(activeQuestion.id, val),
    } as any;

    switch (activeQuestion.type) {
      case 'SCQ':
        return <SCQ {...commonProps} />;
      case 'MCQ':
        return <MCQ {...commonProps} />;
      case 'NAT':
        return <NAT {...commonProps} />;
      case 'MATRIX':
        return <MatrixMatch {...commonProps} />;
      default:
        return null;
    }
  };

  const handleSubmitTest = () => {
    setIsSubmitted(true);
    // Hook up Redux actions or dispatch API metrics here
  };

  return (
    <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Upper Status Panel / Main Workspace Column */}
      <div className="lg:col-span-3 space-y-6">
        <div className="flex justify-between items-center bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Frontend Technical Mock Assessment</h1>
            <p className="text-sm text-zinc-500">10 Questions • Advanced Coding Strategy</p>
          </div>

          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-bold border ${timeLeft < 300 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-zinc-50 text-zinc-800 border-zinc-200'}`}
          >
            <Timer className="w-5 h-5" />
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Dynamic Question Renderer Box */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 min-h-[400px] flex flex-col justify-between">
          {!isSubmitted ? (
            <>
              <div>
                <h2 className="text-lg font-semibold mb-2">{activeQuestion.title}</h2>
                <p className="text-zinc-700 dark:text-zinc-300 mb-6">{activeQuestion.statement}</p>

                {/* Switch mapping using imported atomic components */}
                <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800">
                  {renderQuestion()}
                </div>
              </div>

              {/* Navigation Control Toolbar */}
              <div className="flex justify-between items-center pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800">
                <Button
                  variant="outline"
                  onClick={() => setCurrentIdx(p => Math.max(0, p - 1))}
                  disabled={currentIdx === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                </Button>
                <span className="text-sm font-medium text-zinc-500">
                  Page {currentIdx + 1} of {MOCK_QUESTIONS.length}
                </span>
                {currentIdx < MOCK_QUESTIONS.length - 1 ? (
                  <Button variant="outline" onClick={() => setCurrentIdx(p => p + 1)}>
                    Next <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handleSubmitTest}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Submit Examination
                  </Button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12 space-y-4">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
              <h2 className="text-2xl font-bold">Session Submitted Successfully!</h2>
              <p className="text-zinc-500 max-w-md mx-auto">
                Your metrics and code execution blocks have been logged for evaluative grading
                metrics review.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Panel: Question Palette Tracker */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 h-fit">
        <h3 className="font-semibold text-sm uppercase tracking-wider text-zinc-400 mb-4">
          Question Grid Matrix
        </h3>
        <div className="grid grid-cols-5 gap-2">
          {MOCK_QUESTIONS.map((q, idx) => {
            const isAnswered = answers[q.id] !== undefined;
            const isActive = idx === currentIdx;
            return (
              <button
                key={q.id}
                onClick={() => !isSubmitted && setCurrentIdx(idx)}
                className={`h-10 w-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                  isActive
                    ? 'ring-2 ring-blue-600 bg-blue-50 text-blue-700 border border-blue-300 font-bold'
                    : isAnswered
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-200'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        <div className="mt-6 space-y-2 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-blue-100 border border-blue-300 inline-block" />{' '}
            Active Position
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-200 inline-block" />{' '}
            Answer Saved
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-zinc-100 dark:bg-zinc-800 inline-block" /> Unvisited
            / Unsaved
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeDashboardPage;
