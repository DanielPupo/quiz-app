# 🎬 Como Adicionar Imagens e Sons

## 📸 Adicionando Imagens

### 1. Criar pasta de imagens
```bash
mkdir -p assets/images
```

### 2. Adicionar arquivos de imagem
Coloque as seguintes imagens em `assets/images/`:
- `corinthians-logo.png` - Logo do clube
- `corinthians-shield.png` - Escudo do clube
- `player-default.png` - Imagem padrão de jogador
- `background.png` - Background decorativo

### 3. Importar e usar no componente
```typescript
import { Image } from 'react-native';

<Image
  source={require('../assets/images/corinthians-logo.png')}
  style={{ width: 150, height: 150 }}
  resizeMode="contain"
/>
```

### Exemplo - HomeScreen melhorado
```typescript
<Image
  source={{
    uri: 'https://upload.wikimedia.org/wikipedia/pt/thumb/a/a5/Corinthians_simbolo.svg/220px-Corinthians_simbolo.svg.png',
  }}
  style={styles.logo}
  resizeMode="contain"
/>
```

---

## 🔊 Adicionando Sons

### 1. Criar pasta de sons
```bash
mkdir -p assets/sounds
```

### 2. Adicionar arquivos de áudio
Coloque os seguintes arquivos MP3 em `assets/sounds/`:
- `correct.mp3` - Som para resposta correta (200ms, tom agudo)
- `wrong.mp3` - Som para resposta errada (300ms, tom grave)
- `win.mp3` - Som de vitória (1000ms, fanfarra)

### 3. Opção 1: Usar expo-av (Recomendado)

**Já está instalado!** Apenas descomente o código no `hooks/useSound.ts`:

```typescript
import { Audio } from 'expo-av';

export const useSound = () => {
  const playCorrectSound = async () => {
    try {
      const sound = new Audio.Sound();
      await sound.loadAsync(require('../assets/sounds/correct.mp3'));
      await sound.playAsync();
    } catch (error) {
      console.log('Erro ao tocar som');
    }
  };
  
  // ... mais funções
};
```

### 4. Opção 2: Usar URLs de som online

```typescript
const playCorrectSound = async () => {
  try {
    const sound = new Audio.Sound();
    await sound.loadAsync({
      uri: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'
    });
    await sound.playAsync();
  } catch (error) {
    console.log('Erro ao tocar som');
  }
};
```

### 5. Integrar nos componentes

#### Em QuizScreenNew:
```typescript
import { useSound } from '../hooks/useSound';

export default function QuizScreenNew({ ... }) {
  const { playCorrectSound, playWrongSound } = useSound();

  const handleOptionPress = (option: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (option === currentQuestion.correctAnswer) {
      playCorrectSound(); // ← Adicione aqui
      setScore(score + 1);
    } else {
      playWrongSound(); // ← Ou aqui
    }
    setSelectedOption(option);
    setIsAnswered(true);
  };

  // ...
}
```

#### Em ResultScreenNew:
```typescript
import { useSound } from '../hooks/useSound';
import { useEffect } from 'react';

export default function ResultScreenNew({ score, totalQuestions, ... }) {
  const { playWinSound } = useSound();

  useEffect(() => {
    // Toca som quando a tela aparece
    playWinSound();
  }, [playWinSound]);

  // ...
}
```

---

## 🎯 Recursos Gratuitos para Imagens

### Sites com imagens do Corinthians:
- **Wikimedia Commons**: https://commons.wikimedia.org/
- **Pixabay**: https://pixabay.com/ (busque "Corinthians")
- **Pexels**: https://www.pexels.com/
- **Freepik**: https://www.freepik.com/ (com atribuição)

### Como usar:
1. Baixe a imagem em alta qualidade
2. Redimensione para ~200x200px usando:
   - Photoshop
   - GIMP (gratuito)
   - TinyPNG.com
   - Compressor.io

3. Salve em `assets/images/`
4. Importe e use no código

---

## 🎵 Recursos Gratuitos para Sons

### Sites com efeitos sonoros:
- **Mixkit**: https://mixkit.co/free-sound-effects/
- **Freesound**: https://freesound.org/
- **Zapsplat**: https://www.zapsplat.com/
- **BBC Sound Effects**: https://sound-effects.bbcrewind.co.uk/

### Como usar:
1. Procure por "success beep", "error sound", "victory fanfare"
2. Baixe em formato MP3
3. Nomeie como `correct.mp3`, `wrong.mp3`, `win.mp3`
4. Salve em `assets/sounds/`
5. Use no código via `expo-av`

---

## 📐 Tamanho e Formato Recomendado

### Imagens:
- **Formato**: PNG (transparência) ou JPG (fotos)
- **Tamanho**: 150x150px a 300x300px
- **Peso**: < 200KB por imagem

### Sons:
- **Formato**: MP3
- **Taxa de bits**: 128kbps
- **Duração**: 200-1000ms
- **Peso**: < 100KB por som

---

## ✅ Checklist de Implementação

- [ ] Criar pasta `assets/images/`
- [ ] Criar pasta `assets/sounds/`
- [ ] Adicionar imagens do Corinthians
- [ ] Adicionar arquivos de som
- [ ] Atualizar `useSound.ts`
- [ ] Integrar em `QuizScreenNew.tsx`
- [ ] Integrar em `ResultScreenNew.tsx`
- [ ] Testar no Expo Go
- [ ] Testar em Android/iOS

---

## 🐛 Troubleshooting

### "Módulo não encontrado"
```bash
# Reinicie o servidor
npm start
# Limpe cache Expo
expo start -c
```

### Som não funciona
- Verifique se o arquivo está em `assets/sounds/`
- Confira se o nome do arquivo está correto
- Teste o arquivo de áudio em outro player

### Imagem não carrega
- Verifique caminho do arquivo
- Teste em navegador (se for URL)
- Confira permissões de arquivo

---

## 💡 Dicas Profissionais

1. **Otimização**: Use `Image.prefetch()` para pré-carregar imagens
2. **Cache**: Expo automaticamente faz cache de imagens
3. **Performance**: Use imagens redimensionadas, não confie no app
4. **Acessibilidade**: Adicione `accessible` e `accessibilityLabel`
5. **Testes**: Use Expo Go para testar antes de compilar

---

## 🚀 Próximos Passos

1. Adicione imagens de jogadores lendários
2. Crie som de background para o quiz
3. Adicione animações com sons
4. Implemente tema de som on/off
5. Adicione efeitos sonoros nas transições

**Boa sorte! 🖤❤️**
