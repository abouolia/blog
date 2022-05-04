import { useState } from 'react';
import tw from 'twin.macro';
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
  const handleSwitchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isChecked = !!(theme === 'dark');

  return (
    <NavbarThemeSwitchRoot>
      <DarkModeSwitch
        checked={isChecked}
        onChange={handleSwitchTheme}
        moonColor="white"
        sunColor="black"
        style={{}}
      />
    </NavbarThemeSwitchRoot>
  );
}

const NavbarThemeSwitchRoot = tw.div`flex items-center w-5 h-5 bg-transparent`;
