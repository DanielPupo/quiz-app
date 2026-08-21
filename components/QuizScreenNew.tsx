import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, RADIUS, SHADOWS, SPACING } from '../constants/theme';
import questions from '../questions.json';

type Props = { currentQuestionIndex:number; selectedOption:string|null; isAnswered:boolean; score:number; totalQuestions:number; onOptionPress:(option:string)=>void; onNextQuestion:()=>void; onGoHome:()=>void };
const LETTERS = ['A','B','C','D'];

export default function QuizScreen({ currentQuestionIndex, selectedOption, isAnswered, score, totalQuestions, onOptionPress, onNextQuestion, onGoHome }: Props) {
  const insets=useSafeAreaInsets(); const {width}=useWindowDimensions(); const wide=width>=700;
  const item=questions[currentQuestionIndex]; const progress=((currentQuestionIndex+1)/totalQuestions)*100;
  return <View style={[styles.page,{paddingTop:insets.top+12,paddingBottom:insets.bottom+12}]}>
    <View style={styles.shell}>
      <View style={styles.topbar}>
        <Pressable accessibilityRole="button" accessibilityLabel="Voltar ao início" onPress={onGoHome} style={styles.iconButton}><MaterialCommunityIcons name="arrow-left" size={22} color={COLORS.white}/></Pressable>
        <Text style={styles.brand}>QUIZ DO TIMÃO</Text>
        <View style={styles.score}><MaterialCommunityIcons name="star-four-points" size={15} color={COLORS.gold}/><Text style={styles.scoreText}>{score} pts</Text></View>
      </View>
      <View style={styles.progressMeta}><Text style={styles.progressText}>PERGUNTA {currentQuestionIndex+1} DE {totalQuestions}</Text><Text style={styles.progressText}>{Math.round(progress)}%</Text></View>
      <View style={styles.track}><View style={[styles.fill,{width:`${progress}%`}]} /></View>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={[styles.questionCard,wide&&styles.questionCardWide]}><Text style={styles.kicker}>HISTÓRIA ALVINEGRA</Text><Text style={[styles.question,wide&&styles.questionWide]}>{item.question}</Text></View>
        <View style={[styles.options,wide&&styles.optionsWide]}>{item.options.map((option,index)=>{
          const correct=option===item.correctAnswer, selected=option===selectedOption;
          return <Pressable key={option} accessibilityRole="button" accessibilityState={{disabled:isAnswered,selected}} accessibilityLabel={`Alternativa ${LETTERS[index]}: ${option}`} disabled={isAnswered} onPress={()=>onOptionPress(option)} style={({pressed})=>[styles.option,wide&&styles.optionWide,correct&&isAnswered&&styles.correct,selected&&!correct&&styles.wrong,isAnswered&&!correct&&!selected&&styles.dimmed,pressed&&styles.pressed]}>
            <View style={[styles.letter,correct&&isAnswered&&styles.correctLetter,selected&&!correct&&styles.wrongLetter]}><Text style={styles.letterText}>{LETTERS[index]}</Text></View><Text style={styles.optionText}>{option}</Text>
            {isAnswered&&correct&&<MaterialCommunityIcons name="check-circle" size={23} color={COLORS.success}/>} {isAnswered&&selected&&!correct&&<MaterialCommunityIcons name="close-circle" size={23} color={COLORS.error}/>}
          </Pressable>})}</View>
        {isAnswered&&<View style={styles.feedback}><Text style={styles.feedbackText}>{selectedOption===item.correctAnswer?'Boa! Resposta correta.':'Não foi dessa vez. A resposta certa está marcada.'}</Text></View>}
      </ScrollView>
      <Pressable accessibilityRole="button" disabled={!isAnswered} onPress={onNextQuestion} style={({pressed})=>[styles.next,!isAnswered&&styles.nextDisabled,pressed&&styles.pressed]}><Text style={styles.nextText}>{currentQuestionIndex===totalQuestions-1?'VER RESULTADO':'PRÓXIMA PERGUNTA'}</Text><MaterialCommunityIcons name="arrow-right" size={21} color={COLORS.white}/></Pressable>
    </View>
  </View>;
}

const styles=StyleSheet.create({
  page:{flex:1,backgroundColor:COLORS.background,paddingHorizontal:SPACING.md},shell:{flex:1,width:'100%',maxWidth:900,alignSelf:'center'},topbar:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:10},iconButton:{width:42,height:42,borderRadius:21,borderWidth:1,borderColor:COLORS.border,alignItems:'center',justifyContent:'center'},brand:{color:COLORS.white,fontWeight:'900',fontSize:13,letterSpacing:1.6},score:{flexDirection:'row',alignItems:'center',gap:6,backgroundColor:COLORS.surface,paddingHorizontal:12,paddingVertical:8,borderRadius:RADIUS.pill},scoreText:{color:COLORS.gold,fontWeight:'800'},progressMeta:{flexDirection:'row',justifyContent:'space-between',marginTop:20,marginBottom:8},progressText:{color:COLORS.muted,fontSize:11,fontWeight:'800',letterSpacing:.8},track:{height:5,backgroundColor:COLORS.border,borderRadius:3,overflow:'hidden'},fill:{height:'100%',backgroundColor:COLORS.red},scroll:{paddingVertical:SPACING.lg},questionCard:{backgroundColor:COLORS.surface,borderRadius:RADIUS.lg,borderWidth:1,borderColor:COLORS.border,padding:SPACING.lg,...SHADOWS.medium},questionCardWide:{padding:32},kicker:{color:COLORS.red,fontWeight:'900',letterSpacing:1.5,fontSize:11,marginBottom:10},question:{color:COLORS.white,fontWeight:'900',fontSize:24,lineHeight:31},questionWide:{fontSize:31,lineHeight:39},options:{gap:10,marginTop:SPACING.md},optionsWide:{flexDirection:'row',flexWrap:'wrap'},option:{minHeight:68,flexDirection:'row',alignItems:'center',gap:13,backgroundColor:COLORS.surfaceRaised,borderWidth:1,borderColor:COLORS.border,borderRadius:RADIUS.md,padding:12},optionWide:{width:'49%',flexGrow:1},letter:{width:38,height:38,borderRadius:RADIUS.sm,backgroundColor:COLORS.background,alignItems:'center',justifyContent:'center'},letterText:{color:COLORS.white,fontWeight:'900'},optionText:{flex:1,color:COLORS.white,fontWeight:'700',fontSize:15,lineHeight:20},correct:{borderColor:COLORS.success,backgroundColor:'rgba(53,183,121,.11)'},wrong:{borderColor:COLORS.error,backgroundColor:'rgba(240,82,82,.11)'},correctLetter:{backgroundColor:COLORS.success},wrongLetter:{backgroundColor:COLORS.error},dimmed:{opacity:.42},pressed:{opacity:.72,transform:[{scale:.99}]},feedback:{marginTop:12,padding:12,borderRadius:RADIUS.sm,backgroundColor:COLORS.surface},feedbackText:{color:COLORS.muted,textAlign:'center',fontSize:13},next:{backgroundColor:COLORS.red,borderRadius:RADIUS.md,minHeight:54,alignItems:'center',justifyContent:'center',flexDirection:'row',gap:10,...SHADOWS.accent},nextDisabled:{backgroundColor:COLORS.surface,borderWidth:1,borderColor:COLORS.border,shadowOpacity:0},nextText:{color:COLORS.white,fontWeight:'900',fontSize:13,letterSpacing:.8},
});
