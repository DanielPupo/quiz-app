import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Cores Oficiais do Corinthians
const COLORS = {
  primary: '#000000',      // Preto
  secondary: '#FFFFFF',    // Branco
  accent: '#E60112',       // Vermelho Corinthians
  dark: '#0a0a0a',
  lightGray: '#f5f5f5',
};

type ResultScreenProps = {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
};

export default function ResultScreen({
  score,
  totalQuestions,
  onPlayAgain,
}: ResultScreenProps) {
  const insets = useSafeAreaInsets();

  const percentage = Math.round((score / totalQuestions) * 100);
  const getMessage = () => {
    if (percentage === 100) return '🏆 CAMPEÃO! Você é um torcedor LENDÁRIO!';
    if (percentage >= 80) return '⭐ Excelente! Você conhece bem o Timão!';
    if (percentage >= 60) return '👏 Bom! Continue estudando a história!';
    if (percentage >= 40) return '💪 Pode melhorar! Estude mais sobre Corinthians!';
    return '🤔 Que pena! Volte a tentar!';
  };

  const getEmoji = () => {
    if (percentage === 100) return '🦅';
    if (percentage >= 80) return '⚪';
    if (percentage >= 60) return '🖤';
    if (percentage >= 40) return '❤️';
    return '😅';
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {/* Background decorativo */}
      <View style={styles.topDecoration} />

      {/* Conteúdo principal */}
      <View style={styles.content}>
        {/* Emoji/Icon */}
        <Text style={styles.emoji}>{getEmoji()}</Text>

        {/* Título */}
        <Text style={styles.title}>FIM DO QUIZ!</Text>

        {/* Card de resultado */}
        <View style={[styles.resultCard, { borderColor: getColorByPercentage(score, totalQuestions) }]}>
          {/* Círculo de percentual */}
          <View style={[styles.percentageCircle, { borderColor: getColorByPercentage(score, totalQuestions) }]}>
            <Text style={[styles.percentageText, { color: getColorByPercentage(score, totalQuestions) }]}>
              {percentage}%
            </Text>
          </View>

          {/* Pontuação */}
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>Você acertou</Text>
            <Text style={styles.scoreValue}>
              {score} de {totalQuestions}
            </Text>
            <Text style={styles.scoreSubtext}>perguntas</Text>
          </View>
        </View>

        {/* Mensagem personalizada */}
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{getMessage()}</Text>
        </View>

        {/* Detalhes de desempenho */}
        <View style={styles.statsBox}>
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="check-circle" size={24} color={COLORS.accent} />
            <View>
              <Text style={styles.statLabel}>Acertos</Text>
              <Text style={styles.statValue}>{score}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="close-circle" size={24} color="#8E8E93" />
            <View>
              <Text style={styles.statLabel}>Erros</Text>
              <Text style={styles.statValue}>{totalQuestions - score}</Text>
            </View>
          </View>
        </View>

        {/* Botão de jogar novamente */}
        <TouchableOpacity
          style={styles.playAgainButton}
          onPress={onPlayAgain}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="reload" size={22} color={COLORS.primary} />
          <Text style={styles.playAgainText}>JOGAR NOVAMENTE</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Vem Pro Manto! 🖤❤️</Text>
        </View>
      </View>
    </View>
  );
}

const getColorByPercentage = (score: number, totalQuestions: number) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  if (percentage === 100) return COLORS.accent;
  if (percentage >= 80) return '#10B981';
  if (percentage >= 60) return '#F59E0B';
  if (percentage >= 40) return '#EF4444';
  return '#8E8E93';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  topDecoration: {
    height: 120,
    backgroundColor: COLORS.dark,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.secondary,
    letterSpacing: 2,
    marginBottom: 20,
  },
  resultCard: {
    backgroundColor: COLORS.dark,
    borderRadius: 20,
    padding: 30,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.accent,
    marginBottom: 20,
  },
  percentageCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  percentageText: {
    fontSize: 48,
    fontWeight: '900',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '600',
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.secondary,
    marginBottom: 2,
  },
  scoreSubtext: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
  },
  messageBox: {
    backgroundColor: 'rgba(230, 1, 18, 0.15)',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
    width: '100%',
  },
  messageText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  statsBox: {
    backgroundColor: COLORS.dark,
    borderRadius: 12,
    padding: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
    marginBottom: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#333333',
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '600',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.secondary,
  },
  playAgainButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  playAgainText: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 1.5,
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: '700',
    textAlign: 'center',
  },
});
