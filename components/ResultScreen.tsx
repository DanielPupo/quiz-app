import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, RADIUS, SHADOWS, SPACING } from '../constants/theme';

type Props={score:number;totalQuestions:number;onPlayAgain:()=>void;onGoHome:()=>void};
export default function ResultScreen({score,totalQuestions,onPlayAgain,onGoHome}:Props){
  const insets=useSafeAreaInsets(); const {width}=useWindowDimensions(); const wide=width>=700;
  const percentage=Math.round((score/totalQuestions)*100); const color=percentage>=70?COLORS.success:percentage>=40?COLORS.gold:COLORS.error;
  const message=percentage===100?'Gabaritou! Desempenho de campeão.':percentage>=70?'Mandou muito bem, Fiel!':percentage>=40?'Boa partida. Dá para buscar mais!':'Hora da revanche. Tente mais uma vez!';
  return <ScrollView style={styles.page} contentContainerStyle={[styles.content,{paddingTop:insets.top+24,paddingBottom:insets.bottom+24}]}>
    <View style={styles.shell}>
      <View style={styles.badge}><MaterialCommunityIcons name="trophy" size={32} color={COLORS.gold}/></View>
      <Text style={styles.kicker}>FIM DE JOGO</Text><Text style={[styles.title,wide&&styles.titleWide]}>{message}</Text>
      <View style={[styles.card,wide&&styles.cardWide]}>
        <View style={[styles.ring,{borderColor:color}]}><Text style={[styles.percent,{color}]}>{percentage}%</Text><Text style={styles.ringLabel}>aproveitamento</Text></View>
        <View style={styles.summary}><Text style={styles.summaryTitle}>PLACAR FINAL</Text><Text style={styles.scoreValue}><Text style={{color}}>{score}</Text> / {totalQuestions}</Text><Text style={styles.summaryText}>Você acertou {score} e errou {totalQuestions-score} {totalQuestions-score===1?'pergunta':'perguntas'}.</Text></View>
      </View>
      <View style={styles.stats}><View style={styles.stat}><MaterialCommunityIcons name="check" size={21} color={COLORS.success}/><Text style={styles.statNumber}>{score}</Text><Text style={styles.statLabel}>ACERTOS</Text></View><View style={styles.stat}><MaterialCommunityIcons name="close" size={21} color={COLORS.error}/><Text style={styles.statNumber}>{totalQuestions-score}</Text><Text style={styles.statLabel}>ERROS</Text></View><View style={styles.stat}><MaterialCommunityIcons name="star-four-points" size={21} color={COLORS.gold}/><Text style={styles.statNumber}>{score*100}</Text><Text style={styles.statLabel}>PONTOS</Text></View></View>
      <View style={[styles.actions,wide&&styles.actionsWide]}>
        <Pressable accessibilityRole="button" onPress={onPlayAgain} style={({pressed})=>[styles.primary,pressed&&styles.pressed]}><MaterialCommunityIcons name="refresh" size={21} color={COLORS.white}/><Text style={styles.primaryText}>JOGAR NOVAMENTE</Text></Pressable>
        <Pressable accessibilityRole="button" onPress={onGoHome} style={({pressed})=>[styles.secondary,pressed&&styles.pressed]}><MaterialCommunityIcons name="home-outline" size={21} color={COLORS.white}/><Text style={styles.secondaryText}>VOLTAR AO INÍCIO</Text></Pressable>
      </View>
    </View>
  </ScrollView>;
}
const styles=StyleSheet.create({
  page:{flex:1,backgroundColor:COLORS.background},content:{flexGrow:1,paddingHorizontal:SPACING.md},shell:{width:'100%',maxWidth:780,alignSelf:'center',alignItems:'center'},badge:{width:66,height:66,borderRadius:33,backgroundColor:'rgba(214,178,94,.12)',borderWidth:1,borderColor:COLORS.gold,alignItems:'center',justifyContent:'center'},kicker:{color:COLORS.red,fontSize:12,fontWeight:'900',letterSpacing:2,marginTop:18},title:{color:COLORS.white,fontSize:29,lineHeight:36,fontWeight:'900',textAlign:'center',maxWidth:650,marginTop:8},titleWide:{fontSize:40,lineHeight:48},card:{width:'100%',marginTop:SPACING.lg,padding:SPACING.lg,backgroundColor:COLORS.surface,borderRadius:RADIUS.lg,borderWidth:1,borderColor:COLORS.border,alignItems:'center',gap:SPACING.lg,...SHADOWS.large},cardWide:{flexDirection:'row',justifyContent:'center',padding:32},ring:{width:150,height:150,borderRadius:75,borderWidth:8,alignItems:'center',justifyContent:'center'},percent:{fontSize:37,fontWeight:'900'},ringLabel:{color:COLORS.muted,fontSize:11},summary:{alignItems:'center',flex:1},summaryTitle:{color:COLORS.muted,fontWeight:'900',fontSize:11,letterSpacing:1.4},scoreValue:{color:COLORS.white,fontWeight:'900',fontSize:48,marginTop:5},summaryText:{color:COLORS.muted,textAlign:'center',fontSize:14,lineHeight:21},stats:{width:'100%',flexDirection:'row',gap:10,marginTop:12},stat:{flex:1,alignItems:'center',gap:3,backgroundColor:COLORS.surface,borderRadius:RADIUS.md,borderWidth:1,borderColor:COLORS.border,paddingVertical:14},statNumber:{color:COLORS.white,fontSize:19,fontWeight:'900'},statLabel:{color:COLORS.muted,fontSize:9,fontWeight:'800',letterSpacing:.5},actions:{width:'100%',gap:10,marginTop:SPACING.lg},actionsWide:{flexDirection:'row'},primary:{flex:1,minHeight:56,borderRadius:RADIUS.md,backgroundColor:COLORS.red,alignItems:'center',justifyContent:'center',flexDirection:'row',gap:10,...SHADOWS.accent},secondary:{flex:1,minHeight:56,borderRadius:RADIUS.md,borderWidth:1,borderColor:COLORS.border,alignItems:'center',justifyContent:'center',flexDirection:'row',gap:10},primaryText:{color:COLORS.white,fontWeight:'900',fontSize:13},secondaryText:{color:COLORS.white,fontWeight:'800',fontSize:13},pressed:{opacity:.75,transform:[{scale:.99}]},
});
