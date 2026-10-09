import { DAILY_CHALLENGES, SPACE_FACTS, type DailyChallengeDef, type SpaceFact } from './data';

/** Local calendar date as YYYY-MM-DD. */
export function dateKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Whole days since the Unix epoch, based on the local calendar date. */
function localDayNumber(d: Date = new Date()): number {
  const midnight = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.floor(midnight.getTime() / 86_400_000);
}

/** Deterministic, date-based choice from a list. Same item all day, changes daily. */
export function pickForToday<T>(items: T[], d: Date = new Date()): T {
  return items[localDayNumber(d) % items.length];
}

export function getDailyChallenge(d: Date = new Date()): DailyChallengeDef {
  return pickForToday(DAILY_CHALLENGES, d);
}

export function getSpaceFact(d: Date = new Date()): SpaceFact {
  return pickForToday(SPACE_FACTS, d);
}

/** Turn a daily challenge into a stable "review" key so claims reset each day. */
export function dailyCompletionId(challengeId: string, d: Date = new Date()): string {
  return `${dateKey(d)}:${challengeId}`;
}
