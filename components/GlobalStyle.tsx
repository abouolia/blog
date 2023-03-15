import { createGlobalStyle } from 'styled-components';
import tw, { GlobalStyles as BaseStyles, theme } from 'twin.macro';

const CustomStyles = createGlobalStyle`
  body.light {
    --theme: 'light';
    --color-text: #31302e;
    --color-text-secondary: #6d6f88;
    --color-background: #fdfdfd;
    --color-nav-background: transparent;
    --color-muted: #cccfd077;
    --color-heading-primary: #34384d;
    --color-heading-secondary: #08ce3a;

    --color-link-posts: #eb3b75;

    --sc-bg: #f1f1f1;
    --sc-divider-light: rgba(140, 140, 140, 0.42);
    --sc-divider-dark: rgba(140, 140, 140, 1);

    --syntax-background: hsl(60, 0%, 96%);
    --syntax-comment: hsl(0, 0%, 43.5%);
    --syntax-text: hsl(60, 0%, 20%);
    --syntax-operator: hsl(39, 0%, 17.5%);
    --syntax-string: hsl(60, 0%, 35%);
    --syntax-number: hsl(42.3, 0%, 30%);
    --syntax-primary: hsl(45, 0%, 32.5%);
    --syntax-keyword: hsl(36.3, 0%, 19%);
    --syntax-html-tag: hsl(0, 0%, 32%);
    --syntax-boolean: hsl(60, 0%, 20%);
  }
  body.dark {
    --theme: 'dark';
    --color-text: #dadfe7;
    --color-text-secondary: #dbdada;
    --color-background: #0f0d0c;
    --color-nav-background: #00000063;
    --color-muted: #2c2d2dbb;
    --color-heading-primary: #ffffff;
    --color-heading-secondary: #50fa7b;
    --color-link-posts: #d63369;

    --sc-bg: #111;
    --sc-divider-light: rgba(200, 200, 200, 0.12);
    --sc-divider-dark: rgba(200, 200, 200, 0.48);

    --syntax-background: hsl(60, 0%, 8.8%);
    --syntax-comment: hsl(0, 0%, 50.2%);
    --syntax-text: hsl(60, 0%, 80%);
    --syntax-operator: hsl(39, 0%, 92.5%);
    --syntax-string: hsl(60, 0%, 65%);
    --syntax-number: hsl(42.3, 0%, 60%);
    --syntax-primary: hsl(45, 0%, 67.5%);
    --syntax-keyword: hsl(36.3, 0%, 87.8%);
    --syntax-html-tag: hsl(33.9, 0%, 68%);
    --syntax-boolean: hsl(60, 0%, 80%);
    --docsearch-searchbox-background: #283035;
    --docsearch-muted-color: #939fb4;
    --docsearch-text-color: #d3dae6;
  }
  html,
  body,
  #__next {
    ${tw`w-full h-full`}
    --sc-width: 6px;
    scroll-behavior: smooth;
  }
  html {
    font-stretch: 25% 150%;
    line-height: 1.7;
    -webkit-font-smoothing: auto;
  }
  * {
    scrollbar-color: var(--sc-divider-light) var(--sc-bg);
  }
  ::-webkit-scrollbar {
    width: var(--sc-width);
  }
  ::-webkit-scrollbar:horizontal {
    height: var(--sc-width);
  }
  ::-webkit-scrollbar-track {
    background: var(--sc-bg);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--sc-divider-light);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--sc-divider-dark);
  }
  body {
    text-rendering: optimizeLegibility;
    color: var(--color-text);
    background: var(--color-background);
    font-weight: 400;
  }
  *::selection {
    ${tw`bg-unhovered text-warmGray-800`}
  }
  blockquote p:last-child{
    margin-bottom: 0;
  }
  code, kbd, samp, pre{
    background: rgba(255, 255, 255, 0.15);
    padding: 2px 5px;
    border-radius: 3px;
  }
`;

/**
 * Global website styles.
 * @returns {JSX.Element}
 */
export function GlobalStyles() {
  return (
    <>
      <BaseStyles />
      <CustomStyles />
    </>
  );
}
