import Link from 'next/link';
import { config } from '../../config';
import { getCurrentTimeFormat } from '../../utils/formatDate';
import { NavbarThemeSwitch } from './NavbarThemeSwitch';

/**
 * Navbar.
 * @returns {JSX.Element}
 */
export function Navbar() {
  return (
    <div className="relative w-full h-16">
      <div className="fixed h-20 z-40 w-full flex justify-between backdrop-blur-[20px] backdrop-saturate-150 bg-white/50 dark:bg-[#0D0D1050]">
        <nav className="w-full sm:max-w-[75ch] m-auto sm:grid md:flex px-5 justify-between items-center">
          <div>
            <Link href="/" passHref>
              <a className="flex" title="Home" aria-label="Home">
                <NavbarAvatar />
                <NavbarTime />
              </a>
            </Link>
          </div>

          <div className="flex items-center gap-6 mt-[5px] md:mt-0">
            <Link href="/posts" passHref>
              <a className="capitalize opacity-50">Posts</a>
            </Link>
            <Link href="http://github.com/abouolia" passHref>
              <a className="opacity-75" target="_blank" rel="noreferrer">
                Github
              </a>
            </Link>
            <NavbarThemeSwitch />
          </div>
        </nav>
      </div>
    </div>
  );
}

function NavbarTime() {
  const time = getCurrentTimeFormat();

  return (
    <div className="pl-[12px] flex">
      <span className="m-auto">{time}, Tripoli, LY</span>
    </div>
  );
}

function NavbarAvatar() {
  return (
    <div className="flex">
      <img
        className="md:h-[40px] md:w-[40px] h-[20px] w-[20px] mt-auto mb-auto rounded-[3px]"
        src={config.navbarAvatar}
        alt="avatar"
      />
    </div>
  );
}
