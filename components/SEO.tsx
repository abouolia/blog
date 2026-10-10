import React from 'react';
import Head from 'next/head';
import { config } from '../config';
import { absoluteUrl } from '../utils/seo';

interface SEOProps {
  /** Page title, not including the site name. */
  title?: string;
  description?: string;
  /** Path of the current page, e.g. `/posts/my-post`. */
  canonicalPath?: string;
  /** Absolute or root-relative social share image. */
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  updatedTime?: string;
  tags?: string[];
  /** Keep the page out of search engines. */
  noindex?: boolean;
  /** Structured data (JSON-LD) object or list of objects. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Renders the page metadata shared by all pages: title, description,
 * canonical URL, Open Graph, Twitter cards, and JSON-LD structured data.
 * @returns {JSX.Element}
 */
export function SEO({
  title,
  description = config.siteDescription,
  canonicalPath,
  image = config.defaultOgImage,
  type = 'website',
  publishedTime,
  updatedTime,
  tags,
  noindex = false,
  jsonLd,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${config.siteTitle}` : config.siteTitle;
  const url = canonicalPath ? absoluteUrl(canonicalPath) : config.siteUrl;
  const imageUrl = absoluteUrl(image);

  const jsonLdItems = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonicalPath && <link rel="canonical" href={url} />}
      <meta
        name="robots"
        content={noindex ? 'noindex,nofollow' : 'index,follow'}
      />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={config.siteTitle} />
      <meta property="og:locale" content={config.siteLocale} />
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && (updatedTime || publishedTime) && (
        <meta
          property="article:modified_time"
          content={updatedTime || publishedTime}
        />
      )}
      {type === 'article' &&
        tags?.map((tag) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}

      {/* Twitter cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:site" content={`@${config.twitterHandle}`} />
      <meta name="twitter:creator" content={`@${config.twitterHandle}`} />

      {/* Structured data */}
      {jsonLdItems.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </Head>
  );
}
