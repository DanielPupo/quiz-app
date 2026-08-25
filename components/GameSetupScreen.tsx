import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CAMPAIGNS, GAME_RULES } from '../constants/game';
import { COLORS, RADIUS } from '../constants/theme';
import { GameConfig, GameMode, PlayerProgress } from '../types/game';

type Props = { progress: PlayerProgress; totalQuestions: number; onBack: () => void; onStart: (config: GameConfig) => void };

export default function GameSetupScreen({ progress, totalQuestions, onBack, onStart }: Props) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [name, setName] = useState(progress.playerName || 'Fiel');
  const [mode, setMode] = useState<GameMode>('classic');
  const [campaignId, setCampaignId] = useState<string>(CAMPAIGNS[0].id);
  const maxWidth = Math.min(width - 28, 700);

  const start = () => {
    const rules = GAME_RULES[mode];
    const all = Array.from({ length: totalQuestions }, (_, index) => index);
    const selectedCampaign = CAMPAIGNS.find((item) => item.id === campaignId);
    const indexes = mode === 'journey'
      ? [...(selectedCampaign?.indexes ?? CAMPAIGNS[0].indexes)]
      : mode === 'hard'
        ? [...all].sort(() => Math.random() - 0.5).slice(0, rules.questionCount)
        : all;
    onStart({ mode, playerName: name.trim() || 'Fiel', campaignId: mode === 'journey' ? campaignId : undefined, questionIndexes: indexes, secondsPerQuestion: rules.seconds, initialLives: rules.lives });
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 24 }]}>
      <View style={[styles.shell, { width: maxWidth }]}>
        <View style={styles.header}><TouchableOpacity onPress={onBack} style={styles.back}><MaterialCommunityIcons name="arrow-left" size={22} color={COLORS.white} /></TouchableOpacity><Text style={styles.headerTitle}>ESCOLHA O DESAFIO</Text><View style={styles.placeholder} /></View>
        <Text style={styles.label}>SEU NOME NO RANKING</Text>
        <TextInput value={name} onChangeText={setName} maxLength={18} placeholder="Nome do jogador" placeholderTextColor={COLORS.muted} style={styles.input} />

        <Text style={styles.label}>MODO DE JOGO</Text>
        {(['classic', 'hard', 'journey'] as GameMode[]).map((item) => {
          const selected = mode === item;
          return <TouchableOpacity key={item} onPress={() => setMode(item)} style={[styles.modeCard, selected && styles.selectedCard]}><View style={[styles.radio, selected && styles.radioSelected]} /> <View style={styles.modeCopy}><Text style={styles.modeTitle}>{GAME_RULES[item].label}</Text><Text style={styles.modeDescription}>{GAME_RULES[item].description}</Text></View></TouchableOpacity>;
        })}

        {mode === 'journey' && <View style={styles.campaigns}><Text style={styles.label}>ETAPA DA JORNADA</Text>{CAMPAIGNS.map((campaign, index) => {
          const previousCompleted = index === 0 || progress.completedCampaigns.includes(CAMPAIGNS[index - 1].id);
          const completed = progress.completedCampaigns.includes(campaign.id);
          const selected = campaignId === campaign.id;
          return <TouchableOpacity key={campaign.id} disabled={!previousCompleted} onPress={() => setCampaignId(campaign.id)} style={[styles.campaign, selected && styles.selectedCard, !previousCompleted && styles.locked]}><MaterialCommunityIcons name={completed ? 'check-circle' : previousCompleted ? 'stadium' : 'lock'} size={22} color={completed ? COLORS.success : COLORS.white} /><View style={styles.modeCopy}><Text style={styles.modeTitle}>{campaign.title}</Text><Text style={styles.modeDescription}>{campaign.period} • {campaign.indexes.length} perguntas</Text></View></TouchableOpacity>;
        })}</View>}

        <View style={styles.rules}><MaterialCommunityIcons name="heart" size={20} color={COLORS.error} /><Text style={styles.rulesText}>{GAME_RULES[mode].lives} vidas</Text><View style={styles.dot} /><MaterialCommunityIcons name="timer-outline" size={20} color={COLORS.white} /><Text style={styles.rulesText}>{GAME_RULES[mode].seconds}s por pergunta</Text></View>
        <TouchableOpacity onPress={start} style={styles.start}><Text style={styles.startText}>INICIAR PARTIDA</Text><MaterialCommunityIcons name="arrow-right" size={21} color={COLORS.black} /></TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.black }, content: { flexGrow: 1, alignItems: 'center', paddingHorizontal: 14 }, shell: { gap: 10 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }, back: { width: 42, height: 42, borderRadius: 21, backgroundColor: COLORS.surface, alignItems: 'center', justifyContent: 'center' }, placeholder: { width: 42 }, headerTitle: { color: COLORS.white, fontSize: 15, fontWeight: '900', letterSpacing: 1.5 },
  label: { color: COLORS.muted, fontSize: 10, fontWeight: '900', letterSpacing: 1.7, marginTop: 8 }, input: { minHeight: 52, backgroundColor: COLORS.surface, color: COLORS.white, borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.medium, paddingHorizontal: 16, fontSize: 16, fontWeight: '700' },
  modeCard: { minHeight: 67, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: RADIUS.medium, borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.surface }, selectedCard: { borderColor: COLORS.white, backgroundColor: COLORS.surfaceRaised }, radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: COLORS.muted }, radioSelected: { borderWidth: 5, borderColor: COLORS.white }, modeCopy: { flex: 1 }, modeTitle: { color: COLORS.white, fontSize: 14, fontWeight: '900' }, modeDescription: { color: COLORS.muted, fontSize: 12, marginTop: 3 },
  campaigns: { gap: 8 }, campaign: { minHeight: 60, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.medium, backgroundColor: COLORS.surface }, locked: { opacity: 0.38 },
  rules: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, marginVertical: 8 }, rulesText: { color: COLORS.textSoft, fontSize: 12, fontWeight: '700' }, dot: { width: 3, height: 3, borderRadius: 2, backgroundColor: COLORS.muted, marginHorizontal: 5 },
  start: { minHeight: 58, borderRadius: RADIUS.medium, backgroundColor: COLORS.white, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }, startText: { color: COLORS.black, fontSize: 14, fontWeight: '900', letterSpacing: 1 },
});
