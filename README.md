# Quiz do Timão

Aplicativo de quiz sobre a história do Sport Club Corinthians Paulista, desenvolvido com React Native, Expo SDK 54 e TypeScript. O projeto funciona no Expo Go, na web e como APK Android instalável.

## Funcionalidade adicional: desafio sob pressão

Além do quiz tradicional, o jogo combina **sistema de vidas, cronômetro por pergunta e bônus de velocidade**. O jogador começa com três vidas. Cada erro ou tempo esgotado remove uma vida; a partida termina quando elas acabam. Respostas corretas somam 100 pontos mais um bônus proporcional aos segundos restantes, criando uma decisão simples entre responder rápido e pensar com cuidado.

O recurso usa `useEffect` e `setInterval` para controlar o relógio somente durante uma pergunta ativa. O intervalo é limpo quando a pergunta é respondida, quando o jogador avança ou quando sai da partida. O estado especial de tempo esgotado também recebe feedback próprio, deixando claro por que a vida foi perdida.

## Pesquisa e aprendizados

Pesquisei a documentação do Expo SDK 54 e os Hooks do React para entender o ciclo de vida do timer, a limpeza de efeitos e a integração do AsyncStorage. Também consultei a documentação do EAS Build para configurar um perfil `preview` que produz `.apk`, em vez do `.aab` padrão de lojas. O principal aprendizado foi manter a regra do jogo no fluxo de estado (`app/index.tsx`) e deixar as telas responsáveis apenas pela apresentação e interação.

## Demonstração

Para registrar a evidência da entrega, abra o app e siga este roteiro:

1. Na home, toque em **Começar desafio** e informe um nome.
2. Escolha **Modo difícil** para ver 12 segundos por pergunta e perguntas sorteadas.
3. Aguarde o relógio zerar ou erre uma alternativa para demonstrar a perda de vida.
4. Responda corretamente antes do fim do tempo para demonstrar o bônus de velocidade.
5. Na tela final, capture a pontuação, o ranking local e as conquistas.


## Vídeo de Demonstração do aplicativo
![Demonstração do Quiz do Timão](assets/iPhone-13-PRO-localhost-334i6s1wiun4yg.webm)

## Funcionalidades

- 12 perguntas de múltipla escolha;
- pontuação e progresso em tempo real;
- feedback imediato com a resposta correta;
- resultado com percentual, acertos e erros;
- reinício do quiz e retorno à tela inicial;
- interface responsiva para celular, tablet e web;
- acessibilidade básica e feedback tátil em dispositivos compatíveis;
- funcionamento do fluxo principal sem depender de imagens externas.
- jornada histórica com quatro etapas desbloqueáveis;
- modo difícil com perguntas sorteadas;
- três vidas, cronômetro e bônus de velocidade;
- explicações históricas após cada resposta;
- conquistas e ranking local persistentes;
- cartão de resultado compartilhável.

## Organização do código

- `constants/game.ts`: regras, jornadas, conquistas e explicações;
- `types/game.ts`: contratos de dados do jogo;
- `services/progressStorage.ts`: leitura e gravação do progresso local;
- `components/`: telas e apresentação;
- `app/index.tsx`: fluxo e estado da partida.

## Executar

```bash
npm install
npm start
```

Também estão disponíveis `npm run android`, `npm run ios`, `npm run web` e `npm run lint`.

## Gerar o APK

O projeto usa o EAS Build. É necessário ter uma conta Expo autenticada e o Node.js 20.19 ou superior:

```bash
npx eas-cli@latest login
npm run build:apk
```

O perfil `preview` está configurado para `android.buildType: apk`. Ao final, o EAS fornece um link para baixar e instalar o arquivo no Android. Para uma versão de loja, use o perfil `production`, que gera o formato recomendado `.aab`.
