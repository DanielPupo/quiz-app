import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_PROGRESS } from '../constants/game';
import { GameResult, PlayerProgress } from '../types/game';

const STORAGE_KEY = '@quiz-do-timao/progress-v1';

export async function loadProgress(): Promise<PlayerProgress> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_PROGRESS, ...JSON.parse(raw) } : { ...DEFAULT_PROGRESS };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export async function saveProgress(progress: PlayerProgress) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function addToRanking(ranking: GameResult[], result: GameResult) {
  return [...ranking, result]
    .sort((a, b) => b.points - a.points || a.elapsedSeconds - b.elapsedSeconds)
    .slice(0, 10);
}
