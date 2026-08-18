import React, { useState } from 'react';
import { View } from 'react-native';
import HomeScreen from '../components/HomeScreen';
import QuizScreenNew from '../components/QuizScreenNew';
import ResultScreenNew from '../components/ResultScreenNew';
import questions from '../questions.json';

type AppState = 'home' | 'quiz' | 'result';

export default function HomePage() {
  const [appState, setAppState] = useState<AppState>('home');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const handleStartQuiz = () => {
    setAppState('quiz');
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
  };

  const handleOptionPress = (option: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (option === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption(option);
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setAppState('result');
    }
  };

  const handlePlayAgain = () => {
    handleStartQuiz();
  };

  return (
    <View style={{ flex: 1 }}>
      {appState === 'home' && (
        <HomeScreen onStartQuiz={handleStartQuiz} />
      )}

      {appState === 'quiz' && (
        <QuizScreenNew
          currentQuestionIndex={currentQuestionIndex}
          selectedOption={selectedOption}
          isAnswered={isAnswered}
          score={score}
          totalQuestions={questions.length}
          onOptionPress={handleOptionPress}
          onNextQuestion={handleNextQuestion}
        />
      )}

      {appState === 'result' && (
        <ResultScreenNew
          score={score}
          totalQuestions={questions.length}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </View>
  );
}