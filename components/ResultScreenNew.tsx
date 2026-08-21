import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { THEME_COLORS } from '../constants/theme';

const { width, height } = Dimensions.get('window');

type ResultScreenProps = {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
};

const getColorByPercentage = (score: number, total: number): string => {
  const percentage = (score / total) * 100;
  if (percentage >= 80) return THEME_COLORS.success;
  if (percentage >= 50) return THEME_COLORS.accent;
  return THEME_COLORS.error;
};

export default function ResultScreen({
  score,
  totalQuestions,
  onPlayAgain,
}: ResultScreenProps) {
  const insets = useSafeAreaInsets();
  const percentage = Math.round((score / totalQuestions) * 100);

  const dynamicStyles = useMemo(() => ({
    containerPadding: Math.max(16, Math.min(32, width * 0.05)),
    fontSize: {
      emoji: Math.max(64, Math.min(120, width * 0.3)),
      title: Math.max(28, Math.min(48, width * 0.12)),
      subtitle: Math.max(16, Math.min(24, width * 0.06)),
      text: Math.max(14, Math.min(18, width * 0.045)),
      stat: Math.max(12, Math.min(16, width * 0.035)),
    },
    circleSize: Math.max(120, Math.min(200, width * 0.4)),
  }), []);

  const getMessage = () => {
    if (percentage === 100) return '🏆 Você é um CAMPEÃO!';
    if (percentage >= 80) return '⭐ Excelente desempenho!';
    if (percentage >= 60) return '👏 Muito bom!';
    if (percentage >= 40) return '💪 Pode melhorar!';
    return '🤔 Tente novamente!';
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: Math.max(insets.top + 16, 20),
          paddingHorizontal: dynamicStyles.containerPadding,
          paddingBottom: Math.max(insets.bottom + 16, 20),
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Título */}
      <View style={[styles.header, { marginBottom: dynamicStyles.containerPadding * 2 }]}>
        <MaterialCommunityIcons
          name="trophy-award"
          size={dynamicStyles.fontSize.emoji * 0.5}
          color={THEME_COLORS.accent}
        />
        <Text
          style={[
            styles.titleMain,
            { fontSize: dynamicStyles.fontSize.title, marginTop: 12 },
          ]}
        >
          RESULTADO FINAL
        </Text>
      </View>

      {/* Círculo de Percentual */}
      <View style={[styles.resultCard, { marginBottom: dynamicStyles.containerPadding * 2 }]}>
        <View
          style={[
            styles.percentageCircle,
            {
              width: dynamicStyles.circleSize,
              height: dynamicStyles.circleSize,
              borderRadius: dynamicStyles.circleSize / 2,
              borderWidth: Math.max(6, width * 0.03),
              borderColor: getColorByPercentage(score, totalQuestions),
            },
          ]}
        >
          <Text
            style={[
              styles.percentageText,
              {
                fontSize: dynamicStyles.fontSize.title * 1.2,
                color: getColorByPercentage(score, totalQuestions),
              },
            ]}
          >
            {percentage}%
          </Text>
        </View>

        {/* Pontuação */}
        <View style={[styles.scoreContainer, { marginTop: dynamicStyles.containerPadding }]}>
          <Text style={[styles.scoreLabel, { fontSize: dynamicStyles.fontSize.text }]}>
            Você acertou
          </Text>
          <Text
            style={[
              styles.scoreValue,
              {
                fontSize: dynamicStyles.fontSize.title,
                color: getColorByPercentage(score, totalQuestions),
              },
            ]}
          >
            {score} de {totalQuestions}
          </Text>
        </View>
      </View>

      {/* Mensagem Personalizada */}
      <View
        style={[
          styles.messageBox,
          {
            marginBottom: dynamicStyles.containerPadding * 2,
            backgroundColor:
              percentage >= 80
                ? 'rgba(16, 185, 129, 0.1)'
                : percentage >= 50
                  ? THEME_COLORS.goldGlow
                  : 'rgba(239, 68, 68, 0.1)',
            borderColor:
              percentage >= 80
                ? THEME_COLORS.success
                : percentage >= 50
                  ? THEME_COLORS.accent
                  : THEME_COLORS.error,
          },
        ]}
      >
        <Text
          style={[
            styles.messageText,
            {
              fontSize: dynamicStyles.fontSize.subtitle,
              color:
                percentage >= 80
                  ? THEME_COLORS.success
                  : percentage >= 50
                    ? THEME_COLORS.accent
                    : THEME_COLORS.error,
            },
          ]}
        >
          {getMessage()}
        </Text>
      </View>

      {/* Estatísticas Detalhadas */}
      <View style={[styles.statsContainer, { gap: Math.max(8, width * 0.02) }]}>
        <View
          style={[
            styles.statBox,
            {
              borderColor: THEME_COLORS.success,
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
            },
          ]}
        >
          <MaterialCommunityIcons
            name="check-circle"
            size={Math.max(20, width * 0.06)}
            color={THEME_COLORS.success}
          />
          <Text style={[styles.statLabel, { fontSize: dynamicStyles.fontSize.stat }]}>
            Acertos
          </Text>
          <Text
            style={[
              styles.statValue,
              { fontSize: dynamicStyles.fontSize.subtitle, color: THEME_COLORS.success },
            ]}
          >
            {score}
          </Text>
        </View>

        <View
          style={[
            styles.statBox,
            {
              borderColor: THEME_COLORS.error,
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
            },
          ]}
        >
          <MaterialCommunityIcons
            name="close-circle"
            size={Math.max(20, width * 0.06)}
            color={THEME_COLORS.error}
          />
          <Text style={[styles.statLabel, { fontSize: dynamicStyles.fontSize.stat }]}>
            Erros
          </Text>
          <Text
            style={[
              styles.statValue,
              { fontSize: dynamicStyles.fontSize.subtitle, color: THEME_COLORS.error },
            ]}
          >
            {totalQuestions - score}
          </Text>
        </View>

        <View
          style={[
            styles.statBox,
            {
              borderColor: THEME_COLORS.accent,
              backgroundColor: THEME_COLORS.goldGlow,
            },
          ]}
        >
          <MaterialCommunityIcons
            name="percent"
            size={Math.max(20, width * 0.06)}
            color={THEME_COLORS.accent}
          />
          <Text style={[styles.statLabel, { fontSize: dynamicStyles.fontSize.stat }]}>
            Taxa
          </Text>
          <Text
            style={[
              styles.statValue,
              { fontSize: dynamicStyles.fontSize.subtitle, color: THEME_COLORS.accent },
            ]}
          >
            {percentage}%
          </Text>
        </View>
      </View>

      {/* Botões */}
      <View style={[styles.buttonContainer, { marginTop: dynamicStyles.containerPadding * 2 }]}>
        <TouchableOpacity
          style={[
            styles.playAgainButton,
            { paddingVertical: Math.max(12, height * 0.02) },
          ]}
          onPress={onPlayAgain}
          activeOpacity={0.75}
        >
          <MaterialCommunityIcons
            name="refresh-circle"
            size={Math.max(18, width * 0.05)}
            color={THEME_COLORS.primary}
          />
          <Text
            style={[
              styles.buttonText,
              { fontSize: Math.max(14, width * 0.045) },
            ]}
          >
            JOGAR NOVAMENTE
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View
        style={[
          styles.footer,
          { marginTop: dynamicStyles.containerPadding * 1.5 },
        ]}
      >
        <Text style={[styles.footerText, { fontSize: dynamicStyles.fontSize.stat }]}>
          ⚫ ⚪ 🟡 Design Premium
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.primary,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
  },
  titleMain: {
    fontWeight: '900',
    color: THEME_COLORS.secondary,
    letterSpacing: 2,
    textAlign: 'center',
  },
  resultCard: {
    backgroundColor: THEME_COLORS.darkGray,
    borderRadius: 12,
    padding: 24,
    borderWidth: 2,
    borderColor: THEME_COLORS.accent,
    alignItems: 'center',
    shadowColor: THEME_COLORS.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  percentageCircle: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontWeight: '900',
    letterSpacing: 1,
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreLabel: {
    color: THEME_COLORS.textSecondary,
    fontWeight: '600',
    marginBottom: 4,
  },
  scoreValue: {
    fontWeight: '900',
  },
  messageBox: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    alignItems: 'center',
  },
  messageText: {
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statBox: {
    flex: 1,
    backgroundColor: THEME_COLORS.darkGray,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    marginHorizontal: 4,
  },
  statLabel: {
    color: THEME_COLORS.textMuted,
    fontWeight: '600',
    marginTop: 6,
    marginBottom: 4,
  },
  statValue: {
    fontWeight: '900',
  },
  buttonContainer: {
    gap: 12,
  },
  playAgainButton: {
    backgroundColor: THEME_COLORS.accent,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    shadowColor: THEME_COLORS.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonText: {
    color: THEME_COLORS.primary,
    fontWeight: '900',
    letterSpacing: 1,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: THEME_COLORS.gray,
  },
  footerText: {
    fontWeight: '700',
    color: THEME_COLORS.textMuted,
  },
});
