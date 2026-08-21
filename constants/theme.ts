export const COLORS = {
  background: '#080808', surface: '#141414', surfaceRaised: '#1C1C1C', white: '#F7F7F5',
  muted: '#A7A7A2', border: '#30302E', red: '#D71920', redDark: '#8E1116', gold: '#D6B25E',
  success: '#35B779', error: '#F05252',
};

// Alias mantido para os componentes antigos do projeto.
export const THEME_COLORS = {
  primary: COLORS.background, secondary: COLORS.white, accent: COLORS.gold, dark: COLORS.background,
  darkGray: COLORS.surface, gray: COLORS.border, goldLight: '#E7CB89', goldDark: '#A88434',
  goldGlow: 'rgba(214, 178, 94, 0.14)', success: COLORS.success, error: COLORS.error,
  warning: '#F0A83A', textPrimary: COLORS.white, textSecondary: COLORS.gold, textMuted: COLORS.muted,
  borderDefault: COLORS.border, borderAccent: COLORS.gold, borderLight: '#51514E',
};

export const SPACING = { xs: 6, sm: 10, md: 16, lg: 24, xl: 32 };
export const RADIUS = { sm: 10, md: 16, lg: 24, pill: 999 };
export const SHADOWS = {
  small: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 2 },
  medium: { shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.28, shadowRadius: 12, elevation: 5 },
  large: { shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.32, shadowRadius: 20, elevation: 8 },
  accent: { shadowColor: COLORS.red, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.28, shadowRadius: 12, elevation: 5 },
};
export const BORDER_RADIUS = { small: RADIUS.sm, medium: RADIUS.md, large: RADIUS.lg, xlarge: 28 };
export const TYPOGRAPHY = {
  fontSize: { xs: 11, sm: 12, base: 14, lg: 16, xl: 18, '2xl': 21, '3xl': 26, '4xl': 34, '5xl': 42 },
  fontWeight: { light: '300', normal: '400', medium: '500', semibold: '600', bold: '700', extrabold: '900' },
};
