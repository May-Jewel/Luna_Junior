import { useState } from 'react';
import { TOPIC_MAP, getCategory } from '../data/topics';
import type { MissionLink, Topic } from '../types';
import Quiz from './Quiz';
import TopicArt from './TopicArt';

interface Props {
  topic: Topic;
  saved: boolean;
  quizBest?: number;
  onBack: () => void;
  onToggleSave: (id: string) => void;
  onOpenTopic: (id: string) => void;
  onOpenGame: (game: MissionLink['game'], reminder: string) => void;
  onQuizFinish: (correct: number, total: number) => void;
}

export default function TopicDetail({
  topic,
  saved,
  quizBest,
  onBack,
  onToggleSave,
  onOpenTopic,
  onOpenGame,
  onQuizFinish,
}: Props) {
  const [quizOpen, setQuizOpen] = useState(false);
  const category = getCategory(topic.category);
  const related = topic.relatedTopicId ? TOPIC_MAP[topic.relatedTopicId] : undefined;

  return (
    <div className="topic-detail">
      <button className="btn ghost small topic-back" onClick={onBack}>
        ← Back to Learn Hub
      </button>

      <div className="topic-hero">
        <div className="topic-hero-art">
          <TopicArt visual={topic.visual} hue={topic.hue} />
        </div>
        <div className="topic-hero-copy">
          <span className="topic-chip">
            {category?.icon} {category?.name}
          </span>
          <h2>{topic.title}</h2>
          <p className="topic-summary">{topic.summary}</p>
          <div className="topic-hero-actions">
            <button
              className={`btn small ${saved ? 'blue' : ''}`}
              onClick={() => onToggleSave(topic.id)}
              aria-pressed={saved}
            >
              {saved ? '★ Saved' : '☆ Save for Later'}
            </button>
            {topic.mission ? (
              <button
                className="btn ghost small"
                onClick={() => onOpenGame(topic.mission!.game, topic.mission!.reminder)}
              >
                🚀 {topic.mission.label}
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="topic-grid">
        <section className="topic-block">
          <h3>🔬 Three Key Facts</h3>
          <ul className="fact-list">
            {topic.facts.map((fact, i) => (
              <li key={i}>{fact}</li>
            ))}
          </ul>
        </section>

        <section className="topic-block dyk">
          <h3>💡 Did You Know?</h3>
          <p>{topic.didYouKnow}</p>
        </section>

        <section className="topic-block">
          <h3>🌍 Why It Matters</h3>
          <p>{topic.whyItMatters}</p>
        </section>

        <section className="topic-block">
          <h3>🧭 Keep Exploring</h3>
          {related ? (
            <button
              className="related-link"
              onClick={() => onOpenTopic(related.id)}
            >
              <span className="related-art">
                <TopicArt visual={related.visual} hue={related.hue} />
              </span>
              <span>
                <strong>Related topic</strong>
                <em>{related.title}</em>
              </span>
              <span className="card-cta">Open →</span>
            </button>
          ) : (
            <p>Explore the Solar System tab to see where these worlds orbit.</p>
          )}
        </section>
      </div>

      {topic.quiz ? (
        <section className="topic-block quiz-block">
          <h3>🎓 Test Your Knowledge</h3>
          {!quizOpen ? (
            <>
              <p>
                Answer {topic.quiz.length} quick questions. You&apos;ll get
                instant feedback and a short explanation for every answer.
              </p>
              {quizBest !== undefined ? (
                <p className="quiz-best-note">
                  Your best score so far: {quizBest}/{topic.quiz.length}
                </p>
              ) : null}
              <button className="btn small" onClick={() => setQuizOpen(true)}>
                {quizBest !== undefined ? 'Retake Quiz' : 'Start Quiz'}
              </button>
            </>
          ) : (
            <Quiz
              quiz={topic.quiz}
              topicTitle={topic.title}
              best={quizBest}
              onFinish={onQuizFinish}
              onClose={() => setQuizOpen(false)}
            />
          )}
        </section>
      ) : null}
    </div>
  );
}
