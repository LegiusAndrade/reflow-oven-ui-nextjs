'use client';
import React, { createContext, useCallback, useContext, useMemo } from 'react';

import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { ThemeName, ThemeNames, themesMap } from '@/shared/themes';

// Interface that defines the shape of the Theme Context
interface IThemeContextData {
  themeName: ThemeName;
  toggleTheme: () => void;
}

// Props for the ThemeProvider component
export interface IThemeProviderProps {
  children: React.ReactNode;
}

// Create the context with an initial empty object casted to our interface
const ThemeContext = createContext({} as IThemeContextData);

// Hook to consume the context from any component
export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};

// Main provider component that wraps the app and manages theme state
export const AppThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
  // Local state to track the current theme
  const [themeName, setThemeName] = React.useState<ThemeName>(ThemeNames.LIGHT);

  // Function to toggle the theme between light and dark
  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) => (oldThemeName === ThemeNames.LIGHT ? ThemeNames.DARK : ThemeNames.LIGHT));
  }, []);

  // Memoize the current theme object to avoid recalculating on every render
  const theme = useMemo(() => themesMap[themeName], [themeName]);

  return (
    // Provide theme state and toggle function to the app
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        {/* Apply theme background color and take full screen */}
        <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
