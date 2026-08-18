import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Dimensions,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import questions from '../questions.json';

const { width } = Dimensions.get('window');

// Cores Oficiais do Corinthians
const PALETTE = {
  primary: '#000000',      // Preto
  secondary: '#FFFFFF',    // Branco
  accent: '#E60112',       // Vermelho Corinthians
  dark: '#0a0a0a',
  cardBg: '#1a1a1a',
  cardBorder: '#333333',
  textPrimary: '#FFFFFF',
  textMuted: '#8E8E93',
  correct: '#10B981',
  correctBg: 'rgba(16, 185, 129, 0.12)',
  wrong: '#EF4444',
  wrongBg: 'rgba(239, 68, 68, 0.12)',
};

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

type QuizScreenProps = {
  currentQuestionIndex: number;
  selectedOption: string | null;
  isAnswered: boolean;
  score: number;
  totalQuestions: number;
  onOptionPress: (option: string) => void;
  onNextQuestion: () => void;
};

export default function QuizScreen({
  currentQuestionIndex,
  selectedOption,
  isAnswered,
  score,
  totalQuestions,
  onOptionPress,
  onNextQuestion,
}: QuizScreenProps) {
  const insets = useSafeAreaInsets();
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleSelectOption = (option: string) => {
    if (!isAnswered) {
      onOptionPress(option);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top, 16),
          paddingBottom: Math.max(insets.bottom, 16),
        },
      ]}
    >
      <StatusBar barStyle="light-content" backgroundColor={PALETTE.primary} translucent />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.brandBadge}>
          <MaterialCommunityIcons name="shield-crown" size={16} color={PALETTE.accent} />
          <Text style={styles.brandText}>SCCP</Text>
        </View>

        <View style={styles.scoreCounter}>
          <MaterialCommunityIcons name="trophy-outline" size={18} color={PALETTE.accent} />
          <Text style={styles.scoreText}>{score}/{totalQuestions}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
      </View>

      <View style={styles.stepInfo}>
        <Text style={styles.stepText}>
          PERGUNTA {currentQuestionIndex + 1} DE {totalQuestions}
        </Text>
      </View>

      {/* Question Card */}
      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsList}>
        {(currentQuestion.options ?? []).map((option: string, index: number) => {
          const isCorrect = option === currentQuestion.correctAnswer;
          const isSelected = option === selectedOption;

          let btnStyle = styles.optionBtn;
          let badgeStyle = styles.optionBadge;
          let textColor = PALETTE.textPrimary;

          if (isAnswered) {
            if (isCorrect) {
              btnStyle = [styles.optionBtn, styles.correctBtn];
              badgeStyle = [styles.optionBadge, styles.correctBadge];
              textColor = PALETTE.correct;
            } else if (isSelected) {
              btnStyle = [styles.optionBtn, styles.wrongBtn];
              badgeStyle = [styles.optionBadge, styles.wrongBadge];
              textColor = PALETTE.wrong;
            } else {
              btnStyle = [styles.optionBtn, styles.dimmedBtn];
            }
          }

          return (
            <TouchableOpacity
              key={option}
              activeOpacity={0.7}
              style={btnStyle}
              onPress={() => handleSelectOption(option)}
              disabled={isAnswered}
            >
              <View style={styles.optionContent}>
                <View style={badgeStyle}>
                  <Text
                    style={[
                      styles.badgeText,
                      isAnswered && isCorrect && { color: PALETTE.primary },
                    ]}
                  >
                    {OPTION_LABELS[index] || '•'}
                  </Text>
                </View>
                <Text style={[styles.optionText, { color: textColor }]}>{option}</Text>
              </View>

              {isAnswered && isCorrect && (
                <MaterialCommunityIcons
                  name="check-circle"
                  size={22}
                  color={PALETTE.correct}
                />
              )}
              {isAnswered && isSelected && !isCorrect && (
                <MaterialCommunityIcons name="close-circle" size={22} color={PALETTE.wrong} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {isAnswered ? (
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={onNextQuestion}
            activeOpacity={0.8}
          >
            <Text style={styles.actionBtnText}>
              {currentQuestionIndex === totalQuestions - 1 ? 'VER RESULTADO' : 'PRÓXIMA'}
            </Text>
            <MaterialCommunityIcons name="chevron-right" size={22} color={PALETTE.primary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.hintContainer}>
            <MaterialCommunityIcons
              name="gesture-tap"
              size={18}
              color={PALETTE.textMuted}
            />
            <Text style={styles.hintText}>Selecione uma alternativa</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.primary,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  brandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: PALETTE.cardBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: PALETTE.accent,
  },
  brandText: {
    color: PALETTE.textPrimary,
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 2,
  },
  scoreCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(230, 1, 18, 0.15)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: PALETTE.accent,
  },
  scoreText: {
    color: PALETTE.accent,
    fontWeight: '800',
    fontSize: 13,
  },
  progressTrack: {
    height: 5,
    backgroundColor: PALETTE.cardBorder,
    borderRadius: 2,
    width: '100%',
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: PALETTE.accent,
  },
  stepInfo: {
    marginBottom: 16,
  },
  stepText: {
    color: PALETTE.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  questionCard: {
    backgroundColor: PALETTE.cardBg,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: PALETTE.accent,
    minHeight: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: PALETTE.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  questionText: {
    color: PALETTE.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 26,
  },
  optionsList: {
    flex: 1,
    gap: 10,
  },
  optionBtn: {
    backgroundColor: PALETTE.cardBg,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: PALETTE.cardBorder,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  optionBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: PALETTE.textMuted,
    fontWeight: '800',
    fontSize: 13,
  },
  optionText: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  correctBtn: {
    backgroundColor: PALETTE.correctBg,
    borderColor: PALETTE.correct,
  },
  correctBadge: {
    backgroundColor: PALETTE.correct,
  },
  wrongBtn: {
    backgroundColor: PALETTE.wrongBg,
    borderColor: PALETTE.wrong,
  },
  wrongBadge: {
    backgroundColor: PALETTE.wrong,
  },
  dimmedBtn: {
    opacity: 0.25,
  },
  footer: {
    height: 60,
    justifyContent: 'center',
    marginTop: 10,
  },
  actionBtn: {
    backgroundColor: PALETTE.accent,
    height: 52,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: PALETTE.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  actionBtnText: {
    color: PALETTE.primary,
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 1,
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  hintText: {
    color: PALETTE.textMuted,
    fontSize: 12,
    fontWeight: '500',
  },
});
