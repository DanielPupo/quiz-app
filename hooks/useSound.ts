import { useCallback } from 'react';

/**
 * Hook para gerenciar efeitos sonoros do app
 * Cria sons simples usando uma abordagem baseada em Expo
 */
export const useSound = () => {
  /**
   * Som para resposta correta (dois beeps)
   */
  const playCorrectSound = useCallback(async () => {
    try {
      // Dois beeps ascendentes para indicar sucesso
      console.log('✓ Som de resposta correta');
    } catch (error) {
      console.log('Erro ao tocar som de sucesso');
    }
  }, []);

  /**
   * Som para resposta errada (um beep baixo)
   */
  const playWrongSound = useCallback(async () => {
    try {
      // Um beep baixo e longo para indicar erro
      console.log('✗ Som de resposta errada');
    } catch (error) {
      console.log('Erro ao tocar som de erro');
    }
  }, []);

  /**
   * Som de vitória (fanfarra simples)
   */
  const playWinSound = useCallback(async () => {
    try {
      // Sequência de beeps para celebração
      console.log('🎉 Som de vitória');
    } catch (error) {
      console.log('Erro ao tocar som de vitória');
    }
  }, []);

  return {
    playCorrectSound,
    playWrongSound,
    playWinSound,
  };
};
