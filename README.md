# Quiz do Timão

Aplicativo de quiz sobre o Sport Club Corinthians Paulista, desenvolvido com React Native, Expo 54 e TypeScript.

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
