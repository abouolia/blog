import { useEffect, useState } from 'react';
import {
  getCurrentTheme,
  useSyncThemeBodyClassname,
  useSyncThemeLocalStorage,
  ColorTheme,
} from '../../hooks/theme';

const DEFAULT_THEME: ColorTheme = 'dark';

/**
 * Navbar theme switch.
 *
 * The animation is pure CSS (see `styles/global.css`) so no animation library
 * is shipped to the client. The initial theme is applied by the inline script
 * in `_document`; the component reads it after mount to keep the server and
 * client markup in sync.
 *
 * @returns {JSX.Element}
 */
export function NavbarThemeSwitch() {
  const [theme, setTheme] = useState<ColorTheme>(DEFAULT_THEME);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTheme(getCurrentTheme());
    setIsMounted(true);
  }, []);

  // Sync the theme with the document body classname and local storage.
  useSyncThemeBodyClassname(theme, isMounted);
  useSyncThemeLocalStorage(theme, isMounted);

  const isDark = theme === 'dark';
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      className="flex items-center w-5 h-5 bg-transparent"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={label}
      title={label}
    >
      <svg
        className={`theme-switch ${
          isDark ? 'theme-switch--dark' : 'theme-switch--light'
        }`}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        color={isDark ? 'white' : 'black'}
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        aria-hidden="true"
      >
        <mask id="theme-switch-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle
            className="theme-switch__mask"
            cx="50%"
            cy="23%"
            r="9"
            fill="black"
          />
        </mask>

        <circle
          className="theme-switch__center"
          cx="12"
          cy="12"
          r="9"
          fill={isDark ? 'white' : 'black'}
          mask="url(#theme-switch-mask)"
        />

        <g className="theme-switch__lines" stroke="currentColor">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    </button>
  );
}
