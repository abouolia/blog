import Head from 'next/head';

import '../public/styles/font.css';
import '../styles/global.css';

import { config } from '../config';
import { Navbar } from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content={config.authorName} />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${config.siteTitle} RSS Feed`}
          href={`${config.siteUrl}/rss.xml`}
        />
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
