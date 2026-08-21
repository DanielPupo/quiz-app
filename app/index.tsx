import React, { useCallback, useEffect, useMemo, useState } from 'react';
import GameSetupScreen from '../components/GameSetupScreen';
import HomeScreen from '../components/HomeScreen';
import QuizScreen from '../components/QuizScreenNew';
import ResultScreen from '../components/ResultScreenNew';
import { CAMPAIGNS, DEFAULT_PROGRESS } from '../constants/game';
import { addToRanking, loadProgress, saveProgress } from '../services/progressStorage';
import { AchievementId, GameConfig, GameResult, PlayerProgress } from '../types/game';
import questions from '../questions.json';

type Screen = 'home' | 'setup' | 'quiz' | 'result';

export default function HomePage() {
  const [screen, setScreen] = useState<Screen>('home');
  const [progress, setProgress] = useState<PlayerProgress>(DEFAULT_PROGRESS);
  const [config, setConfig] = useState<GameConfig | null>(null);
  const [position, setPosition] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [points, setPoints] = useState(0);
  const [lives, setLives] = useState(3);
  const [secondsLeft, setSecondsLeft] = useState(20);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [result, setResult] = useState<GameResult | null>(null);
  const [newAchievements, setNewAchievements] = useState<AchievementId[]>([]);

  useEffect(() => { void loadProgress().then(setProgress); }, []);
  const activeQuestionIndex = config?.questionIndexes[position] ?? 0;
  const activeQuestion = questions[activeQuestionIndex];

  const startGame = useCallback((nextConfig: GameConfig) => {
    setConfig(nextConfig); setPosition(0); setSelectedOption(null); setCorrectAnswers(0); setPoints(0);
    setLives(nextConfig.initialLives); setSecondsLeft(nextConfig.secondsPerQuestion); setElapsedSeconds(0);
    setResult(null); setNewAchievements([]); setScreen('quiz');
  }, []);

  const answer = useCallback((option: string) => {
    if (!config || selectedOption !== null) return;
    const correct = option === activeQuestion.correctAnswer;
    setSelectedOption(option);
    if (correct) { setCorrectAnswers((value) => value + 1); setPoints((value) => value + 100 + secondsLeft * 5); }
    else setLives((value) => Math.max(0, value - 1));
  }, [activeQuestion, config, secondsLeft, selectedOption]);

  useEffect(() => {
    if (screen !== 'quiz' || !config || selectedOption !== null) return;
    const timer = setInterval(() => {
      setElapsedSeconds((value) => value + 1);
      setSecondsLeft((value) => {
        if (value <= 1) { clearInterval(timer); answer('__timeout__'); return 0; }
        return value - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [answer, config, screen, selectedOption]);

  const finishGame = useCallback(async () => {
    if (!config) return;
    const gameResult: GameResult = { id: `${Date.now()}`, playerName: config.playerName, mode: config.mode, campaignId: config.campaignId, correctAnswers, totalQuestions: config.questionIndexes.length, points, remainingLives: lives, elapsedSeconds, createdAt: new Date().toISOString() };
    const completedCampaigns = config.mode === 'journey' && config.campaignId && position === config.questionIndexes.length - 1 && !progress.completedCampaigns.includes(config.campaignId)
      ? [...progress.completedCampaigns, config.campaignId] : progress.completedCampaigns;
    const earned: AchievementId[] = ['first_match'];
    if (correctAnswers === gameResult.totalQuestions) earned.push('perfect');
    if (elapsedSeconds / gameResult.totalQuestions <= 10) earned.push('fast');
    if (lives === config.initialLives) earned.push('survivor');
    if (config.mode === 'hard' && correctAnswers / gameResult.totalQuestions >= 0.7) earned.push('hard_winner');
    if (CAMPAIGNS.every((campaign) => completedCampaigns.includes(campaign.id))) earned.push('historian');
    const unlockedAchievements = [...new Set([...progress.unlockedAchievements, ...earned])];
    const fresh = earned.filter((id) => !progress.unlockedAchievements.includes(id));
    const nextProgress = { playerName: config.playerName, completedCampaigns, unlockedAchievements, ranking: addToRanking(progress.ranking, gameResult) };
    setProgress(nextProgress); setResult(gameResult); setNewAchievements(fresh); setScreen('result');
    await saveProgress(nextProgress);
  }, [config, correctAnswers, elapsedSeconds, lives, points, position, progress]);

  const next = useCallback(() => {
    if (!config) return;
    if (lives === 0 || position === config.questionIndexes.length - 1) { void finishGame(); return; }
    setPosition((value) => value + 1); setSelectedOption(null); setSecondsLeft(config.secondsPerQuestion);
  }, [config, finishGame, lives, position]);

  const ranking = useMemo(() => progress.ranking.slice(0, 5), [progress.ranking]);
  if (screen === 'home') return <HomeScreen totalQuestions={questions.length} onStartQuiz={() => setScreen('setup')} />;
  if (screen === 'setup') return <GameSetupScreen progress={progress} totalQuestions={questions.length} onBack={() => setScreen('home')} onStart={startGame} />;
  if (screen === 'result' && result) return <ResultScreen result={result} ranking={ranking} unlockedAchievements={progress.unlockedAchievements} newAchievements={newAchievements} onPlayAgain={() => config && startGame(config)} onGoHome={() => setScreen('home')} />;
  if (!config) return null;
  return <QuizScreen currentQuestionIndex={position} question={activeQuestion} selectedOption={selectedOption} points={points} lives={lives} secondsLeft={secondsLeft} totalQuestions={config.questionIndexes.length} onOptionPress={answer} onNextQuestion={next} onQuit={() => setScreen('home')} />;
}
