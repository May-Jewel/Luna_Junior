import type { LearnState, Progress } from '../../../types';
import { TOPICS } from '../data/topics';
import type { Badge, LevelInfo, Recommendation } from '../types';

export const XP_TOPIC_DISCOVER = 10;
export const XP_QUIZ_FIRST = 20;
export const XP_QUIZ_IMPROVE = 10;
export const XP_DAILY_CHALLENGE = 30;

/**
 * XP awarded for finishing a quiz.
 * - First ever completion: full first-time reward.
 * - A new personal best afterwards: small improvement bonus.
 * - Repeating (or doing worse): nothing, so XP cannot be farmed.
 */
export function quizXpGain(previousBest: number | undefined, correct: number): number {
  if (previousBest === undefined) return XP_QUIZ_FIRST;
  if (correct > previousBest) return XP_QUIZ_IMPROVE;
  return 0;
}

const LEVELS: { name: string; min: number }[] = [
  { name: 'Space Rookie', min: 0 },
  { name: 'Planet Explorer', min: 50 },
  { name: 'Junior Scientist', min: 130 },
  { name: 'Galactic Expert', min: 240 },
];

export function getLevel(xp: number): LevelInfo {
  let index = 0;
  for (let i = 0; i < LEVELS.length; i += 1) {
    if (xp >= LEVELS[i].min) index = i;
  }
  const current = LEVELS[index];
  const next = LEVELS[index + 1] ?? null;
  const span = next ? next.min - current.min : 1;
  const into = xp - current.min;
  return {
    name: current.name,
    index,
    currentMin: current.min,
    nextMin: next ? next.min : null,
    progressPct: next ? Math.min(100, Math.round((into / span) * 100)) : 100,
    xpToNext: next ? Math.max(0, next.min - xp) : 0,
  };
}

export const ALL_BADGES: Badge[] = [
  {
    id: 'first-launch',
    name: 'First Launch',
    icon: '🚀',
    description: 'Complete the Build Your Spacecraft mission.',
  },
  {
    id: 'mars-pathfinder',
    name: 'Mars Pathfinder',
    icon: '🛰️',
    description: 'Complete the Mars Rover Explorer mission.',
  },
  {
    id: 'curious-explorer',
    name: 'Curious Explorer',
    icon: '🔍',
    description: 'Save three topics to My Discoveries.',
  },
  {
    id: 'space-learner',
    name: 'Space Learner',
    icon: '📚',
    description: 'Complete any Learn Hub quiz.',
  },
  {
    id: 'planet-expert',
    name: 'Planet Expert',
    icon: '🪐',
    description: 'Get a perfect score on a Planets and Moons quiz.',
  },
];

function hasPerfectPlanetQuiz(learn: LearnState): boolean {
  return TOPICS.some((t) => {
    if (t.category !== 'planets-moons' || !t.quiz) return false;
    return (learn.quizBest[t.id] ?? -1) >= t.quiz.length;
  });
}

export function computeBadges(learn: LearnState, progress: Progress): string[] {
  const earned: string[] = [];
  if (progress.spacecraft) earned.push('first-launch');
  if (progress.rover) earned.push('mars-pathfinder');
  if (learn.saved.length >= 3) earned.push('curious-explorer');
  if (Object.keys(learn.quizBest).length >= 1) earned.push('space-learner');
  if (hasPerfectPlanetQuiz(learn)) earned.push('planet-expert');
  return earned;
}

export function quizzesCompleted(learn: LearnState): number {
  return Object.keys(learn.quizBest).length;
}

export function getRecommendations(
  learn: LearnState,
  progress: Progress,
): Recommendation[] {
  const discovered = new Set(learn.discovered);
  const recs: Recommendation[] = [];
  const push = (topicId: string, reason: string) => {
    if (recs.some((r) => r.topicId === topicId)) return;
    if (recs.length < 3) recs.push({ topicId, reason });
  };

  if (!progress.spacecraft && !discovered.has('solar-panels')) {
    push('solar-panels', 'Power up before you build your first spacecraft.');
  }
  if (!progress.rover && !discovered.has('why-mars')) {
    push('why-mars', 'Get ready for the Mars Rover Explorer mission.');
  }

  for (const t of TOPICS) {
    if (recs.length >= 3) break;
    if (t.quiz && Object.prototype.hasOwnProperty.call(learn.quizBest, t.id)) {
      const best = learn.quizBest[t.id];
      if (best < t.quiz.length) {
        push(t.id, `You scored ${best}/${t.quiz.length} \u2014 can you beat it?`);
      }
    }
  }

  const discoveredCategories = new Set(
    TOPICS.filter((t) => discovered.has(t.id)).map((t) => t.category),
  );
  for (const t of TOPICS) {
    if (recs.length >= 3) break;
    if (!discovered.has(t.id) && discoveredCategories.has(t.category)) {
      push(t.id, `You explored this category \u2014 keep going with "${t.title}".`);
    }
  }

  return recs;
}
