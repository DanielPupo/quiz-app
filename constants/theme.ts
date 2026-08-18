/**
 * Configuração de Cores Oficiais do Sport Club Corinthians Paulista
 * Paleta de cores seguindo o branding oficial do clube
 */

export const CORINTHIANS_COLORS = {
  // Cores primárias oficiais
  primary: '#000000',        // Preto (cor principal)
  secondary: '#FFFFFF',      // Branco (cor secundária)
  accent: '#E60112',         // Vermelho oficial (cor de destaque)
  
  // Cores de fundo
  dark: '#0a0a0a',           // Preto mais escuro para backgrounds
  cardBg: '#1a1a1a',         // Background de cards
  
  // Cores de feedback
  success: '#10B981',        // Verde para respostas corretas
  error: '#EF4444',          // Vermelho para respostas erradas
  warning: '#F59E0B',        // Amarelo para avisos
  
  // Cores de texto
  textPrimary: '#FFFFFF',    // Texto principal
  textSecondary: '#d0d0d0',  // Texto secundário
  textMuted: '#8E8E93',      // Texto desativado/mutedo
  
  // Cores de border
  borderDefault: '#333333',  // Borda padrão
  borderAccent: '#E60112',   // Borda de destaque
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
    shadowColor: '#E60112',
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
