import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./styles/index.css";

/**
 * Enhanced Assessment Page (10x upgrade)
 * - Sidebar question palette with statuses (answered, flagged, review)
 * - Keyboard shortcuts: Left/Right arrows, F to toggle flag, B to bookmark, Ctrl/Cmd+S to save
 * - Fullscreen exam mode
 * - Dark mode toggle
 * - Autosave indicator + last saved time
 * - Skeleton loader state
 * - Simple MCQ organism example (single-select)
 *
 * This is still UI-first; integrate with your data layer later.
 */

// Mock questions (replace with real data)
const SAMPLE_QUESTIONS = Array.from({ length: 40 }).map((_, i) => ({
  id: i + 1,
  type: i % 6 === 0 ? "saq" : "mcq",
  marks: i % 3 === 0 ? 2 : 1,
  stem: `This is sample question ${i + 1}. Please choose the best option.`,
  options:
    i % 6 === 0
      ? []
      : [
          { id: "a", text: "Option A" },
          { id: "b", text: "Option B" },
          { id: "c", text: "Option C" },
          { id: "d", text: "Option D" },
        ],
}));

const formatTime = (d: Date) =>
  `${d.getHours().toString().padStart(2, "0")}:${d
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")}`;

const QuestionListPage: React.FC = () => {
  const [questions] = useState(SAMPLE_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | null>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [bookmarked, setBookmarked] = useState<Record<number, boolean>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Derived
  const total = questions.length;
  const completedCount = useMemo(
    () => Object.values(answers).filter(Boolean).length,
    [answers]
  );

  useEffect(() => {
    // Simulate initial loading
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  // Autosave every 12s (UI-only demo)
  useEffect(() => {
    const id = setInterval(() => {
      // perform quick UI autosave (simulate)
      setIsSaving(true);
      setTimeout(() => {
        setLastSavedAt(new Date());
        setIsSaving(false);
      }, 450);
    }, 12000);
    return () => clearInterval(id);
  }, []);

  // Keyboard shortcuts
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentIndex((p) => Math.min(p + 1, total - 1));
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((p) => Math.max(p - 1, 0));
      } else if (e.key.toLowerCase() === "f") {
        // toggle flag
        setFlagged((prev) => ({ ...prev, [questions[currentIndex].id]: !prev[questions[currentIndex].id] }));
      } else if (e.key.toLowerCase() === "b") {
        setBookmarked((prev) => ({ ...prev, [questions[currentIndex].id]: !prev[questions[currentIndex].id] }));
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        // manual save
        setIsSaving(true);
        setTimeout(() => {
          setLastSavedAt(new Date());
          setIsSaving(false);
        }, 500);
      }
    },
    [currentIndex, questions, total]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    const el = document.documentElement;
    if (!fullscreen) {
      if (el.requestFullscreen) el.requestFullscreen();
      else if ((el as any).webkitRequestFullscreen) (el as any).webkitRequestFullscreen();
      setFullscreen(true);
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if ((document as any).webkitExitFullscreen) (document as any).webkitExitFullscreen();
      setFullscreen(false);
    }
  }, [fullscreen]);

  // Dark mode add class
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [darkMode]);

  const goto = (index: number) => {
    setCurrentIndex(index);
    // scroll main into view if mobile
    const main = document.querySelector(".assessment-main");
    if (main) (main as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const saveAnswer = (qId: number, value: string | null) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  // MCQ option click
  const handleOptionClick = (qId: number, optionId: string) => {
    saveAnswer(qId, optionId);
  };

  // simple "save & next" action
  const saveAndNext = () => {
    const id = questions[currentIndex].id;
    // if unanswered, mark as blank (null stays)
    setIsSaving(true);
    setTimeout(() => {
      setLastSavedAt(new Date());
      setIsSaving(false);
      setCurrentIndex((p) => Math.min(p + 1, total - 1));
    }, 350);
  };

  // sample renderers
  const renderMCQ = (q: typeof SAMPLE_QUESTIONS[number]) => {
    const selected = answers[q.id] ?? null;
    return (
      <div className="mcq">
        <div className="options-grid" role="list" aria-label="MCQ options">
          {q.options.map((opt) => (
            <button
              key={opt.id}
              className={`option ${selected === opt.id ? "selected" : ""}`}
              onClick={() => handleOptionClick(q.id, opt.id)}
              aria-pressed={selected === opt.id}
            >
              <span className="option-radio" aria-hidden />
              <span className="option-text">{opt.text}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderSAQ = (q: typeof SAMPLE_QUESTIONS[number]) => {
    return (
      <div className="saq">
        <textarea
          placeholder="Type your short answer here..."
          value={answers[q.id] ?? ""}
          onChange={(e) => saveAnswer(q.id, e.target.value)}
          className="saq-input"
          rows={4}
        />
      </div>
    );
  };

  const currentQ = questions[currentIndex];

  return (
    <div className="assessment-container advanced">
      {/* Header */}
      <header className="assessment-header advanced-header">
        <div className="header-left">
          <h1 className="assessment-title">Assessment</h1>
          <p className="assessment-sub">Mock Test • {total} Questions</p>
        </div>

        <div className="header-right">
          <div className="header-controls">
            <button
              className={`icon-btn ${flagged[currentQ.id] ? "active" : ""}`}
              title={flagged[currentQ.id] ? "Flagged" : "Flag Question (F)"}
              onClick={() => setFlagged((p) => ({ ...p, [currentQ.id]: !p[currentQ.id] }))}
              aria-pressed={!!flagged[currentQ.id]}
            >
              ⚑
            </button>

            <button
              className={`icon-btn ${bookmarked[currentQ.id] ? "active" : ""}`}
              title={bookmarked[currentQ.id] ? "Bookmarked (B)" : "Bookmark (B)"}
              onClick={() => setBookmarked((p) => ({ ...p, [currentQ.id]: !p[currentQ.id] }))}
              aria-pressed={!!bookmarked[currentQ.id]}
            >
              ★
            </button>

            <button className="icon-btn" title="Toggle fullscreen" onClick={toggleFullscreen}>
              ⤢
            </button>

            <button
              className="icon-btn"
              title="Toggle dark mode"
              onClick={() => setDarkMode((s) => !s)}
              aria-pressed={darkMode}
            >
              {darkMode ? "🌙" : "☀️"}
            </button>
          </div>

          <div className="timer-box small">
            <div className="timer-value">00:{String(59 - (currentIndex % 60)).padStart(2, "0")}</div>
            <div className="timer-label">Remaining</div>
          </div>
        </div>
      </header>

      {/* Body: Sidebar + Main */}
      <div className="assessment-body">
        {/* Sidebar navigator */}
        <aside className="palette" aria-label="Question palette">
          <div className="palette-header">
            <div className="palette-summary">
              <strong>{completedCount}</strong>
              <span> answered</span>
            </div>
            <div className="palette-actions">
              <button className="small" onClick={() => goto(0)}>Start</button>
              <button className="small" onClick={() => goto(total - 1)}>End</button>
            </div>
          </div>

          <div className="palette-grid" role="list">
            {questions.map((q, idx) => {
              const status = answers[q.id] ? "answered" : flagged[q.id] ? "flagged" : "unanswered";
              return (
                <button
                  key={q.id}
                  className={`palette-item ${idx === currentIndex ? "active" : ""} ${status}`}
                  onClick={() => goto(idx)}
                  aria-current={idx === currentIndex}
                >
                  {q.id}
                </button>
              );
            })}
          </div>

          <div className="legend">
            <span><span className="legend-dot answered" />Answered</span>
            <span><span className="legend-dot flagged" />Flagged</span>
            <span><span className="legend-dot unanswered" />Unanswered</span>
          </div>
        </aside>

        {/* Main */}
        <main className="assessment-main" aria-live="polite">
          <div className="question-meta">
            <div className="meta-left">
              <span className="question-number">Q{currentQ.id}</span>
              <span className="question-type-tag">{currentQ.type.toUpperCase()} • {currentQ.marks} Mark(s)</span>
            </div>

            <div className="meta-right">
              <div className="save-indicator">
                {isSaving ? <span className="saving">Saving…</span> : <span className="saved">Saved</span>}
                {lastSavedAt && <span className="last-saved"> • {formatTime(lastSavedAt)}</span>}
              </div>
            </div>
          </div>

          <div className="question-box">
            {loading ? (
              <div className="skeleton">
                <div className="skeleton-line short" />
                <div className="skeleton-line long" />
                <div className="skeleton-block" />
              </div>
            ) : (
              <p className="question-text">{currentQ.stem}</p>
            )}

            <div className="question-tools">
              <button className="tool-btn" onClick={() => setAnswers((p) => ({ ...p, [currentQ.id]: null }))}>Clear</button>
              <button className="tool-btn" onClick={() => setFlagged((p) => ({ ...p, [currentQ.id]: !p[currentQ.id] }))}>
                {flagged[currentQ.id] ? "Unflag" : "Flag"}
              </button>
              <button className="tool-btn" onClick={() => setBookmarked((p) => ({ ...p, [currentQ.id]: !p[currentQ.id] }))}>
                {bookmarked[currentQ.id] ? "Unbookmark" : "Bookmark"}
              </button>
            </div>
          </div>

          <section className="question-body">
            {loading ? (
              <div className="skeleton-options">
                <div className="skeleton-line" />
                <div className="skeleton-line" />
                <div className="skeleton-line" />
                <div className="skeleton-line" />
              </div>
            ) : currentQ.type === "mcq" ? (
              renderMCQ(currentQ)
            ) : (
              renderSAQ(currentQ)
            )}
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="assessment-footer">
        <div className="footer-left">
          <button className="btn secondary" onClick={() => setCurrentIndex((p) => Math.max(p - 1, 0))}>
            ← Previous
          </button>
          <button className="btn" onClick={saveAndNext}>
            Save & Next →
          </button>
        </div>

        <div className="footer-right">
          <div className="progress-mini" aria-hidden>
            {completedCount}/{total} answered
          </div>
          <button
            className="btn danger"
            onClick={() => {
              if (confirm("Submit test? You can't change answers afterward.")) {
                alert("Test submitted (demo).");
              }
            }}
          >
            Submit Test
          </button>
        </div>
      </footer>
    </div>
  );
};

export default QuestionListPage;
