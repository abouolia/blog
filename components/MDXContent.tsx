import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import Link from 'next/link';
import tw from 'twin.macro';
import Image from 'next/image';
import { LinkButton } from './Button';

const H2 = tw.h3`mb-3 mt-3 text-3xl font-black capitalize md:text-3xl`;
const H3 = tw.h3`mb-3 mt-3 text-3xl font-black capitalize md:text-2xl`;
const H4 = tw.h3`mb-3 mt-3 text-3xl font-black capitalize md:text-lg`;
const ImgWrap = tw.div`my-10`;
const Spacer = tw.div`h-4`;

const A = ({ href = '', ...props }) => {
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
      <LinkButton {...props} />
    </Link>
  );
};
const Img = ({ children, ...props }: { children: React.ReactNode }) => (
  <ImgWrap>
    <Image alt="" {...(props as any)} layout="fill" />
  </ImgWrap>
);

const predefinedComponents = {
  a: A,
  img: Img,
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
