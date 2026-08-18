/**
 * Tema Premium: Preto, Branco e Dourado
 * Paleta elegante e responsiva para todos os dispositivos
 */

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Função para escalar valores responsivos
export const scaleSize = (baseSize: number) => {
  const screenWidth = width;
  const screenHeight = height;
  const avgDimension = (screenWidth + screenHeight) / 2;
  const avgBaseSize = 400; // Dimensão base de referência
  return (baseSize * avgDimension) / avgBaseSize;
};

export const THEME_COLORS = {
  // Cores primárias
  primary: '#000000',        // Preto sólido
  secondary: '#FFFFFF',      // Branco puro
  accent: '#D4AF37',         // Dourado elegante
  
  // Variações de preto
  dark: '#0a0a0a',           // Preto super escuro
  darkGray: '#1a1a1a',       // Preto escuro
  gray: '#2d2d2d',           // Cinza escuro
  
  // Variações de dourado
  goldLight: '#E5C158',       // Dourado claro
  goldDark: '#B8860B',        // Dourado escuro
  goldGlow: 'rgba(212, 175, 55, 0.15)',  // Brilho dourado
  
  // Cores de feedback
  success: '#10B981',        // Verde para correto
  error: '#EF4444',          // Vermelho para errado
  warning: '#F59E0B',        // Amarelo para aviso
  
  // Cores de texto
  textPrimary: '#FFFFFF',    // Texto principal
  textSecondary: '#D4AF37',  // Texto secundário (dourado)
  textMuted: '#8E8E93',      // Texto desativado
  
  // Cores de border
  borderDefault: '#333333',  // Borda padrão
  borderAccent: '#D4AF37',   // Borda dourada
  borderLight: '#666666',    // Borda clara
};

/**
 * Estilos de sombra reutilizáveis
 */
export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  accent: {
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
};

/**
 * Borderradius padrão
 */
export const BORDER_RADIUS = {
  small: 8,
  medium: 12,
  large: 16,
  xlarge: 20,
};

/**
 * Tipografia
 */
export const TYPOGRAPHY = {
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 32,
    '5xl': 36,
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '900',
  },
};
