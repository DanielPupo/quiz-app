# Conferência da apostila

Este documento registra como o projeto atende às etapas da apostila.

| Capítulo | Requisito | Implementação |
|---|---|---|
| 1–3 | Projeto React Native com Expo, JSX, `View`, `Text` e `StyleSheet` | Expo SDK 54, Expo Router e componentes TypeScript |
| 4 | Componentização | `HomeScreen`, `QuizScreen` e `ResultScreen` |
| 5 | Layout com StyleSheet e Flexbox | estilos responsivos em todas as telas |
| 6 | Perguntas em JSON, importação e `map()` | `questions.json` e alternativas renderizadas em `QuizScreen` |
| 7 | Estado com `useState` | estados do jogo em `app/index.tsx` |
| 8 | `onPress`, validação, bloqueio e feedback | alternativas desabilitadas e estilos verde/vermelho |
| 9 | Próxima pergunta, limpeza da rodada e placar | `nextQuestion`, `selectedOption` e `score` |
| 10 | Tela final, props e estado elevado | renderização condicional de `ResultScreen` |
| 11 | Jogar novamente | `resetQuiz` restaura pergunta, opção e placar |
| 12 | APK Android com EAS | `app.json`, `eas.json` e script `build:android:preview` |

## Roteiro de teste manual

1. Abrir o aplicativo e iniciar o desafio.
2. Selecionar uma resposta incorreta e verificar a marcação vermelha e a correta verde.
3. Confirmar que não é possível responder duas vezes à mesma pergunta.
4. Avançar e verificar que a nova rodada começa sem alternativa selecionada.
5. Concluir o quiz e conferir pontuação, acertos, erros e aproveitamento.
6. Pressionar “Jogar novamente” e confirmar que o placar volta a zero.
7. Pressionar “Voltar ao início” e confirmar o retorno à tela inicial.

## Observação sobre o APK

A geração em nuvem depende do login pessoal do responsável na conta Expo. O código e os perfis de build estão preparados; o envio do build é iniciado com `npm run build:android:preview` após `eas login`.
