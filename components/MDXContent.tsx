import React, { useEffect, useRef, useState } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import toNumber from 'lodash.tonumber';
import { LinkButton } from './Button';

// `react-gist` is only downloaded when a gist gets close to the viewport.
const Gist = dynamic(() => import('react-gist'), { ssr: false });

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

/**
 * Renders a GitHub gist lazily: `react-gist` and the gist iframe are only
 * loaded once the embed is close to the viewport. Posts with many gists would
 * otherwise fire dozens of requests to gist.github.com on page load.
 */
const GistCode = ({ id }: { id: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {isVisible ? (
        <Gist id={id} />
      ) : (
        <div className="my-4 h-40 animate-pulse rounded-sm bg-black/5 dark:bg-white/5" />
      )}
    </div>
  );
};

interface PictureProps {
  src: string;
  alt?: string;

  caption?: string;
  width?: number | string;
  height?: number | string;
  fullWidth?: boolean;
  layout?: ImageProps['layout'];
  priority?: boolean;
}

const Picture = ({
  src,
  alt,
  caption,
  width = 775,
  height = 300,
  fullWidth = true,
  layout = 'intrinsic',
  priority = false,
}: PictureProps) => {
  const computedWidth = fullWidth ? Math.max(toNumber(width), 775) : width;
  const computedHeight = fullWidth ? Math.max(toNumber(height), 100) : height;

  return (
    <PictureWrap>
      <Image
        src={src}
        alt={alt || caption || ''}
        width={computedWidth}
        height={computedHeight}
        layout={layout}
        objectFit="cover"
        priority={priority}
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
