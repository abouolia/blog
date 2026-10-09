import Head from 'next/head';

import '../public/styles/font.css';
import '../styles/global.css';

import { Navbar } from '../components';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
      </Head>

      <div className="w-full h-full">
        <Navbar />
        <main className="w-full">
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

export default MyApp;
