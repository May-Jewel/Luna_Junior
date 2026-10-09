import { useState } from 'react';
import type { QuizQuestion } from '../types';

interface Props {
  quiz: QuizQuestion[];
  topicTitle: string;
  best?: number;
  onFinish: (correct: number, total: number) => void;
  onClose: () => void;
}

function messageFor(correct: number, total: number): string {
  const ratio = correct / total;
  if (ratio === 1) return 'Perfect score! You really know your space science.';
  if (ratio >= 0.6) return 'Nice work \u2014 a solid result. Try again to reach a perfect score!';
  return 'Good effort! Re-read the facts above, then give it another go.';
}

export default function Quiz({ quiz, topicTitle, best, onFinish, onClose }: Props) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  const question = quiz[index];
  const answered = selected !== null;
  const isCorrect = answered && selected === question.correctIndex;

  function choose(optionIndex: number) {
    if (answered) return;
    setSelected(optionIndex);
    if (optionIndex === question.correctIndex) setCorrect((c) => c + 1);
  }

  function next() {
    if (index + 1 < quiz.length) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      setDone(true);
      onFinish(correct, quiz.length);
    }
  }

  function retry() {
    setIndex(0);
    setSelected(null);
    setCorrect(0);
    setDone(false);
  }

  if (done) {
    const perfect = correct === quiz.length;
    return (
      <div className="quiz quiz-done">
        <div className={`quiz-score ${perfect ? 'perfect' : ''}`}>
          {correct}/{quiz.length}
        </div>
        <h4>{perfect ? 'All correct!' : 'Quiz complete'}</h4>
        <p>{messageFor(correct, quiz.length)}</p>
        {best !== undefined && best > correct ? (
          <p className="quiz-best-note">
            Your best score on this quiz is still {best}/{quiz.length}.
          </p>
        ) : null}
        <div className="result-actions">
          <button className="btn small" onClick={retry}>
            ↻ Retry Quiz
          </button>
          <button className="btn ghost small" onClick={onClose}>
            Back to Topic
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz">
      <div className="quiz-progress">
        <span>
          Question {index + 1} of {quiz.length} · {topicTitle}
        </span>
        <span className="quiz-score-mini">
          {correct} correct
        </span>
      </div>

      <h4 className="quiz-question">{question.question}</h4>

      <div className="quiz-options">
        {question.options.map((opt, i) => {
          let cls = 'quiz-option';
          if (answered && i === question.correctIndex) cls += ' correct';
          else if (answered && i === selected) cls += ' wrong';
          return (
            <button
              key={i}
              type="button"
              className={cls}
              onClick={() => choose(i)}
              disabled={answered}
            >
              <span className="quiz-option-key">
                {String.fromCharCode(65 + i)}
              </span>
              <span>{opt}</span>
              {answered && i === question.correctIndex ? (
                <span className="quiz-mark">✓</span>
              ) : null}
              {answered && i === selected && i !== question.correctIndex ? (
                <span className="quiz-mark">✕</span>
              ) : null}
            </button>
          );
        })}
      </div>

      {answered ? (
        <div className={`quiz-feedback ${isCorrect ? 'ok' : 'bad'}`} role="status">
          <strong>{isCorrect ? 'Correct! 🎉' : 'Not quite. 💡'}</strong>
          <p>{question.explanation}</p>
        </div>
      ) : null}

      <div className="quiz-actions">
        <button className="btn ghost small" onClick={onClose}>
          Exit Quiz
        </button>
        <button className="btn small" onClick={next} disabled={!answered}>
          {index + 1 < quiz.length ? 'Next Question →' : 'See Results →'}
        </button>
      </div>
    </div>
  );
}
