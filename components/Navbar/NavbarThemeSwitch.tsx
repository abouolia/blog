import { useState, useCallback } from 'react';
import { DarkModeSwitch } from './test';
import {
  useGetTheme,
  useSyncThemeBodyClassname,
  useSyncThemeLocalStorage,
  ColorTheme,
} from '../../hooks/theme';

/**
 * Navbar theme switch.
 * @returns {JSX.Element}
 */
export function NavbarThemeSwitch() {
  const currentTheme = useGetTheme();
  const [theme, setTheme] = useState<ColorTheme>(currentTheme);

  // Sync the theme with the document body classname.
  useSyncThemeBodyClassname(theme);

  // Syncs the theme with the document local storage.
  useSyncThemeLocalStorage(theme);

  // Handle the switch theme button click.
  const handleSwitchTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return (
    <div className="flex items-center w-5 h-5 bg-transparent">
      <DarkModeSwitch
        checked={theme === 'dark'}
        onChange={handleSwitchTheme}
        moonColor="white"
        sunColor="black"
        style={{}}
      />
    </div>
  );
}
