import { useMemo, useState } from 'react';
import type { GameId, LearnState, Progress } from '../types';
import HeroArt from './HeroArt';
import RocketIcon from './RocketIcon';
import RoverIcon from './RoverIcon';
import { TOPICS, TOPIC_MAP } from '../features/learn-hub/data/topics';
import {
  ALL_BADGES,
  computeBadges,
  getLevel,
  getRecommendations,
} from '../features/learn-hub/utils/learn';
import DailyChallenge from '../features/home/DailyChallenge';
import {
  BadgeShowcase,
  ContinueJourney,
  FactOfTheDay,
  ProgressPanel,
} from '../features/home/HomePanels';
import { getDailyChallenge, getSpaceFact } from '../features/home/daily';
import { SPACE_FACTS } from '../features/home/data';

interface Props {
  progress: Progress;
  learn: LearnState;
  completedCount: number;
  dailyCompletedToday: boolean;
  onOpenGame: (game: GameId) => void;
  onOpenLearn: (topicId?: string) => void;
  onDailyReward: (id: string) => void;
  onReset: () => void;
}

export default function Home({
  progress,
  learn,
  completedCount,
  dailyCompletedToday,
  onOpenGame,
  onOpenLearn,
  onDailyReward,
  onReset,
}: Props) {
  const [startSignal, setStartSignal] = useState(0);

  const level = getLevel(learn.xp);
  const earned = useMemo(
    () => new Set(computeBadges(learn, progress)),
    [learn, progress],
  );
  const dailyChallenge = useMemo(() => getDailyChallenge(), []);
  const spaceFact = useMemo(() => getSpaceFact(), []);
  const recommendations = useMemo(
    () => getRecommendations(learn, progress),
    [learn, progress],
  );

  const lastTopic = learn.lastTopicId ? TOPIC_MAP[learn.lastTopicId] ?? null : null;
  const recTopicId = recommendations[0]?.topicId ?? null;
  const recTopic = recTopicId ? TOPIC_MAP[recTopicId] ?? null : null;
  const recReason = recommendations[0]?.reason ?? null;

  const isNewPlayer =
    learn.xp === 0 &&
    learn.discovered.length === 0 &&
    !progress.spacecraft &&
    !progress.rover;

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  function startDaily() {
    scrollTo('daily');
    setStartSignal((n) => n + 1);
  }

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-copy">
          <h1>Your Universe Is Waiting.</h1>
          <p className="subtitle">Learn the science. Complete the mission. Become a space explorer.</p>
          <p className="welcome-line">
            {isNewPlayer
              ? '🌠 Welcome, new recruit — your first adventure begins today.'
              : `🖖 Welcome back, ${level.name}. You've earned ${learn.xp} XP so far.`}
          </p>
          <div className="hero-actions">
            <button className="btn" onClick={startDaily}>
              Start Today&apos;s Challenge
            </button>
            <button className="btn ghost" onClick={() => scrollTo('challenges')}>
              Explore Missions
            </button>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <HeroArt />
        </div>
      </section>

      <DailyChallenge
        challenge={dailyChallenge}
        completedToday={dailyCompletedToday}
        onReward={onDailyReward}
        onOpenTopic={(id) => onOpenLearn(id)}
        autoStartSignal={startSignal}
      />

      <div className="home-grid-2">
        <ProgressPanel
          xp={learn.xp}
          levelName={level.name}
          levelPct={level.progressPct}
          xpToNext={level.xpToNext}
          missionsCompleted={completedCount}
          missionsTotal={2}
          topicsDiscovered={learn.discovered.length}
          topicsTotal={TOPICS.length}
          badgesEarned={earned.size}
          badgesTotal={ALL_BADGES.length}
        />
        <FactOfTheDay fact={spaceFact} onOpenTopic={onOpenLearn} />
      </div>

      <ContinueJourney
        isNewPlayer={isNewPlayer}
        lastTopic={lastTopic}
        recommended={recTopic}
        recommendedReason={recReason}
        discoveredCount={learn.discovered.length}
        topicsTotal={TOPICS.length}
        onOpenTopic={onOpenLearn}
        onExploreMissions={() => scrollTo('challenges')}
      />

      <h2 className="section-title" id="challenges">
        Choose Your Mission
      </h2>
      <div className="game-grid mission-grid">
        <button className="game-card" onClick={() => onOpenGame('spacecraft')}>
          <div className="art">
            <RocketIcon />
          </div>
          <h3>Build Your Spacecraft</h3>
          <p>Design your spacecraft and prepare for launch.</p>
          <div className="game-tags">
            <span className="tag">Easy · ~4 min</span>
          </div>
          <div className="card-meta">
            {progress.spacecraft ? (
              <span className="pill done">Completed</span>
            ) : (
              <span className="pill">Mission 1</span>
            )}
            <span className="card-cta">Play &rarr;</span>
          </div>
        </button>

        <button className="game-card" onClick={() => onOpenGame('rover')}>
          <div className="art">
            <RoverIcon />
          </div>
          <h3>Mars Rover Explorer</h3>
          <p>Navigate Martian terrain and discover scientific targets.</p>
          <div className="game-tags">
            <span className="tag">Medium · ~5 min</span>
          </div>
          <div className="card-meta">
            {progress.rover ? (
              <span className="pill done">Completed</span>
            ) : (
              <span className="pill">Mission 2</span>
            )}
            <span className="card-cta">Play &rarr;</span>
          </div>
        </button>

        <button className="game-card" onClick={() => onOpenLearn()}>
          <div className="art">
            <span className="learn-card-art" aria-hidden="true">
              🪐
            </span>
          </div>
          <h3>Discover Space</h3>
          <p>Explore planets, uncover scientific facts, and test your knowledge.</p>
          <div className="game-tags">
            <span className="tag">All levels · {TOPICS.length} topics</span>
          </div>
          <div className="card-meta">
            {learn.discovered.length > 0 ? (
              <span className="pill done">{learn.discovered.length} discovered</span>
            ) : (
              <span className="pill">Learn Hub</span>
            )}
            <span className="card-cta">Explore &rarr;</span>
          </div>
        </button>
      </div>

      <BadgeShowcase earned={earned} />

      {completedCount > 0 || learn.xp > 0 ? (
        <div className="home-footer-actions">
          <small>
            Saved on this device · {SPACE_FACTS.length} daily facts · {ALL_BADGES.length}{' '}
            achievements
          </small>
          <button className="btn ghost small" onClick={onReset}>
            Reset mission progress
          </button>
        </div>
      ) : null}
    </div>
  );
}
