import type { GameId } from '../../types';

export type Difficulty = 'Easy' | 'Medium' | 'Challenging';

export interface ProgressSnapshot {
  spacecraft: boolean;
  rover: boolean;
}

export type HomeTarget =
  | { kind: 'game'; game: GameId }
  | { kind: 'topic'; topicId: string }
  | { kind: 'learn' };
