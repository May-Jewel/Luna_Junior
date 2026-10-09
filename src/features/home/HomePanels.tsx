import { ALL_BADGES } from '../learn-hub/utils/learn';
import type { Topic } from '../learn-hub/types';
import type { SpaceFact } from './data';

/* ---------------- Mission Control progress panel ---------------- */
interface ProgressPanelProps {
  xp: number;
  levelName: string;
  levelPct: number;
  xpToNext: number;
  missionsCompleted: number;
  missionsTotal: number;
  topicsDiscovered: number;
  topicsTotal: number;
  badgesEarned: number;
  badgesTotal: number;
}

export function ProgressPanel({
  xp,
  levelName,
  levelPct,
  xpToNext,
  missionsCompleted,
  missionsTotal,
  topicsDiscovered,
  topicsTotal,
  badgesEarned,
  badgesTotal,
}: ProgressPanelProps) {
  return (
    <section className="control-panel panel" aria-labelledby="control-title">
      <div className="control-head">
        <div>
          <span className="panel-eyebrow">Mission Control</span>
          <h2 id="control-title">Astronaut Rank: {levelName}</h2>
        </div>
        <span className="rank-badge">{xp} XP</span>
      </div>

      <div className="rank-progress">
        <div className="progress-bar">
          <span style={{ width: `${levelPct}%` }} />
        </div>
        <span className="level-next">
          {xpToNext > 0 ? `${xpToNext} XP to next rank` : 'Top rank reached!'}
        </span>
      </div>

      <div className="control-stats">
        <div className="control-stat">
          <strong>
            {missionsCompleted}
            <em>/{missionsTotal}</em>
          </strong>
          <span>Missions complete</span>
        </div>
        <div className="control-stat">
          <strong>
            {topicsDiscovered}
            <em>/{topicsTotal}</em>
          </strong>
          <span>Topics discovered</span>
        </div>
        <div className="control-stat">
          <strong>
            {badgesEarned}
            <em>/{badgesTotal}</em>
          </strong>
          <span>Badges earned</span>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Achievement showcase ---------------- */
export function BadgeShowcase({ earned }: { earned: Set<string> }) {
  const earnedCount = ALL_BADGES.filter((b) => earned.has(b.id)).length;
  return (
    <section className="achievements" aria-labelledby="badges-title">
      <div className="achievements-head">
        <h2 id="badges-title">🏅 Achievements</h2>
        <span className="pill">
          {earnedCount}/{ALL_BADGES.length} earned
        </span>
      </div>
      <div className="badge-list">
        {ALL_BADGES.map((b) => {
          const owned = earned.has(b.id);
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
  );
}

/* ---------------- Space fact of the day ---------------- */
export function FactOfTheDay({
  fact,
  onOpenTopic,
}: {
  fact: SpaceFact;
  onOpenTopic: (id: string) => void;
}) {
  return (
    <section className="fact-card panel" aria-labelledby="fact-title">
      <span className="panel-eyebrow">💡 Space Fact of the Day</span>
      <p className="fact-main">{fact.fact}</p>
      <p className="fact-explain">{fact.explanation}</p>
      <button className="btn ghost small" onClick={() => onOpenTopic(fact.topicId)}>
        📖 Explore this topic
      </button>
    </section>
  );
}

/* ---------------- Continue your journey ---------------- */
interface ContinueProps {
  isNewPlayer: boolean;
  lastTopic: Topic | null;
  recommended: Topic | null;
  recommendedReason: string | null;
  discoveredCount: number;
  topicsTotal: number;
  onOpenTopic: (id: string) => void;
  onExploreMissions: () => void;
}

export function ContinueJourney({
  isNewPlayer,
  lastTopic,
  recommended,
  recommendedReason,
  discoveredCount,
  topicsTotal,
  onOpenTopic,
  onExploreMissions,
}: ContinueProps) {
  const pct = Math.round((discoveredCount / topicsTotal) * 100);

  if (isNewPlayer) {
    return (
      <section className="continue panel" aria-labelledby="continue-title">
        <span className="panel-eyebrow">🧭 Continue Your Journey</span>
        <h2 id="continue-title">Your first space adventure starts here!</h2>
        <p className="continue-text">
          Pick a mission below or start today&apos;s challenge to earn your first
          XP and badges.
        </p>
        <button className="btn small" onClick={onExploreMissions}>
          Explore Missions
        </button>
      </section>
    );
  }

  return (
    <section className="continue panel" aria-labelledby="continue-title">
      <span className="panel-eyebrow">🧭 Continue Your Journey</span>
      <h2 id="continue-title">Welcome back, astronaut.</h2>

      <div className="continue-bar">
        <div className="progress-bar">
          <span style={{ width: `${pct}%` }} />
        </div>
        <span className="level-next">
          {discoveredCount}/{topicsTotal} topics discovered
        </span>
      </div>

      {lastTopic ? (
        <button className="continue-card" onClick={() => onOpenTopic(lastTopic.id)}>
          <span className="continue-emoji" aria-hidden="true">
            ↺
          </span>
          <span className="continue-copy">
            <strong>Pick up where you left off</strong>
            <em>{lastTopic.title}</em>
          </span>
          <span className="card-cta">Continue →</span>
        </button>
      ) : null}

      {recommended ? (
        <button
          className="continue-card"
          onClick={() => onOpenTopic(recommended.id)}
        >
          <span className="continue-emoji" aria-hidden="true">
            ✨
          </span>
          <span className="continue-copy">
            <strong>Recommended next</strong>
            <em>
              {recommended.title}
              {recommendedReason ? ` — ${recommendedReason}` : ''}
            </em>
          </span>
          <span className="card-cta">Learn →</span>
        </button>
      ) : null}

      <button className="btn ghost small" onClick={onExploreMissions}>
        Go to missions
      </button>
    </section>
  );
}
