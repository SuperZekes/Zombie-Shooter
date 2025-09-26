export interface ZombieType {
  id: number;
  x: number;
  y: number;
  size: number;
  status: 'alive' | 'dying';
}

export interface LeaderboardEntry {
  name: string;
  score: number;
}

export enum GameState {
  Start,
  Playing,
  GameOver,
  Leaderboard,
}
