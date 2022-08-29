import { ReactNode, createContext, useContext } from 'react';

import {
  createGlobalStyle,
  ThemeProvider as StyledThemeProvider,
} from 'styled-components';
import { THEME_KEY } from '../core';
import { useStorage } from '../hooks';

const light = {
  name: 'light',

  // basic
  lightest: '#e2e2e2',
  light: '#b0b0b0',
  base: '#757575',
  dark: '#575757',
  darkest: '#303030',

  // gray
  gray1: '#fafafa',
  gray2: '#f8f8f8',
  gray3: '#ebebeb',
  gray4: '#d1d1d1',
  gray5: '#d1d1d1',
  gray6: '#818181',
  gray7: '#3c3c3c',
  gray8: '#202020',

  // status
  success: '#27863c',
  danger: '#e91c1c',
  warning: '#f6ca2e',
  primary: '#2c72e2',
};

const dark = {
  name: 'dark',

  // basic
  lightest: '#303030',
  light: '#575757',
  base: '#757575',
  dark: '#b0b0b0',
  darkest: '#e2e2e2',

  // gray
  gray8: '#fafafa',
  gray7: '#f8f8f8',
  gray6: '#ebebeb',
  gray5: '#d1d1d1',
  gray4: '#d1d1d1',
  gray3: '#818181',
  gray2: '#3c3c3c',
  gray1: '#202020',

  // status
  success: '#27863c',
  danger: '#e91c1c',
  warning: '#f6ca2e',
  primary: '#2c72e2',
};

export const theme = { light, dark };

export type ThemeType = typeof theme.dark;

const GlobalStyle = createGlobalStyle`
  html, body {
    background: ${(p) => (p.theme as any).gray1};
  }

  .katex, .katex * {
    color: ${(p) => (p.theme as any).darkest};
  }

  /* Works on Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${(p) => (p.theme as any).gray3};
  }

  /* Works on Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 8px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${(p) => (p.theme as any).gray3};
    border-radius: 20px;
  }
`;

const ThemeContext = createContext<{
  theme: ThemeType;
  toggle: () => void;
}>({ theme: theme.light, toggle: () => {} });

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTheme, setSelectedTheme] = useStorage(THEME_KEY, theme.light);

  return (
    <ThemeContext.Provider
      value={{
        theme: selectedTheme,
        toggle: () =>
          setSelectedTheme(
            selectedTheme.name === 'dark' ? theme.light : theme.dark,
          ),
      }}
    >
      <StyledThemeProvider theme={selectedTheme}>
        <GlobalStyle />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
