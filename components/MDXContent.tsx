import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import Image from 'next/image';
import Link from 'next/link';
import tw from 'twin.macro';
import toNumber from 'lodash.tonumber';
import Gist from 'react-gist';
import { LinkButton } from './Button';

const H2 = tw.h2`mb-4 mt-4 text-2xl font-black capitalize sm:text-3xl`;
const H3 = tw.h3`mb-4 mt-4 text-2xl font-black capitalize sm:text-2xl`;
const H4 = tw.h4`mb-3 mt-3 text-xl font-black capitalize sm:text-2xl`;
const Divider = tw.div`h-px bg-white mx-4 my-4 opacity-10`;
const PictureCaption = tw.div`text-xs text-center opacity-50 mt-1`;
const PictureWrap = tw.div`mb-4`;
const Spacer = tw.div`h-4`;

const A = ({ href = '', ...props }) => {
  if (href.match(/http|https/)) {
    return (
      <LinkButton
        href={href}
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

const GistCode = ({ id }) => {
  return (
    <p>
      <Gist id={id} />
    </p>
  );
};

interface PictureProps {
  src: string;
  alt: string;

  caption?: string;
  width?: number | string;
  height?: number | string;
}

const Picture = ({
  src,
  alt,
  caption,
  width = 775,
  height = 300,
}: PictureProps) => {
  const computedWidth = Math.max(toNumber(width), 775);
  const computedHeight = Math.max(toNumber(height), 100);

  return (
    <PictureWrap>
      <Image
        src={src}
        alt={alt}
        width={computedWidth}
        height={computedHeight}
        layout="intrinsic"
        objectFit="cover"
      />
      {caption && <PictureCaption>{caption}</PictureCaption>}
    </PictureWrap>
  );
};

const predefinedComponents = {
  a: A,
  h1: H2,
  h2: H2,
  h3: H3,
  h4: H4,
  Spacer: Spacer,
  Gist: GistCode,
  Divider: Divider,
  Picture: Picture,
};

/**
 * MDX content.
 * @returns {JSX.Element}
 */
export function MDXContent({ ...rest }) {
  return (
    <MDXRemote
      compiledSource={''}
      {...rest}
      components={predefinedComponents}
    />
  );
}
