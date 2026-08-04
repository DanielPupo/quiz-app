import React, { useState } from 'react';
import { 
  Alert, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  StatusBar,
  Dimensions
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import questions from '../questions.json';

const { width } = Dimensions.get('window');

// Cores Oficiais e Estilizadas do SCCP
const PALETTE = {
  bg: '#050505',
  cardBg: '#121212',
  cardBorder: '#222222',
  gold: '#D4AF37',
  goldGlow: 'rgba(212, 175, 55, 0.15)',
  textPrimary: '#FFFFFF',
  textMuted: '#8E8E93',
  correct: '#10B981',
  correctBg: 'rgba(16, 185, 129, 0.12)',
  wrong: '#EF4444',
  wrongBg: 'rgba(239, 68, 68, 0.12)',
};

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export default function QuizScreen() {
  // Captura os limites exatos da tela do celular (Notch/Câmera e Barra de Gestos)
  const insets = useSafeAreaInsets();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    if (option === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      Alert.alert(
        "FIM DO QUIZ! 🦅",
        `Você defendeu o Manto! Acertou ${score} de ${questions.length} perguntas.`,
        [{ text: "JOGAR NOVAMENTE", onPress: restart }]
      );
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
  };

  return (
    <View style={[
      styles.container, 
      { 
        paddingTop: Math.max(insets.top, 16), 
        paddingBottom: Math.max(insets.bottom, 16) 
      }
    ]}>
      <StatusBar barStyle="light-content" backgroundColor="#050505" translucent />

      {/* 1. CABEÇALHO COM PROTEÇÃO DE CAMERA */}
      <View style={styles.header}>
        <View style={styles.brandBadge}>
          <MaterialCommunityIcons name="shield-crown" size={16} color={PALETTE.gold} />
          <Text style={styles.brandText}>SCCP</Text>
        </View>

        <View style={styles.scoreCounter}>
          <MaterialCommunityIcons name="trophy-outline" size={18} color={PALETTE.gold} />
          <Text style={styles.scoreText}>{score} PTS</Text>
        </View>
      </View>

      {/* 2. BARRA DE PROGRESSO SLIM */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
      </View>

      <View style={styles.stepInfo}>
        <Text style={styles.stepText}>PERGUNTA {currentIndex + 1} DE {questions.length}</Text>
      </View>

      {/* 3. CARD DA PERGUNTA */}
      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      {/* 4. LISTA DE RESPOSTAS */}
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
                  <Text style={[styles.badgeText, isAnswered && isCorrect && { color: '#000' }]}>
                    {OPTION_LABELS[index] || '•'}
                  </Text>
                </View>
                <Text style={[styles.optionText, { color: textColor }]}>
                  {option}
                </Text>
              </View>

              {isAnswered && isCorrect && (
                <MaterialCommunityIcons name="check-circle" size={22} color={PALETTE.correct} />
              )}
              {isAnswered && isSelected && !isCorrect && (
                <MaterialCommunityIcons name="close-circle" size={22} color={PALETTE.wrong} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 5. ÁREA DE AÇÃO / BOTÃO INFERIOR (PROTEÇÃO CONTRA A BARRA DO CELULAR) */}
      <View style={styles.footer}>
        {isAnswered ? (
          <TouchableOpacity 
            style={styles.actionBtn} 
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text style={styles.actionBtnText}>
              {currentIndex === questions.length - 1 ? 'VER RESULTADO' : 'PRÓXIMA PERGUNTA'}
            </Text>
            <MaterialCommunityIcons name="chevron-right" size={22} color="#000" />
          </TouchableOpacity>
        ) : (
          <View style={styles.hintContainer}>
            <MaterialCommunityIcons name="gesture-tap" size={18} color={PALETTE.textMuted} />
            <Text style={styles.hintText}>Selecione uma alternativa para responder</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.bg,
    paddingHorizontal: 20,
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
    backgroundColor: PALETTE.cardBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: PALETTE.cardBorder,
  },
  brandText: {
    color: PALETTE.textPrimary,
    fontWeight: '900',
    fontSize: 13,
    letterSpacing: 2,
  },
  scoreCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: PALETTE.goldGlow,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: PALETTE.gold,
  },
  scoreText: {
    color: PALETTE.gold,
    fontWeight: '800',
    fontSize: 13,
  },
  progressTrack: {
    height: 4,
    backgroundColor: PALETTE.cardBorder,
    borderRadius: 2,
    width: '100%',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: PALETTE.gold,
  },
  stepInfo: {
    marginVertical: 12,
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
    borderRadius: 20,
    borderWidth: 1,
    borderColor: PALETTE.cardBorder,
    minHeight: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    // Efeito Flutuante
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  questionText: {
    color: PALETTE.textPrimary,
    fontSize: 19,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 28,
  },
  optionsList: {
    flex: 1,
    gap: 12,
  },
  optionBtn: {
    backgroundColor: PALETTE.cardBg,
    padding: 14,
    borderRadius: 16,
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
    borderRadius: 10,
    backgroundColor: '#1E1E1E',
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
    backgroundColor: PALETTE.gold,
    height: 52,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: PALETTE.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  actionBtnText: {
    color: '#000',
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