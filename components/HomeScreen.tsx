import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, RADIUS, SHADOWS, SPACING } from '../constants/theme';

type Props = { onStartQuiz: () => void; totalQuestions: number };
const CREST = 'https://upload.wikimedia.org/wikipedia/pt/thumb/a/a5/Corinthians_simbolo.svg/220px-Corinthians_simbolo.svg.png';

export default function HomeScreen({ onStartQuiz, totalQuestions }: Props) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const wide = width >= 700;
  const logoSize = Math.min(wide ? 210 : 170, width * 0.44);

  return (
    <ScrollView style={styles.page} contentContainerStyle={[styles.content, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 28 }]} showsVerticalScrollIndicator={false}>
      <View style={[styles.shell, wide && styles.shellWide]}>
        <View style={styles.eyebrow}><View style={styles.redDot} /><Text style={styles.eyebrowText}>QUIZ DO TIMÃO</Text></View>
        <View style={[styles.hero, wide && styles.heroWide]}>
          <View style={styles.copy}>
            <Text style={[styles.title, wide && styles.titleWide]}>VOCÊ CONHECE O CORINTHIANS?</Text>
            <Text style={styles.subtitle}>Entre em campo, responda às perguntas e prove que entende da história do clube.</Text>
            <Pressable accessibilityRole="button" accessibilityLabel="Iniciar quiz" onPress={onStartQuiz} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
              <Text style={styles.buttonText}>COMEÇAR DESAFIO</Text><MaterialCommunityIcons name="arrow-right" size={22} color={COLORS.white} />
            </Pressable>
          </View>
          <View style={styles.crestWrap}><View style={styles.crestHalo} /><Image source={{ uri: CREST }} style={{ width: logoSize, height: logoSize }} resizeMode="contain" accessibilityLabel="Escudo do Corinthians" /></View>
        </View>
        <View style={styles.infoCard}>
          <View style={styles.infoItem}><MaterialCommunityIcons name="help-circle-outline" size={24} color={COLORS.gold} /><Text style={styles.infoValue}>{totalQuestions}</Text><Text style={styles.infoLabel}>perguntas</Text></View>
          <View style={styles.divider} />
          <View style={styles.infoItem}><MaterialCommunityIcons name="timer-outline" size={24} color={COLORS.gold} /><Text style={styles.infoValue}>~5 min</Text><Text style={styles.infoLabel}>de partida</Text></View>
          <View style={styles.divider} />
          <View style={styles.infoItem}><MaterialCommunityIcons name="trophy-outline" size={24} color={COLORS.gold} /><Text style={styles.infoValue}>100%</Text><Text style={styles.infoLabel}>para gabaritar</Text></View>
        </View>
        <Text style={styles.footer}>VAI, CORINTHIANS! • 1910</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page:{flex:1,backgroundColor:COLORS.background}, content:{flexGrow:1,paddingHorizontal:SPACING.md}, shell:{width:'100%',maxWidth:980,alignSelf:'center',flex:1}, shellWide:{justifyContent:'center'},
  eyebrow:{flexDirection:'row',alignItems:'center',gap:8,marginBottom:SPACING.lg}, redDot:{width:9,height:9,borderRadius:5,backgroundColor:COLORS.red}, eyebrowText:{color:COLORS.muted,fontWeight:'800',fontSize:12,letterSpacing:2},
  hero:{gap:SPACING.lg},heroWide:{flexDirection:'row',alignItems:'center'},copy:{flex:1},title:{color:COLORS.white,fontSize:38,lineHeight:40,fontWeight:'900',letterSpacing:-1.5},titleWide:{fontSize:54,lineHeight:56},subtitle:{color:COLORS.muted,fontSize:16,lineHeight:24,maxWidth:520,marginTop:SPACING.md},
  button:{alignSelf:'flex-start',marginTop:SPACING.lg,backgroundColor:COLORS.red,borderRadius:RADIUS.md,paddingHorizontal:22,paddingVertical:16,flexDirection:'row',alignItems:'center',gap:12,...SHADOWS.accent},buttonText:{color:COLORS.white,fontWeight:'900',fontSize:14,letterSpacing:.7},pressed:{opacity:.78,transform:[{scale:.98}]},
  crestWrap:{flex:1,minHeight:210,alignItems:'center',justifyContent:'center'},crestHalo:{position:'absolute',width:190,height:190,borderRadius:95,backgroundColor:'rgba(215,25,32,.16)'},
  infoCard:{marginTop:SPACING.xl,backgroundColor:COLORS.surface,borderWidth:1,borderColor:COLORS.border,borderRadius:RADIUS.lg,paddingVertical:20,paddingHorizontal:12,flexDirection:'row',alignItems:'center',...SHADOWS.medium},infoItem:{flex:1,alignItems:'center',gap:4},infoValue:{color:COLORS.white,fontSize:17,fontWeight:'900'},infoLabel:{color:COLORS.muted,fontSize:11,textAlign:'center'},divider:{width:1,height:54,backgroundColor:COLORS.border},footer:{color:COLORS.border,textAlign:'center',fontWeight:'900',letterSpacing:2,marginTop:SPACING.lg,fontSize:11},
});
