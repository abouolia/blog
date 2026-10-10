import { useEffect } from 'react';
import { setLocalStorage, getLocalStorage } from '../utils/localStorage';

export type ColorTheme = 'light' | 'dark';
export const COLOR_THEME = 'COLOR_THEME';

/**
 * Syncs the theme with body classname.
 * @param {ColorTheme} theme
 * @param {boolean} enabled - Skip syncing until the theme has been read on the client.
 */
export function useSyncThemeBodyClassname(theme: ColorTheme, enabled = true) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const bodyClass = document.body.classList;

    if (theme === 'light') {
      bodyClass.add('light');
      bodyClass.remove('dark');
    } else {
      bodyClass.add('dark');
      bodyClass.remove('light');
    }
  }, [theme, enabled]);
}

/**
 * Syncs the theme with local storage.
 * @param {ColorTheme} theme
 * @param {boolean} enabled - Skip syncing until the theme has been read on the client.
 */
export function useSyncThemeLocalStorage(theme: ColorTheme, enabled = true) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    setLocalStorage(COLOR_THEME, theme === 'dark' ? 'dark' : 'light');
  }, [theme, enabled]);
}

/**
 * Retrieve the blog current theme.
 * @returns {ColorTheme}
 */
export function getCurrentTheme(): ColorTheme {
  return getLocalStorage(COLOR_THEME, 'dark');
}
