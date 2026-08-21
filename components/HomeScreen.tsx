import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, RADIUS, SHADOW } from '../constants/theme';

type Props = { totalQuestions: number; onStartQuiz: () => void };

function ClubMark({ size }: { size: number }) {
  return (
    <View accessible accessibilityLabel="Emblema estilizado do Corinthians" style={[styles.mark, { width: size, height: size, borderRadius: size / 2 }]}>
      <View style={[styles.markRing, { borderRadius: size / 2 }]}>
        <Text style={[styles.markTop, { fontSize: size * 0.1 }]}>SPORT CLUB</Text>
        <Text style={[styles.markLetters, { fontSize: size * 0.27 }]}>SCCP</Text>
        <View style={styles.markLine} />
        <Text style={[styles.markYear, { fontSize: size * 0.09 }]}>1910</Text>
      </View>
    </View>
  );
}

export default function HomeScreen({ totalQuestions, onStartQuiz }: Props) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const wide = width >= 720;
  const contentWidth = Math.min(width - 32, 720);
  const logoSize = Math.min(Math.max(width * 0.42, 148), 220);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 28 }]} showsVerticalScrollIndicator={false}>
      <View style={[styles.content, { width: contentWidth }]}>
        <View style={styles.eyebrow}><View style={styles.redDot} /><Text style={styles.eyebrowText}>NAÇÃO CORINTHIANA</Text></View>
        <Text style={[styles.title, wide && styles.titleWide]}>QUIZ DO{`\n`}TIMÃO</Text>
        <Text style={styles.subtitle}>História, títulos e ídolos. Mostre que você conhece o Coringão.</Text>

        <View style={styles.hero}>
          <View style={styles.heroGlow} />
          <ClubMark size={logoSize} />
        </View>

        <View style={[styles.stats, !wide && styles.statsCompact]}>
          <View style={styles.stat}><MaterialCommunityIcons name="help-circle-outline" size={22} color={COLORS.white} /><Text style={styles.statValue}>{totalQuestions}</Text><Text style={styles.statLabel}>perguntas</Text></View>
          <View style={styles.divider} />
          <View style={styles.stat}><MaterialCommunityIcons name="clock-fast" size={22} color={COLORS.white} /><Text style={styles.statValue}>~5</Text><Text style={styles.statLabel}>minutos</Text></View>
          <View style={styles.divider} />
          <View style={styles.stat}><MaterialCommunityIcons name="trophy-outline" size={22} color={COLORS.white} /><Text style={styles.statValue}>100%</Text><Text style={styles.statLabel}>é a meta</Text></View>
        </View>

        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Iniciar quiz do Corinthians" onPress={onStartQuiz} activeOpacity={0.82} style={styles.startButton}>
          <Text style={styles.startText}>COMEÇAR DESAFIO</Text>
          <View style={styles.startIcon}><MaterialCommunityIcons name="arrow-right" size={22} color={COLORS.black} /></View>
        </TouchableOpacity>
        <Text style={styles.footer}>VAI, CORINTHIANS! • DESDE 1910</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.black },
  scrollContent: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  content: { alignItems: 'center' },
  eyebrow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  redDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: COLORS.white },
  eyebrowText: { color: COLORS.textSoft, fontSize: 12, fontWeight: '800', letterSpacing: 2.2 },
  title: { color: COLORS.white, textAlign: 'center', fontSize: 44, lineHeight: 43, fontWeight: '900', letterSpacing: -1.5 },
  titleWide: { fontSize: 58, lineHeight: 56 },
  subtitle: { maxWidth: 500, color: COLORS.muted, fontSize: 16, lineHeight: 23, textAlign: 'center', marginTop: 14 },
  hero: { height: 250, width: '100%', alignItems: 'center', justifyContent: 'center' },
  heroGlow: { position: 'absolute', width: 200, height: 200, borderRadius: 100, backgroundColor: COLORS.surfaceRaised, opacity: 0.62, transform: [{ scaleX: 1.45 }] },
  mark: { padding: 9, backgroundColor: COLORS.white, borderWidth: 5, borderColor: COLORS.white, ...SHADOW },
  markRing: { flex: 1, borderWidth: 5, borderColor: COLORS.black, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.white },
  markTop: { color: COLORS.black, fontWeight: '900', letterSpacing: 2 },
  markLetters: { color: COLORS.black, fontWeight: '900', letterSpacing: -2, lineHeight: 52 },
  markLine: { width: '54%', height: 4, backgroundColor: COLORS.red, marginVertical: 3 },
  markYear: { color: COLORS.red, fontWeight: '900', letterSpacing: 3 },
  stats: { width: '100%', flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.large, paddingVertical: 18, marginBottom: 18 },
  statsCompact: { paddingHorizontal: 4 },
  stat: { flex: 1, alignItems: 'center' },
  statValue: { color: COLORS.white, fontWeight: '900', fontSize: 20, marginTop: 5 },
  statLabel: { color: COLORS.muted, fontSize: 11, marginTop: 2 },
  divider: { height: 42, width: 1, backgroundColor: COLORS.border },
  startButton: { width: '100%', minHeight: 62, borderRadius: RADIUS.medium, backgroundColor: COLORS.white, paddingLeft: 22, paddingRight: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', ...SHADOW },
  startText: { color: COLORS.black, fontWeight: '900', fontSize: 15, letterSpacing: 1.2 },
  startIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#E5E5E5', alignItems: 'center', justifyContent: 'center' },
  footer: { color: COLORS.muted, fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginTop: 18 },
});
