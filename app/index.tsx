import React, { useCallback, useState } from 'react';
import HomeScreen from '../components/HomeScreen';
import QuizScreen from '../components/QuizScreenNew';
import ResultScreen from '../components/ResultScreenNew';
import questions from '../questions.json';

type Screen = 'home' | 'quiz' | 'result';

export default function HomePage() {
  const [screen, setScreen] = useState<Screen>('home');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const startQuiz = useCallback(() => {
    setQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setScreen('quiz');
  }, []);

  const selectOption = useCallback((option: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(option);
    if (option === questions[questionIndex].correctAnswer) {
      setScore((currentScore) => currentScore + 1);
    }
  }, [questionIndex, selectedOption]);

  const nextQuestion = useCallback(() => {
    if (questionIndex === questions.length - 1) {
      setScreen('result');
      return;
    }
    setQuestionIndex((current) => current + 1);
    setSelectedOption(null);
  }, [questionIndex]);

  if (screen === 'home') return <HomeScreen totalQuestions={questions.length} onStartQuiz={startQuiz} />;
  if (screen === 'result') {
    return (
      <ResultScreen
        score={score}
        totalQuestions={questions.length}
        onPlayAgain={startQuiz}
        onGoHome={() => setScreen('home')}
      />
    );
  }

  return (
    <QuizScreen
      currentQuestionIndex={questionIndex}
      selectedOption={selectedOption}
      score={score}
      totalQuestions={questions.length}
      onOptionPress={selectOption}
      onNextQuestion={nextQuestion}
      onQuit={() => setScreen('home')}
    />
  );
}
