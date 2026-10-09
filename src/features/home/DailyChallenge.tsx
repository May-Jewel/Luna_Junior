import { useEffect, useMemo, useRef, useState } from 'react';
import { ORDER_PLANETS } from '../learn-hub/data/planets';
import type { Planet } from '../learn-hub/types';
import { SPACE_FACTS } from './data';
import type { DailyChallengeDef } from './data';

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

interface Props {
  challenge: DailyChallengeDef;
  completedToday: boolean;
  onReward: (id: string) => void;
  onOpenTopic: (id: string) => void;
  autoStartSignal?: number;
}

export default function DailyChallenge({
  challenge,
  completedToday,
  onReward,
  onOpenTopic,
  autoStartSignal,
}: Props) {
  const [wasCompletedAtStart] = useState(completedToday);
  const [phase, setPhase] = useState<'intro' | 'play' | 'done'>('intro');
  const [pool, setPool] = useState<Planet[]>(() => shuffle(ORDER_PLANETS));
  const [placed, setPlaced] = useState<string[]>([]);
  const [wrongId, setWrongId] = useState<string | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const fact = useMemo(
    () => SPACE_FACTS.find((f) => f.topicId === challenge.relatedTopicId),
    [challenge.relatedTopicId],
  );

  const orderDone = placed.length === ORDER_PLANETS.length;

  function start() {
    setPhase('play');
    if (challenge.kind === 'order') {
      setPool(shuffle(ORDER_PLANETS));
      setPlaced([]);
      setWrongId(null);
    } else {
      setQIndex(0);
      setSelected(null);
      setCorrectCount(0);
    }
  }

  function finishOrder() {
    setPhase('done');
    onReward(challenge.id);
  }

  function pickPlanet(planet: Planet) {
    if (placed.includes(planet.id)) return;
    if (planet.order === placed.length + 1) {
      const next = [...placed, planet.id];
      setPlaced(next);
      if (next.length === ORDER_PLANETS.length) {
        window.setTimeout(finishOrder, 400);
      }
    } else {
      setWrongId(planet.id);
      window.setTimeout(() => setWrongId(null), 600);
    }
  }

  const lastSignal = useRef(0);
  useEffect(() => {
    if (autoStartSignal && autoStartSignal !== lastSignal.current) {
      lastSignal.current = autoStartSignal;
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStartSignal]);

  const questions = challenge.questions ?? [];
  const question = questions[qIndex];
  const answered = selected !== null;

  function choose(i: number) {
    if (answered) return;
    setSelected(i);
    if (i === question.correctIndex) setCorrectCount((c) => c + 1);
  }

  function nextQuestion() {
    if (qIndex + 1 < questions.length) {
      setQIndex(qIndex + 1);
      setSelected(null);
    } else {
      setPhase('done');
      onReward(challenge.id);
    }
  }

  const earnedReward = phase === 'done' && !wasCompletedAtStart;

  return (
    <section className="daily-challenge panel" id="daily" aria-labelledby="daily-title">
      <div className="daily-head">
        <span className="daily-flag">📅 Daily Space Challenge</span>
        {completedToday ? (
          <span className="tag discovered">✓ Completed today</span>
        ) : (
          <span className="tag quiz">Ready</span>
        )}
      </div>

      <h2 id="daily-title">{challenge.title}</h2>
      <p className="daily-desc">{challenge.description}</p>

      <div className="daily-meta">
        <span className="meta-chip">
          <strong>Difficulty</strong> {challenge.difficulty}
        </span>
        <span className="meta-chip">
          <strong>Time</strong> ~{challenge.minutes} min
        </span>
        <span className="meta-chip xp">
          <strong>Reward</strong> +{challenge.xp} XP
        </span>
      </div>

      {phase === 'intro' ? (
        <div className="daily-actions">
          <button className="btn" onClick={start}>
            {completedToday ? '↻ Replay Challenge' : '▶ Start Challenge'}
          </button>
          {challenge.relatedTopicId ? (
            <button
              className="btn ghost"
              onClick={() => onOpenTopic(challenge.relatedTopicId!)}
            >
              📖 Learn the science first
            </button>
          ) : null}
        </div>
      ) : null}

      {phase === 'play' && challenge.kind === 'order' ? (
        <div className="challenge">
          <p>
            Click the planets in order, from the one closest to the Sun to the
            farthest. Correct picks turn green.
          </p>
          <div className="challenge-chips">
            {pool.map((p) => {
              const order = placed.indexOf(p.id);
              return (
                <button
                  key={p.id}
                  className={`challenge-chip ${order >= 0 ? 'done' : ''} ${
                    wrongId === p.id ? 'wrong' : ''
                  }`}
                  onClick={() => pickPlanet(p)}
                  disabled={order >= 0}
                >
                  <span
                    className="orbit-dot"
                    style={{ width: 18, height: 18, background: p.color }}
                  />
                  {order >= 0 ? `${order + 1}. ` : ''}
                  {p.name}
                </button>
              );
            })}
          </div>
          <p className="center-note">
            {orderDone
              ? 'Perfect order!'
              : `Correct so far: ${placed.length} of ${ORDER_PLANETS.length}`}
          </p>
        </div>
      ) : null}

      {phase === 'play' && challenge.kind === 'choice' && question ? (
        <div className="quiz">
          <div className="quiz-progress">
            <span>
              Question {qIndex + 1} of {questions.length}
            </span>
            <span className="quiz-score-mini">{correctCount} correct</span>
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
            <div
              className={`quiz-feedback ${
                selected === question.correctIndex ? 'ok' : 'bad'
              }`}
              role="status"
            >
              <strong>
                {selected === question.correctIndex ? 'Correct! 🎉' : 'Not quite. 💡'}
              </strong>
              <p>{question.explanation}</p>
            </div>
          ) : null}
          <div className="quiz-actions">
            <button className="btn ghost small" onClick={() => setPhase('intro')}>
              Exit
            </button>
            <button
              className="btn small"
              onClick={nextQuestion}
              disabled={!answered}
            >
              {qIndex + 1 < questions.length ? 'Next Question →' : 'Finish →'}
            </button>
          </div>
        </div>
      ) : null}

      {phase === 'done' ? (
        <div className="daily-done" role="status">
          <div className="big">🏅</div>
          <h3>Challenge complete!</h3>
          {earnedReward ? (
            <p className="daily-reward">+{challenge.xp} XP earned. Great work, astronaut!</p>
          ) : (
            <p className="daily-reward muted">
              Reward already claimed today — but replaying is always good practice!
            </p>
          )}
          <div className="daily-actions">
            <button className="btn ghost" onClick={start}>
              ↻ Review Challenge
            </button>
            {challenge.relatedTopicId ? (
              <button
                className="btn ghost"
                onClick={() => onOpenTopic(challenge.relatedTopicId!)}
              >
                📖 Read related topic
              </button>
            ) : null}
            {fact ? (
              <span className="daily-fact-inline">💡 {fact.fact}</span>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
