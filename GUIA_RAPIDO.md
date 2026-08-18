# 🎯 Guia Rápido de Uso - Corinthians Quiz App

## 🚀 Iniciar em 3 Passos

```bash
# 1. Instale dependências (já feito!)
npm install

# 2. Inicie o servidor
npm start

# 3. Escolha sua plataforma
# - Android: `a` ou `npm run android`
# - iOS: `i` ou `npm run ios`  
# - Web: `w` ou `npm run web`
# - Expo Go: Escanear QR code
```

---

## 📱 As 3 Telas do App

### Tela 1: Home (Inicial) 🏠

```
╔═══════════════════════════════════╗
║                                   ║
║      🛡️                            ║
║   CORINTHIANS                      ║
║  Teste seus Conhecimentos!         ║
║                                   ║
║   [Logo do Escudo Aqui]           ║
║                                   ║
║  ┌─────────────────────────────┐  ║
║  │ ℹ️  Sobre o Quiz             │  ║
║  │ Você é um verdadeiro         │  ║
║  │ torcedor do Corinthians?     │  ║
║  │ Prove seus conhecimentos...  │  ║
║  └─────────────────────────────┘  ║
║                                   ║
║  [12]   [5]   [100]              ║
║  Pergs. Minuts. Pontos            ║
║                                   ║
║  ┌─────────────────────────────┐  ║
║  │ ▶️  INICIAR QUIZ            │  ║
║  └─────────────────────────────┘  ║
║                                   ║
║  Vem pro Manto! 🖤❤️              ║
║  Desde 1910 - Timão do Povo       ║
║                                   ║
╚═══════════════════════════════════╝
```

**Elementos:**
- 🛡️ Escudo do Corinthians (via Wikimedia)
- 📊 Estatísticas do quiz (cards)
- 🎮 Botão vermelho "INICIAR QUIZ"
- 💬 Mensagens do club

---

### Tela 2: Quiz 🎮

```
╔═══════════════════════════════════╗
║  🛡️ SCCP      │      🏆 3 / 12   ║
╠═══════════════════════════════════╣
║                                   ║
║  PERGUNTA 3 DE 12                 ║
║  ████████░░░░░░░░░░░░░░░░ 25%    ║
║                                   ║
║ ╔──────────────────────────────┐ ║
║ │                              │ ║
║ │ Qual jogador conquistou      │ ║
║ │ o apelido de "Pé de Anjo"?   │ ║
║ │                              │ ║
║ └──────────────────────────────┘ ║
║                                   ║
║  ┌─────────────────────────────┐ ║
║  │ A │ Neto                    │ ║
║  └─────────────────────────────┘ ║
║                                   ║
║  ┌─────────────────────────────┐ ║
║  │ B │ Marcelinho Carioca ✓   │ ║  (Verde - Correto)
║  └─────────────────────────────┘ ║
║                                   ║
║  ┌─────────────────────────────┐ ║
║  │ C │ Rivelino                │ ║
║  └─────────────────────────────┘ ║
║                                   ║
║  ┌─────────────────────────────┐ ║
║  │ D │ Jadson                  │ ║
║  └─────────────────────────────┘ ║
║                                   ║
║  ┌─────────────────────────────┐ ║
║  │ PRÓXIMA PERGUNTA ➜          │ ║
║  └─────────────────────────────┘ ║
║                                   ║
╚═══════════════════════════════════╝
```

**Elementos:**
- 🛡️ Badge SCCP (preto com vermelho)
- 🏆 Placar em tempo real
- 📊 Barra de progresso (vermelho)
- ❓ Pergunta em destaque
- ✓✗ Feedback visual dinâmico
- ➜ Botão "PRÓXIMA"

**Interação:**
1. Clique em uma opção
2. Sistema mostra a resposta correta (verde)
3. Se errar, mostra em vermelho
4. Clique "PRÓXIMA" para continuar

---

### Tela 3: Resultado 🏆

```
╔═══════════════════════════════════╗
║                                   ║
║            🦅                      ║
║                                   ║
║      FIM DO QUIZ!                 ║
║                                   ║
║  ╔──────────────────────────────┐ ║
║  │                              │ ║
║  │         ┌──────────┐         │ ║
║  │         │   83%    │         │ ║
║  │         └──────────┘         │ ║
║  │                              │ ║
║  │     Você acertou             │ ║
║  │     10 de 12 perguntas      │ ║
║  │                              │ ║
║  └──────────────────────────────┘ ║
║                                   ║
║  ⭐ Excelente!                    ║
║  Você conhece bem o Timão!        ║
║                                   ║
║  ┌──────────────┬──────────────┐  ║
║  │ ✓ Acertos    │ ✗ Erros      │  ║
║  │     10       │      2       │  ║
║  └──────────────┴──────────────┘  ║
║                                   ║
║  ┌──────────────────────────────┐ ║
║  │ ↺ JOGAR NOVAMENTE           │ ║
║  └──────────────────────────────┘ ║
║                                   ║
║  Vem pro Manto! 🖤❤️              ║
║                                   ║
╚═══════════════════════════════════╝
```

**Elementos:**
- 🎉 Emoji dinâmico por performance
- 📊 Círculo de percentual (cor dinâmica)
- 💬 Mensagem personalizada
- 📈 Estatísticas (acertos/erros)
- 🔄 Botão para recomeçar

**Cores por Performance:**
```
100% = 🦅 Vermelho Corinthians  (Campeão!)
80-99% = ⭐ Verde               (Excelente)
60-79% = 🤓 Amarelo             (Bom)
40-59% = 💪 Laranja             (Pode melhorar)
<40% = 😅 Cinza                 (Tente novamente)
```

---

## 🎨 Cores Utilizadas

```
╔════════════════════════════════════════╗
║          PALETA CORINTHIANS            ║
╠════════════════════════════════════════╣
║                                        ║
║ █ Preto #000000                        ║
║   Fundo principal, texto escuro        ║
║                                        ║
║ █ Branco #FFFFFF                       ║
║   Texto principal, fundos claros       ║
║                                        ║
║ █ Vermelho #E60112 (OFICIAL)           ║
║   Destaque, botões, bordas             ║
║                                        ║
║ ════════════════════════════════════   ║
║                                        ║
║ █ Verde #10B981 - Resposta Correta    ║
║ █ Vermelho #EF4444 - Resposta Errada  ║
║ █ Amarelo #F59E0B - Avisos            ║
║                                        ║
╚════════════════════════════════════════╝
```

---

## 📊 Estrutura de Dados

### Questions.json
```typescript
[
  {
    "question": "Pergunta do quiz?",
    "options": [
      "Opção A",
      "Opção B",
      "Opção C",
      "Opção D"
    ],
    "correctAnswer": "Opção correta"
  },
  // ... mais 11 perguntas
]
```

### Estado do App (app/index.tsx)
```typescript
type AppState = 'home' | 'quiz' | 'result';

// Estados:
appState = 'home' | 'quiz' | 'result'
currentQuestionIndex = 0-11 (número da pergunta)
selectedOption = null | string (resposta selecionada)
isAnswered = true | false (respondeu?)
score = 0-12 (quantas acertou)
```

---

## 🔑 Props dos Componentes

### HomeScreen
```typescript
type HomeScreenProps = {
  onStartQuiz: () => void;  // Callback para iniciar
}

<HomeScreen onStartQuiz={handleStartQuiz} />
```

### QuizScreenNew
```typescript
type QuizScreenProps = {
  currentQuestionIndex: number;      // 0-11
  selectedOption: string | null;     // Opção selecionada
  isAnswered: boolean;               // Já respondeu?
  score: number;                     // Pontuação atual
  totalQuestions: number;            // 12
  onOptionPress: (option: string) => void;
  onNextQuestion: () => void;
}

<QuizScreenNew
  currentQuestionIndex={0}
  selectedOption={null}
  isAnswered={false}
  score={0}
  totalQuestions={12}
  onOptionPress={handleOption}
  onNextQuestion={handleNext}
/>
```

### ResultScreenNew
```typescript
type ResultScreenProps = {
  score: number;           // Pontos conseguidos
  totalQuestions: number;  // Total de perguntas
  onPlayAgain: () => void; // Callback para recomeçar
}

<ResultScreenNew
  score={10}
  totalQuestions={12}
  onPlayAgain={handlePlayAgain}
/>
```

---

## 🎬 Fluxo de Navegação

```
┌──────────────┐
│   HOME       │
│ (Inicial)    │
└──────┬───────┘
       │ clique "INICIAR QUIZ"
       ▼
┌──────────────┐
│   QUIZ       │
│ (P1 de 12)   │
└──────┬───────┘
       │ selecionar e "PRÓXIMA"
       ▼
┌──────────────┐      ┌──────────────┐
│   QUIZ       │      │   QUIZ       │
│ (P2 de 12)   │ ───► │ (P12 de 12)  │
└──────┬───────┘      └──────┬───────┘
       │                     │
       │                     │ "VER RESULTADO"
       │                     ▼
       │              ┌──────────────┐
       │              │   RESULT     │
       │              │ (83% score)  │
       │              └──────┬───────┘
       │                     │
       └─────────────────────┘
              clique "JOGAR NOVAMENTE"
```

---

## 🛠️ Customizações Rápidas

### 1. Mudar cores
Edite `constants/theme.ts`:
```typescript
export const CORINTHIANS_COLORS = {
  primary: '#000000',      // Mude aqui
  accent: '#E60112',       // Ou aqui
  success: '#10B981',      // Ou aqui
};
```

### 2. Adicionar mais perguntas
Edite `questions.json`:
```json
{
  "question": "Nova pergunta?",
  "options": ["A", "B", "C", "D"],
  "correctAnswer": "A"
}
```

### 3. Mudar tempo estimado
Em `HomeScreen.tsx`:
```typescript
<Text style={styles.statNumber}>5</Text>  // Mude 5
<Text style={styles.statLabel}>Minutos</Text>
```

### 4. Ativar sons
Em `QuizScreenNew.tsx`:
```typescript
import { useSound } from '../hooks/useSound';

const { playCorrectSound } = useSound();

// Dentro de handleOptionPress:
if (option === currentQuestion.correctAnswer) {
  playCorrectSound();  // ← Descomente
}
```

---

## 📁 Arquivos Importantes

```
📄 app/index.tsx
   └─ Navegação principal e estados

📄 components/HomeScreen.tsx
   └─ Tela de boas-vindas

📄 components/QuizScreenNew.tsx
   └─ Tela do quiz

📄 components/ResultScreenNew.tsx
   └─ Tela de resultado

📄 constants/theme.ts
   └─ Cores e estilos compartilhados

📄 hooks/useSound.ts
   └─ Gerenciador de sons

📄 questions.json
   └─ Base de perguntas
```

---

## 🐛 Resolução de Problemas

### App não inicia?
```bash
npm run reset-project
npm install
npm start
```

### Erro "module not found"?
```bash
# Reinicie Expo
npm start -c
```

### Imagem não carrega?
- Verifique caminho em `assets/images/`
- Teste URL no navegador
- Reimporte o arquivo

### Som não toca?
- Verifique `assets/sounds/`
- Descomente código em `useSound.ts`
- Teste volume do dispositivo

---

## 💡 Dicas

✓ Use Expo Go no celular para teste rápido
✓ Pressione `r` para reload no terminal
✓ Use `expo start -c` para limpar cache
✓ Visualize logs com `npm start` + console
✓ Teste em múltiplos dispositivos

---

## 📚 Referências

- [Expo Docs](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/)

---

**Pronto para começar! 🚀 Vem Pro Manto! 🖤❤️**
