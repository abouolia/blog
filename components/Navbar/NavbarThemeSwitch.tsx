import { useEffect, useState } from 'react';
import { DarkModeSwitch } from './test';
// import { setLocalStorage } from '../../utils/localStorage';

type ColorTheme = 'light' | 'dark';

export function NavbarThemeSwitch() {
  const COLOR_THEME = 'theme';
  const [theme, setTheme] = useState<ColorTheme>('dark');

  useEffect(() => {
    const theme = (document.body.getAttribute('class') as ColorTheme) || 'dark';
    setTheme(theme);
  }, []);

  const switchTheme = () => {
    const bodyClass = document.body.classList;

    if (theme === 'dark') {
      setTheme('light');
      // setLocalStorage(COLOR_THEME, 'light');

      bodyClass.add('light');
      bodyClass.remove('dark');
    } else {
      setTheme('dark');
      // setLocalStorage(COLOR_THEME, 'dark');

      bodyClass.add('dark');
      bodyClass.remove('light');
    }
  };

  return (
    <div className="flex items-center w-5 h-5 bg-transparent">
      <DarkModeSwitch
        checked={theme === 'dark'}
        onChange={switchTheme}
        moonColor="white"
        sunColor="black"
      />
    </div>
  );
}
