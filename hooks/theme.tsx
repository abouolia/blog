import React, { useEffect } from 'react';
import { setLocalStorage, getLocalStorage } from '../utils/localStorage';

export type ColorTheme = 'light' | 'dark';
export const COLOR_THEME = 'COLOR_THEME';

/**
 * Syncs the theme with body classname.
 * @param {ColorTheme} theme
 */
export function useSyncThemeBodyClassname(theme: ColorTheme) {
  useEffect(() => {
    const bodyClass = document.body.classList;

    if (theme === 'dark') {
      bodyClass.add('light');
      bodyClass.remove('dark');
    } else {
      bodyClass.add('dark');
      bodyClass.remove('light');
    }
  }, [theme]);
}

/**
 * Syncs the theme with local storage.
 * @param {ColorTheme} theme
 */
export function useSyncThemeLocalStorage(theme: ColorTheme) {
  useEffect(() => {
    setLocalStorage(COLOR_THEME, theme === 'dark' ? 'dark' : 'light');
  }, [theme]);
}

/**
 * Retrieve the blog current theme.
 * @returns {ColorTheme}
 */
export function getCurrentTheme(): ColorTheme {
  return getLocalStorage(COLOR_THEME, 'dark');
}

/**
 * Retrieve the blog current theme.
 * @returns {ColorTheme}
 */
export function useGetTheme(): ColorTheme {
  return getCurrentTheme();
}
