import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, RADIUS, SHADOW } from '../constants/theme';

type Props = { score: number; totalQuestions: number; onPlayAgain: () => void; onGoHome: () => void };

function getPerformance(percentage: number) {
  if (percentage === 100) return { title: 'GABARITOU!', message: 'Desempenho de campeão. A Fiel está bem representada!', icon: 'trophy' as const };
  if (percentage >= 75) return { title: 'JOGOU MUITO!', message: 'Você conhece de verdade a história do Timão.', icon: 'star-circle' as const };
  if (percentage >= 50) return { title: 'BOA PARTIDA!', message: 'Foi bem, mas ainda dá para buscar a classificação.', icon: 'soccer' as const };
  return { title: 'HORA DA REVANCHE', message: 'Revise a história do clube e tente novamente.', icon: 'refresh-circle' as const };
}

export default function ResultScreen({ score, totalQuestions, onPlayAgain, onGoHome }: Props) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const percentage = totalQuestions ? Math.round((score / totalQuestions) * 100) : 0;
  const performance = getPerformance(percentage);
  const maxWidth = Math.min(width - 32, 680);
  const ringSize = Math.min(Math.max(width * 0.42, 150), 205);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 26, paddingBottom: insets.bottom + 26 }]} showsVerticalScrollIndicator={false}>
      <View style={[styles.content, { width: maxWidth }]}>
        <View style={styles.kicker}><View style={styles.kickerLine} /><Text style={styles.kickerText}>FIM DE JOGO</Text><View style={styles.kickerLine} /></View>
        <MaterialCommunityIcons name={performance.icon} size={50} color={COLORS.red} />
        <Text style={styles.title}>{performance.title}</Text>
        <Text style={styles.message}>{performance.message}</Text>

        <View style={styles.resultCard}>
          <View accessibilityLabel={`${percentage} por cento de aproveitamento`} style={[styles.ring, { width: ringSize, height: ringSize, borderRadius: ringSize / 2 }]}>
            <View style={[styles.innerRing, { borderRadius: ringSize / 2 }]}>
              <Text style={styles.percentage}>{percentage}%</Text>
              <Text style={styles.percentageLabel}>APROVEITAMENTO</Text>
            </View>
          </View>
          <View style={styles.summary}>
            <View style={styles.summaryItem}><MaterialCommunityIcons name="check-circle-outline" size={22} color={COLORS.success} /><Text style={styles.summaryValue}>{score}</Text><Text style={styles.summaryLabel}>Acertos</Text></View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}><MaterialCommunityIcons name="close-circle-outline" size={22} color={COLORS.error} /><Text style={styles.summaryValue}>{totalQuestions - score}</Text><Text style={styles.summaryLabel}>Erros</Text></View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}><MaterialCommunityIcons name="clipboard-text-outline" size={22} color={COLORS.red} /><Text style={styles.summaryValue}>{totalQuestions}</Text><Text style={styles.summaryLabel}>Total</Text></View>
          </View>
        </View>

        <TouchableOpacity accessibilityRole="button" onPress={onPlayAgain} activeOpacity={0.82} style={styles.primaryButton}><MaterialCommunityIcons name="replay" size={21} color={COLORS.white} /><Text style={styles.primaryText}>JOGAR NOVAMENTE</Text></TouchableOpacity>
        <TouchableOpacity accessibilityRole="button" onPress={onGoHome} activeOpacity={0.75} style={styles.secondaryButton}><MaterialCommunityIcons name="home-outline" size={20} color={COLORS.textSoft} /><Text style={styles.secondaryText}>VOLTAR AO INÍCIO</Text></TouchableOpacity>
        <Text style={styles.footer}>TODO PODEROSO TIMÃO • 1910</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.black },
  scrollContent: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  content: { alignItems: 'center' },
  kicker: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  kickerLine: { width: 32, height: 2, backgroundColor: COLORS.red },
  kickerText: { color: COLORS.textSoft, fontWeight: '900', fontSize: 11, letterSpacing: 2.4 },
  title: { color: COLORS.white, fontSize: 34, lineHeight: 40, textAlign: 'center', fontWeight: '900', letterSpacing: -0.8, marginTop: 8 },
  message: { maxWidth: 480, color: COLORS.muted, fontSize: 15, lineHeight: 22, textAlign: 'center', marginTop: 8, marginBottom: 22 },
  resultCard: { width: '100%', alignItems: 'center', padding: 22, backgroundColor: COLORS.surface, borderRadius: RADIUS.large, borderWidth: 1, borderColor: COLORS.border, ...SHADOW },
  ring: { padding: 7, backgroundColor: COLORS.red },
  innerRing: { flex: 1, backgroundColor: COLORS.black, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.surfaceRaised },
  percentage: { color: COLORS.white, fontSize: 43, fontWeight: '900', letterSpacing: -1.5 },
  percentageLabel: { color: COLORS.muted, fontSize: 9, fontWeight: '900', letterSpacing: 1.4, marginTop: 1 },
  summary: { width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 24, paddingTop: 19, borderTopWidth: 1, borderTopColor: COLORS.border },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryValue: { color: COLORS.white, fontSize: 20, fontWeight: '900', marginTop: 4 },
  summaryLabel: { color: COLORS.muted, fontSize: 11, marginTop: 2 },
  summaryDivider: { width: 1, height: 42, backgroundColor: COLORS.border },
  primaryButton: { width: '100%', minHeight: 58, marginTop: 18, borderRadius: RADIUS.medium, backgroundColor: COLORS.red, flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: COLORS.white, fontWeight: '900', letterSpacing: 1, fontSize: 14 },
  secondaryButton: { width: '100%', minHeight: 54, marginTop: 10, borderRadius: RADIUS.medium, borderWidth: 1, borderColor: COLORS.border, flexDirection: 'row', gap: 9, alignItems: 'center', justifyContent: 'center' },
  secondaryText: { color: COLORS.textSoft, fontWeight: '800', letterSpacing: 0.8, fontSize: 13 },
  footer: { color: COLORS.muted, fontSize: 9, fontWeight: '800', letterSpacing: 1.5, marginTop: 18 },
});
