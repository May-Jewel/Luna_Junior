import { getCategory } from '../data/topics';
import type { Topic } from '../types';
import TopicArt from './TopicArt';

interface Props {
  topic: Topic;
  discovered: boolean;
  saved: boolean;
  quizBest?: number;
  onOpen: (id: string) => void;
  onToggleSave: (id: string) => void;
}

export default function TopicCard({
  topic,
  discovered,
  saved,
  quizBest,
  onOpen,
  onToggleSave,
}: Props) {
  const category = getCategory(topic.category);

  return (
    <div className="topic-card">
      <button
        type="button"
        className="topic-card-open"
        onClick={() => onOpen(topic.id)}
        aria-label={`Open topic: ${topic.title}`}
      >
        <div className="topic-card-art">
          <TopicArt visual={topic.visual} hue={topic.hue} />
        </div>
        <span className="topic-chip">
          {category?.icon} {category?.name}
        </span>
        <h3>{topic.title}</h3>
        <p>{topic.summary}</p>
        <div className="topic-card-meta">
          {discovered ? (
            <span className="tag discovered">✓ Discovered</span>
          ) : (
            <span className="tag">New</span>
          )}
          {topic.quiz ? (
            <span className="tag quiz">
              {quizBest !== undefined
                ? `Quiz ${quizBest}/${topic.quiz.length}`
                : 'Quiz'}
            </span>
          ) : null}
        </div>
      </button>
      <button
        type="button"
        className={`topic-save ${saved ? 'on' : ''}`}
        onClick={() => onToggleSave(topic.id)}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${topic.title} from discoveries` : `Save ${topic.title}`}
        title={saved ? 'Saved to My Discoveries' : 'Save to My Discoveries'}
      >
        {saved ? '★' : '☆'}
      </button>
    </div>
  );
}
