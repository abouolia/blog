import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
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
