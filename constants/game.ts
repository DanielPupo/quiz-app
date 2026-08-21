import { AchievementId, GameMode } from '../types/game';

export const GAME_RULES: Record<GameMode, { label: string; description: string; seconds: number; lives: number; questionCount?: number }> = {
  classic: { label: 'Clássico', description: 'Todas as perguntas, ritmo tranquilo.', seconds: 20, lives: 3 },
  hard: { label: 'Modo difícil', description: '15 perguntas sorteadas e apenas 12 segundos.', seconds: 12, lives: 3, questionCount: 15 },
  journey: { label: 'Jornada do Timão', description: 'Avance pelas épocas da história alvinegra.', seconds: 18, lives: 3 },
};

export const CAMPAIGNS = [
  { id: 'origins', title: 'Origens', period: '1910–1976', indexes: [0, 1, 2, 15, 23, 25, 29, 32, 36, 38] },
  { id: 'liberation', title: 'Fim do jejum', period: '1977–1989', indexes: [3, 8, 9, 10, 17, 22] },
  { id: 'national', title: 'Era nacional', period: '1990–2009', indexes: [11, 13, 16, 18, 19, 21, 24, 27, 28, 31, 34, 35, 39] },
  { id: 'world', title: 'Conquista da América', period: '2012 em diante', indexes: [4, 5, 6, 7, 12, 14, 20, 26, 30, 33, 37] },
] as const;

export const ACHIEVEMENTS: Record<AchievementId, { title: string; description: string; icon: string }> = {
  first_match: { title: 'Primeiro jogo', description: 'Conclua sua primeira partida.', icon: 'flag-checkered' },
  perfect: { title: 'Gabaritou', description: 'Acerte todas as perguntas.', icon: 'trophy' },
  fast: { title: 'Bando de loucos', description: 'Média de até 10 segundos por pergunta.', icon: 'lightning-bolt' },
  survivor: { title: 'Invicto', description: 'Termine sem perder vidas.', icon: 'shield-check' },
  historian: { title: 'Historiador da Fiel', description: 'Complete toda a jornada.', icon: 'book-open-page-variant' },
  hard_winner: { title: 'Modo casca-grossa', description: 'Faça 70% ou mais no modo difícil.', icon: 'fire' },
};

export const DEFAULT_PROGRESS = { completedCampaigns: [], unlockedAchievements: [], ranking: [], playerName: '' };

export const getExplanation = (question: string, answer: string) => {
  if (question.includes('fundado')) return 'O clube foi fundado em 1º de setembro de 1910, no bairro do Bom Retiro, em São Paulo.';
  if (question.includes('Democracia')) return 'A Democracia Corinthiana marcou os anos 1980 ao ampliar a participação dos atletas nas decisões do clube.';
  if (question.includes('2012')) return `${answer}. A campanha de 2012 terminou invicta na Libertadores e com o bicampeonato mundial.`;
  if (question.includes('1977')) return `${answer}. O título paulista de 1977 encerrou um jejum de quase 23 anos.`;
  if (question.includes('2000')) return `${answer}. O Corinthians venceu a primeira edição do Mundial de Clubes organizado pela FIFA.`;
  return `Resposta correta: ${answer}. Esse fato faz parte da história e das grandes conquistas do Corinthians.`;
};
