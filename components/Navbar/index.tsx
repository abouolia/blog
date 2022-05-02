import Link from 'next/link';
import tw from 'twin.macro';
import { config } from '../../config';
import { NavbarRssIcon } from './NavbarRSSIcon';
import { getCurrentTimeFormat } from '../../utils/formatDate';
import { NavbarThemeSwitch } from './NavbarThemeSwitch';
// import { NavbarThemeSwitch } from './NavbarThemeSwitch';
// import { NavbarDocSearch } from './NavbarDocSearch';

/**
 * Navbar.
 * @returns {JSX.Element}
 */
export function Navbar() {
  return (
    <NavHeader>
      <NavHeaderInner>
        <NavHeaderNav>
          <NavLeftSide>
            <Link href="/" passHref>
              <NavHeaderSiteLink title="Home" aria-label="Home">
                <NavbarAvatar />
                <NavbarTime />
              </NavHeaderSiteLink>
            </Link>
          </NavLeftSide>

          <NavRightSide>
            {config.navbarRoutes.map(({ route, title }) => (
              <NavHeaderItemLink key={route} href={route}>
                {title}
              </NavHeaderItemLink>
            ))}
            <NavbarRssIcon />
            <NavbarThemeSwitch />
            {/* <NavbarDocSearch /> */}
          </NavRightSide>
        </NavHeaderNav>
      </NavHeaderInner>
    </NavHeader>
  );
}

function NavbarTime() {
  const time = getCurrentTimeFormat();

  return (
    <NavTimeRoot>
      <NavTimeText>{time}, Tripoli, LY</NavTimeText>
    </NavTimeRoot>
  );
}

function NavbarAvatar() {
  return (
    <NavAvatarRoot>
      <NavAvatarImg src={config.navbarAvatar} />
    </NavAvatarRoot>
  );
}

const NavHeader = tw.div`relative w-full h-16`;
const NavHeaderInner = tw.div`
  fixed
  h-20
  z-40
  w-full
  flex
  justify-between
  backdrop-blur-[20px]
  backdrop-saturate-150
  bg-white/50
  dark:bg-[#0D0D1050]
`;
const NavHeaderNav = tw.nav`
  w-full
  sm:max-w-[75ch]
  m-auto
  sm:grid
  md:flex
  px-5
  justify-between
  items-center
`;
const NavRightSide = tw.div`
  flex
  items-center
  gap-6
  mt-[5px]
  md:mt-0
`;
const NavHeaderItemLink = tw(Link)`
  capitalize
  opacity-50
`;
const NavHeaderSiteLink = tw.a`flex`;
const NavLeftSide = tw.div``;

const NavAvatarRoot = tw.div`flex`;
const NavAvatarImg = tw.img`
  md:h-[40px]
  md:w-[40px]
  h-[20px]
  w-[20px]
  mt-auto
  mb-auto
  rounded-[3px]
`;
const NavTimeRoot = tw.div`
  pl-[12px]
  flex
`;
const NavTimeText = tw.span`m-auto`;
