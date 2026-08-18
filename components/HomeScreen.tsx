import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
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

const { width, height } = Dimensions.get('window');

// Cores Oficiais do Corinthians
const COLORS = {
  primary: '#000000',      // Preto
  secondary: '#FFFFFF',    // Branco
  accent: '#E60112',       // Vermelho Corinthians
  dark: '#0a0a0a',
  lightGray: '#f5f5f5',
};

type HomeScreenProps = {
  onStartQuiz: () => void;
};

export default function HomeScreen({ onStartQuiz }: HomeScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.content, { paddingTop: insets.top + 20 }]}>
        {/* Header com logo do Corinthians */}
        <View style={styles.header}>
          <View style={styles.badge}>
            <MaterialCommunityIcons name="shield-crown" size={40} color={COLORS.accent} />
          </View>
          <Text style={styles.titleMain}>CORINTHIANS</Text>
          <Text style={styles.subtitle}>Teste seus Conhecimentos!</Text>
        </View>

        {/* Imagem do Escudo */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/pt/thumb/a/a5/Corinthians_simbolo.svg/220px-Corinthians_simbolo.svg.png',
            }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Descrição do Quiz */}
        <View style={styles.descriptionCard}>
          <MaterialCommunityIcons name="information-outline" size={24} color={COLORS.accent} />
          <Text style={styles.descriptionTitle}>Sobre o Quiz</Text>
          <Text style={styles.descriptionText}>
            Você é um verdadeiro torcedor do Corinthians? Prove seus conhecimentos sobre a história,
            jogadores lendários e conquistas do nosso glorioso Sport Club Corinthians Paulista!
          </Text>
        </View>

        {/* Estatísticas */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <MaterialCommunityIcons name="help-circle" size={28} color={COLORS.accent} />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Perguntas</Text>
          </View>

          <View style={styles.statBox}>
            <MaterialCommunityIcons name="clock-outline" size={28} color={COLORS.accent} />
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Minutos</Text>
          </View>

          <View style={styles.statBox}>
            <MaterialCommunityIcons name="trophy-outline" size={28} color={COLORS.accent} />
            <Text style={styles.statNumber}>100</Text>
            <Text style={styles.statLabel}>Pontos</Text>
          </View>
        </View>

        {/* Botão principal */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={onStartQuiz}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="play-circle" size={24} color={COLORS.primary} />
          <Text style={styles.startButtonText}>INICIAR QUIZ</Text>
          <MaterialCommunityIcons name="arrow-right" size={24} color={COLORS.primary} />
        </TouchableOpacity>

        {/* Footer com branding */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Vem pro Manto! 🖤❤️
          </Text>
          <Text style={styles.footerSubtext}>
            Desde 1910 - Timão do Povo
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  badge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.dark,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.accent,
    marginBottom: 15,
  },
  titleMain: {
    fontSize: 36,
    fontWeight: '900',
    color: COLORS.secondary,
    letterSpacing: 3,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.accent,
    fontWeight: '600',
    letterSpacing: 1,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 30,
    height: 200,
  },
  logo: {
    width: 150,
    height: 150,
  },
  descriptionCard: {
    backgroundColor: COLORS.dark,
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
    alignItems: 'center',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.secondary,
    marginTop: 12,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#d0d0d0',
    lineHeight: 20,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.dark,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.accent,
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#b0b0b0',
    fontWeight: '600',
  },
  startButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginBottom: 30,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 2,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.dark,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.accent,
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#808080',
    fontWeight: '600',
  },
});
