import tw from 'twin.macro';
import styled from 'styled-components';

export const ArticleRoot = styled.article`
  :is(h1, h2, h3, h4, h5, h6) {
    scroll-margin-top: 5rem;
    ${tw`flex mt-8 mb-5 font-semibold text-warmGray-800 dark:text-warmGray-200`}
  }
  img {
    ${tw`w-full mx-auto`}
  }
  hr {
    ${tw`w-1/3 text-primary`}
  }
  p {
    ${tw`mb-4`}
  }
  strong {
    ${tw`text-warmGray-800 dark:text-warmGray-200`}
  }
  blockquote code {
    ${tw`not-italic`}
  }
  :not(pre) > code {
    background: var(--syntax-background);
    white-space: nowrap;
    font-family: 'Fira Code', monospace;

    ${tw`rounded-sm mx-1 py-[2px] px-2 text-sm text-warmGray-800 dark:text-warmGray-200`}
  }
  :not(pre) > code::before,
  :not(pre) > code::after {
    content: '\`';
  }
  blockquote {
    ${tw`relative py-1 pl-[2ch] pr-[1ch] my-8 italic bg-[#42828e14] dark:bg-[#2a2e31]`};
  }
  blockquote::before {
    content: '';
    ${tw`absolute top-0 left-0 inline-block w-1 h-full bg-[color:var(--color-text)]`};
  }
  li {
    ${tw`relative my-3 pl-7`};
  }
  li::before {
    content: '—';
    ${tw`absolute left-1 opacity-90`};
  }
`;
