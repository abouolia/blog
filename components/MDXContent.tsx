import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import toNumber from 'lodash.tonumber';
import Gist from 'react-gist';
import { LinkButton } from './Button';

const H2 = (props: React.ComponentProps<'h2'>) => (
  <h2
    className="mb-4 mt-4 text-2xl font-black capitalize sm:text-3xl"
    {...props}
  />
);
const H3 = (props: React.ComponentProps<'h3'>) => (
  <h3
    className="mb-4 mt-4 text-2xl font-black capitalize sm:text-2xl"
    {...props}
  />
);
const H4 = (props: React.ComponentProps<'h4'>) => (
  <h4
    className="mb-3 mt-3 text-xl font-black capitalize sm:text-2xl"
    {...props}
  />
);
const Divider = (props: React.ComponentProps<'div'>) => (
  <div className="h-px bg-white mx-4 my-4 opacity-10" {...props} />
);
const PictureCaption = (props: React.ComponentProps<'div'>) => (
  <div className="text-xs text-center opacity-50 mt-1" {...props} />
);
const PictureWrap = (props: React.ComponentProps<'div'>) => (
  <div className="mb-4" {...props} />
);
const Spacer = (props: React.ComponentProps<'div'>) => (
  <div className="h-4" {...props} />
);

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
  fullWidth?: boolean;
  layout?: ImageProps['layout'];
}

const Picture = ({
  src,
  alt,
  caption,
  width = 775,
  height = 300,
  fullWidth = true,
  layout = 'intrinsic'
}: PictureProps) => {
  const computedWidth = fullWidth ? Math.max(toNumber(width), 775) : width;
  const computedHeight = fullWidth ? Math.max(toNumber(height), 100) : height;

  return (
    <PictureWrap>
      <Image
        src={src}
        alt={alt}
        width={computedWidth}
        height={computedHeight}
        layout={layout}
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
export function MDXContent(props: React.ComponentProps<typeof MDXRemote>) {
  return <MDXRemote {...props} components={predefinedComponents} />;
}
