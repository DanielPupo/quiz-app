export type GameMode = 'classic' | 'hard' | 'journey';

export type GameConfig = {
  mode: GameMode;
  playerName: string;
  campaignId?: string;
  questionIndexes: number[];
  secondsPerQuestion: number;
  initialLives: number;
};

export type GameResult = {
  id: string;
  playerName: string;
  mode: GameMode;
  campaignId?: string;
  correctAnswers: number;
  totalQuestions: number;
  points: number;
  remainingLives: number;
  elapsedSeconds: number;
  createdAt: string;
};

export type AchievementId = 'first_match' | 'perfect' | 'fast' | 'survivor' | 'historian' | 'hard_winner';

export type PlayerProgress = {
  completedCampaigns: string[];
  unlockedAchievements: AchievementId[];
  ranking: GameResult[];
  playerName: string;
};
