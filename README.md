# Quiz do Timão

Aplicativo de quiz sobre o Sport Club Corinthians Paulista, desenvolvido em React Native, Expo e TypeScript conforme a apostila de Programação para Dispositivos Móveis.

## Funcionalidades

- 40 perguntas carregadas de `questions.json`;
- alternativas geradas com `map()`;
- estado controlado pelo componente pai em `app/index.tsx`;
- bloqueio das alternativas após a resposta;
- feedback visual para resposta correta e incorreta;
- placar e progresso durante a partida;
- tela de resultado com acertos, erros e aproveitamento;
- botão para jogar novamente e reiniciar todos os estados;
- tela inicial e identidade visual inspirada no Corinthians;
- layout responsivo e recursos de acessibilidade;
- configuração EAS para gerar APK Android.

## Executar o projeto

Requer Node.js 20.19 ou superior, versão mínima indicada pelo Expo SDK 54.

```bash
npm install
npm start
```

Depois, abra no Expo Go ou utilize:

```bash
npm run android
npm run ios
npm run web
```

## Validar o código

```bash
npm run check
```

Esse comando executa ESLint e a verificação do TypeScript.

## Gerar o APK com EAS

O projeto já possui `eas.json`, identificador Android, ícone e splash. Com uma conta Expo conectada:

```bash
npm install -g eas-cli
eas login
npm run build:android:preview
```

O perfil `preview` gera um APK de distribuição interna, adequado para instalação direta em dispositivos Android.

## Estrutura principal

```text
app/index.tsx                 estado e fluxo das telas
components/HomeScreen.tsx    tela inicial
components/QuizScreen.tsx    pergunta, alternativas e feedback
components/ResultScreen.tsx  resultado e reinício
constants/theme.ts           tokens visuais
questions.json               banco de perguntas
app.json                     configuração Expo/Android
eas.json                     perfis de build
```

Veja também [PROJETO_APOSTILA.md](./PROJETO_APOSTILA.md) para a correspondência entre os capítulos e a implementação.
