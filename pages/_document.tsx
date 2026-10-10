import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link
            rel="preload"
            href="/fonts/iAWriterQuattroV.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <meta
            name="theme-color"
            content="#fdfdfd"
            media="(prefers-color-scheme: light)"
          />
          <meta
            name="theme-color"
            content="#0D0D10"
            media="(prefers-color-scheme: dark)"
          />
        </Head>
        <body>
          <Main />
          <script
            dangerouslySetInnerHTML={{
              __html: `var theme = localStorage.getItem('COLOR_THEME');
              document.body.classList.add(JSON.parse(theme) === 'light' ? 'light' : 'dark');
              `,
            }}
          />
          <NextScript />
        </body>
      </Html>
    );
  }
}
