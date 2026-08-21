import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, RADIUS } from '../constants/theme';
import questions from '../questions.json';

const LETTERS = ['A', 'B', 'C', 'D'];
type Props = {
  currentQuestionIndex: number;
  selectedOption: string | null;
  score: number;
  totalQuestions: number;
  onOptionPress: (option: string) => void;
  onNextQuestion: () => void;
  onQuit: () => void;
};

export default function QuizScreen({ currentQuestionIndex, selectedOption, score, totalQuestions, onOptionPress, onNextQuestion, onQuit }: Props) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const question = questions[currentQuestionIndex];
  const answered = selectedOption !== null;
  const selectedIsCorrect = selectedOption === question.correctAnswer;
  const maxWidth = Math.min(width - 28, 760);

  const select = (option: string) => {
    if (answered) return;
    if (Platform.OS !== 'web') {
      void Haptics.notificationAsync(option === question.correctAnswer ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error);
    }
    onOptionPress(option);
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 8 }]}>
      <View style={[styles.shell, { width: maxWidth }]}>
        <View style={styles.header}>
          <TouchableOpacity accessibilityRole="button" accessibilityLabel="Sair do quiz" onPress={onQuit} style={styles.iconButton}><MaterialCommunityIcons name="close" size={22} color={COLORS.white} /></TouchableOpacity>
          <View style={styles.roundBadge}><Text style={styles.roundText}>{currentQuestionIndex + 1}</Text><Text style={styles.roundTotal}>/{totalQuestions}</Text></View>
          <View style={styles.score}><MaterialCommunityIcons name="star-four-points" size={16} color={COLORS.white} /><Text style={styles.scoreText}>{score} acertos</Text></View>
        </View>

        <View accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: totalQuestions, now: currentQuestionIndex + 1 }} style={styles.progress}><View style={[styles.progressFill, { width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }]} /></View>

        <ScrollView style={styles.scroller} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.kicker}>PERGUNTA {String(currentQuestionIndex + 1).padStart(2, '0')}</Text>
          <Text style={styles.question}>{question.question}</Text>

          <View style={styles.options}>
            {question.options.map((option, index) => {
              const correct = option === question.correctAnswer;
              const selected = option === selectedOption;
              const stateStyle = answered && correct ? styles.correct : answered && selected ? styles.wrong : answered ? styles.dimmed : undefined;
              const badgeState = answered && correct ? styles.correctBadge : answered && selected ? styles.wrongBadge : undefined;
              return (
                <TouchableOpacity
                  key={option}
                  accessibilityRole="button"
                  accessibilityState={{ disabled: answered, selected }}
                  accessibilityLabel={`Alternativa ${LETTERS[index]}: ${option}`}
                  activeOpacity={0.8}
                  disabled={answered}
                  onPress={() => select(option)}
                  style={[styles.option, stateStyle]}
                >
                  <View style={[styles.letter, badgeState]}><Text style={styles.letterText}>{LETTERS[index]}</Text></View>
                  <Text style={styles.optionText}>{option}</Text>
                  {answered && correct && <MaterialCommunityIcons name="check-circle" size={24} color={COLORS.success} />}
                  {answered && selected && !correct && <MaterialCommunityIcons name="close-circle" size={24} color={COLORS.error} />}
                </TouchableOpacity>
              );
            })}
          </View>

          {answered && (
            <View accessibilityLiveRegion="polite" style={[styles.feedback, selectedIsCorrect ? styles.feedbackCorrect : styles.feedbackWrong]}>
              <MaterialCommunityIcons name={selectedIsCorrect ? 'check-decagram' : 'information-outline'} size={24} color={selectedIsCorrect ? COLORS.success : COLORS.error} />
              <View style={styles.feedbackCopy}>
                <Text style={[styles.feedbackTitle, { color: selectedIsCorrect ? COLORS.success : COLORS.error }]}>{selectedIsCorrect ? 'Mandou bem!' : 'Não foi dessa vez'}</Text>
                {!selectedIsCorrect && <Text style={styles.feedbackText}>Resposta certa: {question.correctAnswer}</Text>}
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.bottom}>
          {answered ? (
            <TouchableOpacity accessibilityRole="button" onPress={onNextQuestion} activeOpacity={0.82} style={styles.nextButton}>
              <Text style={styles.nextText}>{currentQuestionIndex === totalQuestions - 1 ? 'VER RESULTADO' : 'PRÓXIMA PERGUNTA'}</Text>
              <MaterialCommunityIcons name="arrow-right" size={21} color={COLORS.black} />
            </TouchableOpacity>
          ) : <Text style={styles.hint}>Escolha uma alternativa para continuar</Text>}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.black, alignItems: 'center' },
  shell: { flex: 1 },
  header: { minHeight: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconButton: { width: 42, height: 42, borderRadius: 21, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  roundBadge: { flexDirection: 'row', alignItems: 'baseline' },
  roundText: { color: COLORS.white, fontSize: 20, fontWeight: '900' },
  roundTotal: { color: COLORS.muted, fontSize: 13, fontWeight: '700' },
  score: { minWidth: 92, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 5 },
  scoreText: { color: COLORS.textSoft, fontSize: 12, fontWeight: '700' },
  progress: { height: 4, borderRadius: 2, backgroundColor: COLORS.surfaceRaised, overflow: 'hidden', marginVertical: 8 },
  progressFill: { height: '100%', backgroundColor: COLORS.white, borderRadius: 2 },
  scroller: { flex: 1 },
  scrollContent: { paddingVertical: 24 },
  kicker: { color: COLORS.textSoft, fontSize: 11, fontWeight: '900', letterSpacing: 2.2, marginBottom: 10 },
  question: { color: COLORS.white, fontSize: 25, lineHeight: 32, fontWeight: '800', letterSpacing: -0.4, marginBottom: 24 },
  options: { gap: 11 },
  option: { minHeight: 64, flexDirection: 'row', alignItems: 'center', gap: 13, padding: 11, paddingRight: 16, backgroundColor: COLORS.surface, borderRadius: RADIUS.medium, borderWidth: 1, borderColor: COLORS.border },
  letter: { width: 42, height: 42, borderRadius: 12, backgroundColor: COLORS.surfaceRaised, alignItems: 'center', justifyContent: 'center' },
  letterText: { color: COLORS.white, fontWeight: '900', fontSize: 14 },
  optionText: { flex: 1, color: COLORS.white, fontSize: 15, lineHeight: 20, fontWeight: '600' },
  correct: { borderColor: COLORS.success, backgroundColor: COLORS.successSoft },
  wrong: { borderColor: COLORS.error, backgroundColor: COLORS.errorSoft },
  dimmed: { opacity: 0.42 },
  correctBadge: { backgroundColor: COLORS.success },
  wrongBadge: { backgroundColor: COLORS.error },
  feedback: { marginTop: 16, borderRadius: RADIUS.medium, borderWidth: 1, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  feedbackCorrect: { backgroundColor: COLORS.successSoft, borderColor: COLORS.success },
  feedbackWrong: { backgroundColor: COLORS.errorSoft, borderColor: COLORS.error },
  feedbackCopy: { flex: 1 },
  feedbackTitle: { fontWeight: '900', fontSize: 15 },
  feedbackText: { color: COLORS.textSoft, marginTop: 3, fontSize: 13 },
  bottom: { minHeight: 66, justifyContent: 'center' },
  nextButton: { minHeight: 56, borderRadius: RADIUS.medium, backgroundColor: COLORS.white, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  nextText: { color: COLORS.black, fontSize: 14, fontWeight: '900', letterSpacing: 0.8 },
  hint: { color: COLORS.muted, fontSize: 12, textAlign: 'center' },
});
