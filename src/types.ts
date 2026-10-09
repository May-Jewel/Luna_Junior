export type GameId = 'spacecraft' | 'rover';

export type Screen = 'home' | 'learn' | GameId;

export interface Progress {
  spacecraft: boolean;
  rover: boolean;
}

export interface LearnState {
  /** Topic ids the student has opened. */
  discovered: string[];
  /** Topic ids the student saved to My Discoveries. */
  saved: string[];
  /** topicId -> best number of correct answers on its quiz. */
  quizBest: Record<string, number>;
  /** Total experience points earned. */
  xp: number;
  /** Earned badge ids. */
  badges: string[];
  /** Most recently opened Learn Hub topic (for "Continue your journey"). */
  lastTopicId: string | null;
}

export const EMPTY_LEARN: LearnState = {
  discovered: [],
  saved: [],
  quizBest: {},
  xp: 0,
  badges: [],
  lastTopicId: null,
};

export interface DailyState {
  /** Local date (YYYY-MM-DD) of the last claimed daily challenge reward. */
  lastCompletedDate: string | null;
  /** Challenge id completed on that date. */
  lastChallengeId: string | null;
  /** How many daily challenges have ever been completed. */
  completedCount: number;
}

export const EMPTY_DAILY: DailyState = {
  lastCompletedDate: null,
  lastChallengeId: null,
  completedCount: 0,
};
