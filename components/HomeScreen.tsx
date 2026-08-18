import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { THEME_COLORS } from '../constants/theme';

const { width, height } = Dimensions.get('window');

// Detectar tipo de dispositivo
const isLargeScreen = width >= 768;
const isLandscape = width > height;

type HomeScreenProps = {
  onStartQuiz: () => void;
};

export default function HomeScreen({ onStartQuiz }: HomeScreenProps) {
  const insets = useSafeAreaInsets();

  // Estilos responsivos dinamicamente calculados
  const dynamicStyles = useMemo(() => ({
    containerPadding: Math.max(16, Math.min(32, width * 0.05)),
    headerGap: Math.max(12, width * 0.04),
    badgeSize: Math.max(60, Math.min(120, width * 0.25)),
    logoSize: Math.max(120, Math.min(200, width * 0.4)),
    fontSize: {
      title: Math.max(24, Math.min(48, width * 0.12)),
      subtitle: Math.max(14, Math.min(20, width * 0.05)),
      card: Math.max(12, Math.min(18, width * 0.04)),
      stat: Math.max(20, Math.min(32, width * 0.1)),
    },
  }), [width]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View
        style={[
          styles.content,
          {
            paddingTop: Math.max(insets.top + 16, 20),
            paddingHorizontal: dynamicStyles.containerPadding,
            paddingBottom: 40,
          },
        ]}
      >
        {/* Header */}
        <View style={[styles.header, { marginBottom: dynamicStyles.headerGap * 2 }]}>
          <View
            style={[
              styles.badge,
              {
                width: dynamicStyles.badgeSize,
                height: dynamicStyles.badgeSize,
                borderRadius: dynamicStyles.badgeSize / 2,
              },
            ]}
          >
            <MaterialCommunityIcons
              name="trophy-award"
              size={Math.max(32, dynamicStyles.badgeSize * 0.5)}
              color={THEME_COLORS.accent}
            />
          </View>

          <Text
            style={[
              styles.titleMain,
              { fontSize: dynamicStyles.fontSize.title },
            ]}
          >
            QUIZ MASTER
          </Text>
          <Text
            style={[
              styles.subtitle,
              { fontSize: dynamicStyles.fontSize.subtitle },
            ]}
          >
            Teste seus Conhecimentos
          </Text>
        </View>

        {/* Logo */}
        <View
          style={[
            styles.imageContainer,
            { height: Math.max(120, dynamicStyles.logoSize + 20) },
          ]}
        >
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/pt/thumb/a/a5/Corinthians_simbolo.svg/220px-Corinthians_simbolo.svg.png',
            }}
            style={{
              width: dynamicStyles.logoSize,
              height: dynamicStyles.logoSize,
            }}
            resizeMode="contain"
          />
        </View>

        {/* Descrição */}
        <View
          style={[
            styles.descriptionCard,
            { marginBottom: dynamicStyles.headerGap * 2 },
          ]}
        >
          <MaterialCommunityIcons
            name="information-outline"
            size={Math.max(20, width * 0.06)}
            color={THEME_COLORS.accent}
          />
          <Text
            style={[
              styles.descriptionTitle,
              { fontSize: dynamicStyles.fontSize.card + 2 },
            ]}
          >
            Sobre o Quiz
          </Text>
          <Text
            style={[
              styles.descriptionText,
              { fontSize: dynamicStyles.fontSize.card - 1 },
            ]}
          >
            Teste seus conhecimentos com 12 perguntas envolventes. Desafie-se e
            veja como você se sai!
          </Text>
        </View>

        {/* Estatísticas */}
        <View
          style={[
            styles.statsContainer,
            { gap: dynamicStyles.headerGap, marginBottom: dynamicStyles.headerGap * 2 },
          ]}
        >
          <View style={styles.statBox}>
            <MaterialCommunityIcons
              name="help-circle"
              size={Math.max(20, width * 0.07)}
              color={THEME_COLORS.accent}
            />
            <Text
              style={[
                styles.statNumber,
                { fontSize: dynamicStyles.fontSize.stat },
              ]}
            >
              12
            </Text>
            <Text
              style={[
                styles.statLabel,
                { fontSize: dynamicStyles.fontSize.card - 2 },
              ]}
            >
              Perguntas
            </Text>
          </View>

          <View style={styles.statBox}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={Math.max(20, width * 0.07)}
              color={THEME_COLORS.accent}
            />
            <Text
              style={[
                styles.statNumber,
                { fontSize: dynamicStyles.fontSize.stat },
              ]}
            >
              5
            </Text>
            <Text
              style={[
                styles.statLabel,
                { fontSize: dynamicStyles.fontSize.card - 2 },
              ]}
            >
              Minutos
            </Text>
          </View>

          <View style={styles.statBox}>
            <MaterialCommunityIcons
              name="trophy-outline"
              size={Math.max(20, width * 0.07)}
              color={THEME_COLORS.accent}
            />
            <Text
              style={[
                styles.statNumber,
                { fontSize: dynamicStyles.fontSize.stat },
              ]}
            >
              100
            </Text>
            <Text
              style={[
                styles.statLabel,
                { fontSize: dynamicStyles.fontSize.card - 2 },
              ]}
            >
              Pontos
            </Text>
          </View>
        </View>

        {/* Botão principal */}
        <TouchableOpacity
          style={[
            styles.startButton,
            { marginBottom: dynamicStyles.headerGap * 2 },
          ]}
          onPress={onStartQuiz}
          activeOpacity={0.75}
        >
          <MaterialCommunityIcons
            name="play-circle"
            size={Math.max(20, width * 0.06)}
            color={THEME_COLORS.primary}
          />
          <Text
            style={[
              styles.startButtonText,
              { fontSize: Math.max(14, width * 0.045) },
            ]}
          >
            INICIAR QUIZ
          </Text>
          <MaterialCommunityIcons
            name="arrow-right"
            size={Math.max(20, width * 0.06)}
            color={THEME_COLORS.primary}
          />
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { fontSize: dynamicStyles.fontSize.card }]}>
            Preto ▪ Branco ▪ Dourado
          </Text>
          <Text
            style={[
              styles.footerSubtext,
              { fontSize: dynamicStyles.fontSize.card - 2 },
            ]}
          >
            Design Premium & Responsivo
          </Text>
        </View>
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
  badge: {
    backgroundColor: THEME_COLORS.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: THEME_COLORS.accent,
    marginBottom: 16,
  },
  titleMain: {
    fontWeight: '900',
    color: THEME_COLORS.secondary,
    letterSpacing: 2,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    color: THEME_COLORS.accent,
    fontWeight: '600',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  descriptionCard: {
    backgroundColor: THEME_COLORS.darkGray,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: THEME_COLORS.accent,
    alignItems: 'center',
  },
  descriptionTitle: {
    fontWeight: '700',
    color: THEME_COLORS.secondary,
    marginTop: 10,
    marginBottom: 8,
  },
  descriptionText: {
    color: THEME_COLORS.textSecondary,
    lineHeight: 20,
    textAlign: 'center',
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
    borderColor: THEME_COLORS.accent,
    marginHorizontal: 4,
  },
  statNumber: {
    fontWeight: '900',
    color: THEME_COLORS.accent,
    marginVertical: 6,
  },
  statLabel: {
    color: THEME_COLORS.textMuted,
    fontWeight: '600',
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: THEME_COLORS.accent,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
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
  startButtonText: {
    color: THEME_COLORS.primary,
    fontWeight: '900',
    letterSpacing: 1,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: THEME_COLORS.gray,
  },
  footerText: {
    fontWeight: '700',
    color: THEME_COLORS.accent,
    marginBottom: 4,
  },
  footerSubtext: {
    color: THEME_COLORS.textMuted,
    fontWeight: '600',
  },
});
