import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import {
    Dimensions,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { THEME_COLORS } from '../constants/theme';

import questions from '../questions.json';

const { width, height } = Dimensions.get('window');

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

  const dynamicStyles = useMemo(() => ({
    containerPadding: Math.max(12, Math.min(24, width * 0.05)),
    fontSize: {
      title: Math.max(18, Math.min(28, width * 0.06)),
      question: Math.max(16, Math.min(24, width * 0.05)),
      option: Math.max(14, Math.min(20, width * 0.04)),
      badge: Math.max(10, Math.min(14, width * 0.035)),
    },
    optionHeight: Math.max(50, Math.min(80, height * 0.1)),
  }), [width, height]);

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
          paddingTop: Math.max(insets.top + 12, 12),
          paddingBottom: Math.max(insets.bottom + 12, 12),
          paddingHorizontal: dynamicStyles.containerPadding,
        },
      ]}
    >
      <StatusBar barStyle="light-content" backgroundColor={THEME_COLORS.primary} translucent />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.brandBadge}>
          <MaterialCommunityIcons
            name="trophy-award"
            size={Math.max(14, width * 0.035)}
            color={THEME_COLORS.accent}
          />
          <Text style={[styles.brandText, { fontSize: dynamicStyles.fontSize.badge }]}>
            QUIZ
          </Text>
        </View>

        <View style={styles.scoreCounter}>
          <MaterialCommunityIcons
            name="star-circle"
            size={Math.max(16, width * 0.04)}
            color={THEME_COLORS.accent}
          />
          <Text style={[styles.scoreText, { fontSize: dynamicStyles.fontSize.badge }]}>
            {score}/{totalQuestions}
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={[styles.progressTrack, { height: Math.max(4, width * 0.015) }]}>
        <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
      </View>

      <View style={[styles.stepInfo, { marginBottom: Math.max(8, width * 0.03) }]}>
        <Text style={[styles.stepText, { fontSize: dynamicStyles.fontSize.badge }]}>
          PERGUNTA {currentQuestionIndex + 1} DE {totalQuestions}
        </Text>
      </View>

      {/* Question Card */}
      <View style={[styles.questionCard, { marginBottom: Math.max(16, width * 0.04) }]}>
        <Text style={[styles.questionText, { fontSize: dynamicStyles.fontSize.question }]}>
          {currentQuestion.question}
        </Text>
      </View>

      {/* Options */}
      <View style={[styles.optionsList, { gap: Math.max(8, width * 0.02) }]}>
        {(currentQuestion.options ?? []).map((option: string, index: number) => {
          const isCorrect = option === currentQuestion.correctAnswer;
          const isSelected = option === selectedOption;

          let btnStyle = styles.optionBtn;
          let badgeStyle = styles.optionBadge;
          let textColor = THEME_COLORS.textPrimary;

          if (isAnswered) {
            if (isCorrect) {
              btnStyle = [styles.optionBtn, styles.correctBtn];
              badgeStyle = [styles.optionBadge, styles.correctBadge];
              textColor = THEME_COLORS.success;
            } else if (isSelected) {
              btnStyle = [styles.optionBtn, styles.wrongBtn];
              badgeStyle = [styles.optionBadge, styles.wrongBadge];
              textColor = THEME_COLORS.error;
            } else {
              btnStyle = [styles.optionBtn, styles.dimmedBtn];
            }
          }

          return (
            <TouchableOpacity
              key={option}
              activeOpacity={0.7}
              style={[btnStyle, { minHeight: dynamicStyles.optionHeight * 0.6 }]}
              onPress={() => handleSelectOption(option)}
              disabled={isAnswered}
            >
              <View style={styles.optionContent}>
                <View
                  style={[
                    badgeStyle,
                    {
                      width: Math.max(28, width * 0.08),
                      height: Math.max(28, width * 0.08),
                      borderRadius: Math.max(7, width * 0.02),
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      {
                        fontSize: dynamicStyles.fontSize.option - 2,
                        color: isAnswered && isCorrect ? THEME_COLORS.primary : THEME_COLORS.textMuted,
                      },
                    ]}
                  >
                    {OPTION_LABELS[index] || '•'}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.optionText,
                    { fontSize: dynamicStyles.fontSize.option, color: textColor },
                  ]}
                >
                  {option}
                </Text>
              </View>

              {isAnswered && isCorrect && (
                <MaterialCommunityIcons
                  name="check-circle"
                  size={Math.max(18, width * 0.05)}
                  color={THEME_COLORS.success}
                />
              )}
              {isAnswered && isSelected && !isCorrect && (
                <MaterialCommunityIcons
                  name="close-circle"
                  size={Math.max(18, width * 0.05)}
                  color={THEME_COLORS.error}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Footer */}
      <View style={[styles.footer, { marginTop: Math.max(12, width * 0.03) }]}>
        {isAnswered ? (
          <TouchableOpacity
            style={[
              styles.actionBtn,
              { paddingVertical: Math.max(12, height * 0.02) },
            ]}
            onPress={onNextQuestion}
            activeOpacity={0.75}
          >
            <Text
              style={[
                styles.actionBtnText,
                { fontSize: Math.max(13, width * 0.04) },
              ]}
            >
              {currentQuestionIndex === totalQuestions - 1 ? 'RESULTADO' : 'PRÓXIMA'}
            </Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={Math.max(18, width * 0.05)}
              color={THEME_COLORS.primary}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.hintContainer}>
            <MaterialCommunityIcons
              name="gesture-tap"
              size={Math.max(16, width * 0.04)}
              color={THEME_COLORS.textMuted}
            />
            <Text
              style={[
                styles.hintText,
                { fontSize: dynamicStyles.fontSize.badge },
              ]}
            >
              Selecione uma alternativa
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.primary,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  brandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: THEME_COLORS.darkGray,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: THEME_COLORS.accent,
  },
  brandText: {
    color: THEME_COLORS.textPrimary,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  scoreCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: THEME_COLORS.goldGlow,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: THEME_COLORS.accent,
  },
  scoreText: {
    color: THEME_COLORS.accent,
    fontWeight: '800',
  },
  progressTrack: {
    backgroundColor: THEME_COLORS.gray,
    borderRadius: 2,
    width: '100%',
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: THEME_COLORS.accent,
  },
  stepInfo: {
    marginBottom: 12,
  },
  stepText: {
    color: THEME_COLORS.textMuted,
    fontWeight: '700',
    letterSpacing: 1,
  },
  questionCard: {
    backgroundColor: THEME_COLORS.darkGray,
    padding: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: THEME_COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: THEME_COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  questionText: {
    color: THEME_COLORS.textPrimary,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 24,
  },
  optionsList: {
    flex: 1,
    justifyContent: 'center',
  },
  optionBtn: {
    backgroundColor: THEME_COLORS.darkGray,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: THEME_COLORS.gray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  optionBadge: {
    backgroundColor: THEME_COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  badgeText: {
    color: THEME_COLORS.textMuted,
    fontWeight: '800',
  },
  optionText: {
    fontWeight: '600',
    flex: 1,
  },
  correctBtn: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderColor: THEME_COLORS.success,
  },
  correctBadge: {
    backgroundColor: THEME_COLORS.success,
  },
  wrongBtn: {
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderColor: THEME_COLORS.error,
  },
  wrongBadge: {
    backgroundColor: THEME_COLORS.error,
  },
  dimmedBtn: {
    opacity: 0.25,
  },
  footer: {
    justifyContent: 'center',
  },
  actionBtn: {
    backgroundColor: THEME_COLORS.accent,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: THEME_COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  actionBtnText: {
    color: THEME_COLORS.primary,
    fontWeight: '900',
    letterSpacing: 1,
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  hintText: {
    color: THEME_COLORS.textMuted,
    fontWeight: '500',
  },
});
