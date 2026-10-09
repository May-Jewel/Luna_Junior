import type { GameId } from '../../types';

export type CategoryId =
  | 'solar-system'
  | 'planets-moons'
  | 'sun-weather'
  | 'mars'
  | 'spacecraft';

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
  blurb: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type TopicVisual =
  | 'solar-system'
  | 'orbit'
  | 'rocky-planet'
  | 'gas-giant'
  | 'icy-moon'
  | 'sun'
  | 'aurora'
  | 'mars'
  | 'mars-rock'
  | 'solar-panel'
  | 'satellite';

export interface MissionLink {
  game: GameId;
  label: string;
  reminder: string;
}

export interface Topic {
  id: string;
  title: string;
  category: CategoryId;
  visual: TopicVisual;
  hue: string;
  summary: string;
  facts: string[];
  didYouKnow: string;
  whyItMatters: string;
  relatedTopicId?: string;
  mission?: MissionLink;
  quiz?: QuizQuestion[];
}

export interface Planet {
  id: string;
  name: string;
  order: number;
  classification: 'Star' | 'Terrestrial planet' | 'Gas giant' | 'Ice giant';
  diameterKm: number;
  orbitalPeriod: string;
  fact: string;
  color: string;
  size: number;
}

export interface Recommendation {
  topicId: string;
  reason: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface LevelInfo {
  name: string;
  index: number;
  currentMin: number;
  nextMin: number | null;
  progressPct: number;
  xpToNext: number;
}
