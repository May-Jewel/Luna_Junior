import { useCallback, useEffect, useState } from 'react';
import type { DailyState, GameId, LearnState, Progress } from '../types';
import { EMPTY_DAILY, EMPTY_LEARN } from '../types';
import {
  XP_DAILY_CHALLENGE,
  XP_TOPIC_DISCOVER,
  computeBadges,
  quizXpGain,
} from '../features/learn-hub/utils/learn';
import { dateKey } from '../features/home/daily';

const STORAGE_KEY = 'junior-astronaut-progress-v1';

interface Store {
  spacecraft: boolean;
  rover: boolean;
  learn: LearnState;
  daily: DailyState;
}

const EMPTY: Store = {
  spacecraft: false,
  rover: false,
  learn: EMPTY_LEARN,
  daily: EMPTY_DAILY,
};

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === 'string');
}

function toQuizBest(value: unknown): Record<string, number> {
  if (!value || typeof value !== 'object') return {};
  const out: Record<string, number> = {};
  for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
    if (typeof v === 'number' && Number.isFinite(v) && v >= 0) out[k] = v;
  }
  return out;
}

function read(): Store {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<Store> & {
      learn?: unknown;
      daily?: unknown;
    };
    const learnRaw = (parsed.learn ?? {}) as Partial<LearnState>;
    const dailyRaw = (parsed.daily ?? {}) as Partial<DailyState>;
    const learn: LearnState = {
      discovered: toStringArray(learnRaw.discovered),
      saved: toStringArray(learnRaw.saved),
      quizBest: toQuizBest(learnRaw.quizBest),
      xp:
        typeof learnRaw.xp === 'number' && learnRaw.xp >= 0
          ? Math.floor(learnRaw.xp)
          : 0,
      badges: toStringArray(learnRaw.badges),
      lastTopicId:
        typeof learnRaw.lastTopicId === 'string' ? learnRaw.lastTopicId : null,
    };
    const daily: DailyState = {
      lastCompletedDate:
        typeof dailyRaw.lastCompletedDate === 'string'
          ? dailyRaw.lastCompletedDate
          : null,
      lastChallengeId:
        typeof dailyRaw.lastChallengeId === 'string'
          ? dailyRaw.lastChallengeId
          : null,
      completedCount:
        typeof dailyRaw.completedCount === 'number' && dailyRaw.completedCount >= 0
          ? Math.floor(dailyRaw.completedCount)
          : 0,
    };
    return {
      spacecraft: Boolean(parsed.spacecraft),
      rover: Boolean(parsed.rover),
      learn,
      daily,
    };
  } catch {
    return EMPTY;
  }
}

function finalize(store: Store): Store {
  const progress: Progress = {
    spacecraft: store.spacecraft,
    rover: store.rover,
  };
  return {
    ...store,
    learn: { ...store.learn, badges: computeBadges(store.learn, progress) },
  };
}

export function useProgress() {
  const [store, setStore] = useState<Store>(() => read());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch {
      /* storage unavailable - progress simply won't persist */
    }
  }, [store]);

  const complete = useCallback((game: GameId) => {
    setStore((prev) =>
      prev[game] ? prev : finalize({ ...prev, [game]: true }),
    );
  }, []);

  const reset = useCallback(() => {
    setStore((prev) => ({
      ...prev,
      spacecraft: false,
      rover: false,
      learn: { ...prev.learn, badges: prev.learn.badges.filter(
        (b) => b !== 'first-launch' && b !== 'mars-pathfinder',
      ) },
    }));
  }, []);

  const resetLearn = useCallback(() => {
    setStore((prev) => ({ ...prev, learn: EMPTY_LEARN }));
  }, []);

  const discoverTopic = useCallback((id: string) => {
    setStore((prev) => {
      const already = prev.learn.discovered.includes(id);
      const learn: LearnState = {
        ...prev.learn,
        discovered: already
          ? prev.learn.discovered
          : [...prev.learn.discovered, id],
        lastTopicId: id,
        xp: already ? prev.learn.xp : prev.learn.xp + XP_TOPIC_DISCOVER,
      };
      return finalize({ ...prev, learn });
    });
  }, []);

  const toggleSave = useCallback((id: string) => {
    setStore((prev) => {
      const saved = prev.learn.saved.includes(id)
        ? prev.learn.saved.filter((s) => s !== id)
        : [...prev.learn.saved, id];
      return finalize({ ...prev, learn: { ...prev.learn, saved } });
    });
  }, []);

  const recordQuiz = useCallback((id: string, correct: number) => {
    setStore((prev) => {
      const best = prev.learn.quizBest[id];
      const firstTime = best === undefined;
      const gain = quizXpGain(best, correct);
      const quizBest = {
        ...prev.learn.quizBest,
        [id]: firstTime ? correct : Math.max(best, correct),
      };
      const learn: LearnState = {
        ...prev.learn,
        quizBest,
        xp: prev.learn.xp + gain,
      };
      return finalize({ ...prev, learn });
    });
  }, []);

  /**
   * Records completion of the daily challenge. XP (and the once-per-day claim)
   * are only granted the first time it is completed on the current local date.
   */
  const recordDailyChallenge = useCallback((challengeId: string) => {
    setStore((prev) => {
      const today = dateKey();
      const alreadyToday = prev.daily.lastCompletedDate === today;
      if (alreadyToday) {
        return finalize({
          ...prev,
          daily: { ...prev.daily, lastChallengeId: challengeId },
        });
      }
      const learn: LearnState = {
        ...prev.learn,
        xp: prev.learn.xp + XP_DAILY_CHALLENGE,
      };
      const daily: DailyState = {
        lastCompletedDate: today,
        lastChallengeId: challengeId,
        completedCount: prev.daily.completedCount + 1,
      };
      return finalize({ ...prev, learn, daily });
    });
  }, []);

  const progress: Progress = {
    spacecraft: store.spacecraft,
    rover: store.rover,
  };
  const completedCount = (progress.spacecraft ? 1 : 0) + (progress.rover ? 1 : 0);
  const dailyCompletedToday = store.daily.lastCompletedDate === dateKey();

  return {
    progress,
    learn: store.learn,
    daily: store.daily,
    dailyCompletedToday,
    complete,
    reset,
    resetLearn,
    discoverTopic,
    toggleSave,
    recordQuiz,
    recordDailyChallenge,
    completedCount,
  };
}
