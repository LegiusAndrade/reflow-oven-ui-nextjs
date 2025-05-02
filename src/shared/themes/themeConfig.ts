// src/shared/themes/themeConfig.ts

import { Theme } from '@mui/material';

import { DarkTheme } from './Dark';
import { LightTheme } from './Light';

export const ThemeNames = {
  LIGHT: 'light',
  DARK: 'dark',
  // HIGH_CONTRAST: 'highContrast',
} as const;

export type ThemeName = typeof ThemeNames[keyof typeof ThemeNames];

// Maps each theme name to its corresponding MUI theme object
export const themesMap: Record<ThemeName, Theme> = {
  [ThemeNames.LIGHT]: LightTheme,
  [ThemeNames.DARK]: DarkTheme,
  // [ThemeNames.HIGH_CONTRAST]: HighContrastTheme,
};
