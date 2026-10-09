import { useEffect, useMemo, useState } from 'react';
import type { GameId, LearnState, Progress } from '../../types';
import { CATEGORIES, TOPICS, TOPIC_MAP, getCategory } from './data/topics';
import TopicCard from './components/TopicCard';
import TopicDetail from './components/TopicDetail';
import SolarSystemExplorer from './components/SolarSystemExplorer';
import {
  ALL_BADGES,
  computeBadges,
  getLevel,
  getRecommendations,
  quizzesCompleted,
} from './utils/learn';
import type { CategoryId } from './types';

type View = 'topics' | 'explorer' | 'discoveries';

interface Props {
  learn: LearnState;
  progress: Progress;
  onOpenGame: (game: GameId, reminder: string) => void;
  onDiscover: (id: string) => void;
  onToggleSave: (id: string) => void;
  onRecordQuiz: (id: string, correct: number) => void;
  onResetLearn: () => void;
  initialTopicId?: string | null;
}

export default function LearnHub({
  learn,
  progress,
  onOpenGame,
  onDiscover,
  onToggleSave,
  onRecordQuiz,
  onResetLearn,
  initialTopicId,
}: Props) {
  const [view, setView] = useState<View>('topics');
  const [openTopicId, setOpenTopicId] = useState<string | null>(
    initialTopicId && TOPIC_MAP[initialTopicId] ? initialTopicId : null,
  );
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CategoryId | 'all'>('all');

  useEffect(() => {
    if (initialTopicId && TOPIC_MAP[initialTopicId]) {
      setOpenTopicId(initialTopicId);
      onDiscover(initialTopicId);
    }
    // Deep-link only needs to react when the requested topic changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTopicId]);

  const discoveredSet = useMemo(() => new Set(learn.discovered), [learn.discovered]);
  const savedSet = useMemo(() => new Set(learn.saved), [learn.saved]);
  const level = getLevel(learn.xp);
  const earnedBadges = useMemo(
    () => new Set(computeBadges(learn, progress)),
    [learn, progress],
  );
  const completedQuizzes = quizzesCompleted(learn);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return TOPICS.filter((t) => {
      const matchesCategory = category === 'all' || t.category === category;
      const matchesQuery =
        q === '' ||
        t.title.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        (getCategory(t.category)?.name.toLowerCase().includes(q) ?? false);
      return matchesCategory && matchesQuery;
    });
  }, [search, category]);

  const recommendations = useMemo(
    () => getRecommendations(learn, progress),
    [learn, progress],
  );

  function openTopic(id: string) {
    setOpenTopicId(id);
    onDiscover(id);
  }

  if (openTopicId && TOPIC_MAP[openTopicId]) {
    return (
      <div className="learn-hub">
        <TopicDetail
          topic={TOPIC_MAP[openTopicId]}
          saved={savedSet.has(openTopicId)}
          quizBest={learn.quizBest[openTopicId]}
          onBack={() => setOpenTopicId(null)}
          onToggleSave={onToggleSave}
          onOpenTopic={openTopic}
          onOpenGame={onOpenGame}
          onQuizFinish={(correct) => onRecordQuiz(openTopicId, correct)}
        />
      </div>
    );
  }

  return (
    <div className="learn-hub">
      <header className="learn-head">
        <div>
          <h1>🔭 Learn Hub</h1>
          <p className="sub">
            Explore space topics, test your knowledge and save your discoveries.
          </p>
        </div>
        <div className="level-card">
          <div className="level-top">
            <span className="level-name">{level.name}</span>
            <span className="level-xp">{learn.xp} XP</span>
          </div>
          <div className="progress-bar">
            <span style={{ width: `${level.progressPct}%` }} />
          </div>
          <span className="level-next">
            {level.nextMin !== null
              ? `${level.xpToNext} XP to next level`
              : 'Top level reached!'}
          </span>
        </div>
      </header>

      <div className="learn-summary" role="group" aria-label="Learning progress summary">
        <div className="stat">
          <strong>{discoveredSet.size}</strong>
          <span>Topics discovered</span>
        </div>
        <div className="stat">
          <strong>{completedQuizzes}</strong>
          <span>Quizzes completed</span>
        </div>
        <div className="stat">
          <strong>{learn.xp}</strong>
          <span>Total XP</span>
        </div>
        <div className="stat">
          <strong>{savedSet.size}</strong>
          <span>Saved discoveries</span>
        </div>
      </div>

      <nav className="learn-tabs" aria-label="Learn Hub sections">
        {(
          [
            ['topics', '📖 Explore Topics'],
            ['explorer', '🪐 Solar System'],
            ['discoveries', '★ My Discoveries'],
          ] as [View, string][]
        ).map(([id, label]) => (
          <button
            key={id}
            className={`learn-tab ${view === id ? 'active' : ''}`}
            onClick={() => setView(id)}
            aria-pressed={view === id}
          >
            {label}
          </button>
        ))}
      </nav>

      {view === 'topics' ? (
        <div className="learn-view">
          {recommendations.length > 0 ? (
            <section className="recommendations">
              <h2>✨ Recommended for You</h2>
              <div className="rec-list">
                {recommendations.map((r) => {
                  const topic = TOPIC_MAP[r.topicId];
                  if (!topic) return null;
                  return (
                    <button
                      key={r.topicId}
                      className="rec-card"
                      onClick={() => openTopic(r.topicId)}
                    >
                      <span className="rec-emoji" aria-hidden="true">
                        {getCategory(topic.category)?.icon}
                      </span>
                      <span className="rec-text">
                        <strong>{topic.title}</strong>
                        <em>{r.reason}</em>
                      </span>
                      <span className="card-cta">Open →</span>
                    </button>
                  );
                })}
              </div>
            </section>
          ) : null}

          <div className="learn-toolbar">
            <div className="search-field">
              <span aria-hidden="true">🔎</span>
              <input
                type="search"
                value={search}
                placeholder="Search topics…"
                aria-label="Search topics"
                onChange={(e) => setSearch(e.target.value)}
              />
              {search ? (
                <button
                  className="search-clear"
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              ) : null}
            </div>
            <div className="category-chips">
              <button
                className={`cat-chip ${category === 'all' ? 'active' : ''}`}
                onClick={() => setCategory('all')}
              >
                All ({TOPICS.length})
              </button>
              {CATEGORIES.map((c) => {
                const count = TOPICS.filter((t) => t.category === c.id).length;
                return (
                  <button
                    key={c.id}
                    className={`cat-chip ${category === c.id ? 'active' : ''}`}
                    onClick={() => setCategory(c.id)}
                  >
                    {c.icon} {c.name} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="topic-grid-cards">
              {filtered.map((t) => (
                <TopicCard
                  key={t.id}
                  topic={t}
                  discovered={discoveredSet.has(t.id)}
                  saved={savedSet.has(t.id)}
                  quizBest={learn.quizBest[t.id]}
                  onOpen={openTopic}
                  onToggleSave={onToggleSave}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="big">🛰️</div>
              <h3>No topics found</h3>
              <p>
                We couldn&apos;t find anything matching your search or filter. Try
                a different word or reset the filters.
              </p>
              <button
                className="btn ghost small"
                onClick={() => {
                  setSearch('');
                  setCategory('all');
                }}
              >
                Clear search &amp; filters
              </button>
            </div>
          )}
        </div>
      ) : null}

      {view === 'explorer' ? (
        <div className="learn-view">
          <SolarSystemExplorer />
        </div>
      ) : null}

      {view === 'discoveries' ? (
        <div className="learn-view">
          <section className="badges-section">
            <h2>🏅 Badges</h2>
            <div className="badge-list">
              {ALL_BADGES.map((b) => {
                const owned = earnedBadges.has(b.id);
                return (
                  <div key={b.id} className={`badge ${owned ? 'owned' : ''}`}>
                    <span className="badge-icon" aria-hidden="true">
                      {owned ? b.icon : '🔒'}
                    </span>
                    <div>
                      <strong>{b.name}</strong>
                      <span>{b.description}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <div className="discoveries-head">
              <h2>★ My Discoveries</h2>
              {learn.saved.length > 0 || learn.discovered.length > 0 ? (
                <button className="btn ghost small" onClick={onResetLearn}>
                  Reset learning progress
                </button>
              ) : null}
            </div>

            {savedSet.size > 0 ? (
              <div className="topic-grid-cards">
                {[...savedSet]
                  .map((id) => TOPIC_MAP[id])
                  .filter(Boolean)
                  .map((t) => (
                    <TopicCard
                      key={t.id}
                      topic={t}
                      discovered={discoveredSet.has(t.id)}
                      saved
                      quizBest={learn.quizBest[t.id]}
                      onOpen={openTopic}
                      onToggleSave={onToggleSave}
                    />
                  ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="big">☆</div>
                <h3>No saved discoveries yet</h3>
                <p>
                  Open any topic and press <strong>Save for Later</strong> to
                  build your own collection of favourite space science.
                </p>
              </div>
            )}

            {discoveredSet.size > 0 ? (
              <>
                <h3 className="discovered-heading">
                  ✓ Discovered topics ({discoveredSet.size})
                </h3>
                <div className="discovered-list">
                  {[...discoveredSet].map((id) => {
                    const t = TOPIC_MAP[id];
                    if (!t) return null;
                    return (
                      <button
                        key={id}
                        className="discovered-pill"
                        onClick={() => openTopic(id)}
                      >
                        {getCategory(t.category)?.icon} {t.title}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : null}
          </section>
        </div>
      ) : null}
    </div>
  );
}
