import React, { useCallback, useState } from 'react';
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
  const [score, setScore] = useState(0);

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0); setSelectedOption(null); setScore(0);
  }, []);

  const startQuiz = () => { resetQuiz(); setAppState('quiz'); };
  const goHome = () => { resetQuiz(); setAppState('home'); };

  const answerQuestion = (option: string) => {
    if (selectedOption !== null) return;
    if (option === questions[currentQuestionIndex].correctAnswer) setScore((value) => value + 1);
    setSelectedOption(option);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) { setAppState('result'); return; }
    setCurrentQuestionIndex((index) => index + 1); setSelectedOption(null);
  };

  return (
    <View style={{ flex: 1 }}>
      {appState === 'home' && <HomeScreen onStartQuiz={startQuiz} totalQuestions={questions.length} />}
      {appState === 'quiz' && <QuizScreenNew currentQuestionIndex={currentQuestionIndex} selectedOption={selectedOption} isAnswered={selectedOption !== null} score={score} totalQuestions={questions.length} onOptionPress={answerQuestion} onNextQuestion={nextQuestion} onGoHome={goHome} />}
      {appState === 'result' && <ResultScreenNew score={score} totalQuestions={questions.length} onPlayAgain={startQuiz} onGoHome={goHome} />}
    </View>
  );
}
