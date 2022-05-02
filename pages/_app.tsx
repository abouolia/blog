import tw from 'twin.macro';
import Head from 'next/head';

import '../public/styles/font.css';
import '../public/styles/prism.css';

import { GlobalStyles, Navbar } from '../components';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <GlobalStyles />
      <AppRoot>
        <Navbar />
        <AppMainRoot>
          <Component {...pageProps} />
        </AppMainRoot>
      </AppRoot>
    </>
  );
}

const AppRoot = tw.div`w-full h-full`;
const AppMainRoot = tw.main`w-full`;

export default MyApp;
