import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import Link from 'next/link';
import tw from 'twin.macro';

const H2 = tw.h3`mb-3 mt-3 text-3xl font-black capitalize md:text-3xl`;
const H3 = tw.h3`mb-3 mt-3 text-3xl font-black capitalize md:text-2xl`;
const H4 = tw.h3`mb-3 mt-3 text-3xl font-black capitalize md:text-lg`;
const ImgWrap = tw.div`my-10`;
const Spacer = tw.div`h-4`;

const predefinedComponents = {
  a: ({ href = '', ...props }) => {
    if (href.match(/http|https/)) {
      return (
        <a
          href={href}
          className="link-btn"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      );
    }
    return (
      <Link href={href} passHref>
        <a className="link-btn" {...props} />
      </Link>
    );
  },
  img: ({ children, ...props }: { children: React.ReactNode }) => (
    <ImgWrap>
      <img {...(props as any)} layout="fill" />
    </ImgWrap>
  ),
  h1: H2,
  h2: H2,
  h3: H3,
  h4: H4,
  Spacer: Spacer,
};

/**
 * MDX content.
 * @returns {JSX.Element}
 */
export function MDXContent({ components = {}, ...rest }) {
  return <MDXRemote {...rest} components={predefinedComponents} />;
}
