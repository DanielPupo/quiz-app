# 🖤❤️ Corinthians Quiz App

Um aplicativo React Native de quiz interativo sobre a história e curiosidades do Sport Club Corinthians Paulista, construído com Expo e TypeScript.

## 🎯 Visão Geral

Este é um quiz educativo sobre o Corinthians com:
- **12 perguntas** sobre história, jogadores lendários e conquistas
- **Design premium** seguindo as cores oficiais do clube
- **Interface responsiva** que se adapta a qualquer dispositivo
- **Feedback visual imediato** para cada resposta
- **Tela de resultado** com estatísticas detalhadas

---

## 📸 Telas do App

### 1. **Home (Inicial)**
- Logo e escudo do Corinthians
- Descrição do quiz
- Estatísticas (12 perguntas, 5 minutos, 100 pontos)
- Botão chamativo para iniciar

### 2. **Quiz**
- Barra de progresso
- Placar em tempo real
- Pergunta com 4 alternativas
- Feedback de resposta (certa/errada)
- Botão "Próxima pergunta"

### 3. **Resultado**
- Percentual de acertos com cor dinâmica
- Mensagem personalizada por performance
- Estatísticas de acertos vs erros
- Botão para jogar novamente

---

## 🛠️ Tecnologias Utilizadas

- **React Native** 0.81.5
- **Expo** 54.0.35 - Framework para desenvolvimento mobile
- **TypeScript** - Tipagem estática
- **Expo Router** 6.0.24 - Navegação
- **Expo Vector Icons** - Ícones materiais
- **React Native Safe Area Context** - Suporte a notch/gestos
- **Expo AV** - Suporte a áudio e vídeo

---

## 📦 Instalação

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn
- Expo CLI (opcional, mas recomendado)

### Passos

1. **Clonar o repositório**
```bash
cd quiz-app
```

2. **Instalar dependências**
```bash
npm install
```

3. **Iniciar o servidor de desenvolvimento**
```bash
npm start
```

4. **Executar no seu dispositivo**
   - Android: `npm run android`
   - iOS: `npm run ios`
   - Web: `npm run web`

---

## 📁 Estrutura do Projeto

```
quiz-app/
├── app/
│   ├── _layout.tsx          # Configuração de layout
│   └── index.tsx            # Página principal (navegação)
├── components/
│   ├── HomeScreen.tsx       # Tela inicial
│   ├── QuizScreenNew.tsx    # Quiz melhorado
│   ├── ResultScreenNew.tsx  # Resultado melhorado
│   ├── QuizScreen.tsx       # Quiz original (referência)
│   ├── ResultScreen.tsx     # Resultado original (referência)
│   └── ExemploUseState.tsx  # Exemplo educativo
├── constants/
│   └── theme.ts             # Paleta de cores e estilos
├── hooks/
│   └── useSound.ts          # Hook para efeitos sonoros
├── assets/
│   └── images/              # Imagens do app
├── questions.json           # Base de perguntas
├── app.json                 # Configuração Expo
├── package.json             # Dependências
├── tsconfig.json            # Configuração TypeScript
└── README.md                # Este arquivo
```

---

## 🎨 Paleta de Cores

O app usa as cores oficiais do Corinthians:

```
Preto:    #000000 (Primária)
Branco:   #FFFFFF (Secundária)
Vermelho: #E60112 (Destaque)
```

Cores de feedback:
- Verde (#10B981) - Resposta correta
- Vermelho (#EF4444) - Resposta errada
- Amarelo (#F59E0B) - Aviso

---

## 🎮 Como Jogar

1. **Tela Inicial** → Clique em "INICIAR QUIZ"
2. **Durante o Quiz**:
   - Leia a pergunta
   - Selecione uma das 4 alternativas
   - Veja o feedback (✓ ou ✗)
   - Clique "PRÓXIMA" para continuar
3. **Resultado Final** → Veja seu score e mensagem personalizada
4. **Jogar Novamente** → Clique o botão para recomeçar

---

## 📚 Perguntas do Quiz

As perguntas estão em `questions.json` e cobrem:
- Fundação do clube (1910)
- Times que inspiraram o nome
- Maiores artilheiros
- Jogadores históricos
- Conquistas e títulos

Exemplo de pergunta:
```json
{
  "question": "Em que ano foi fundado o Corinthians?",
  "options": ["1910", "1912", "1914", "1920"],
  "correctAnswer": "1910"
}
```

---

## 🔊 Sistema de Sons

O app está pronto para adicionar sons em três momentos:
1. **playCorrectSound()** - Resposta correta
2. **playWrongSound()** - Resposta errada  
3. **playWinSound()** - Fim do quiz

---

## 🎯 Componentes Principais

### HomeScreen
Responsável pela tela inicial com branding do Corinthians.

### QuizScreenNew
Gerencia a experiência do quiz com feedback visual.

### ResultScreenNew
Exibe resultados com mensagens personalizadas.

---

## 🚀 Scripts Disponíveis

```bash
npm start          # Inicia servidor de desenvolvimento
npm run android    # Constrói e executa no Android
npm run ios        # Constrói e executa no iOS
npm run web        # Executa na web
npm run lint       # Verifica código com ESLint
npm run reset      # Reseta projeto para estado inicial
```

---

## 📊 Estatísticas

- **Total de perguntas**: 12
- **Tempo estimado**: 5 minutos
- **Pontuação máxima**: 100 pontos
- **Compatibilidade**: iOS, Android, Web

---

## 📝 Melhorias Implementadas

Veja [MELHORIAS.md](./MELHORIAS.md) para um resumo detalhado de todas as mudanças e melhorias.

### Destaques:
- ✅ Tela de início com branding Corinthians
- ✅ Design premium com cores oficiais
- ✅ Feedback visual dinâmico
- ✅ Resultados personalizados
- ✅ Estrutura escalável
- ✅ TypeScript em todo projeto
- ✅ Sistema de sons pronto para integração

---

**Vem Pro Manto! 🖤❤️**
*Sport Club Corinthians Paulista - Desde 1910*
