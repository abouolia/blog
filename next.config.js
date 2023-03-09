const withTwin = require('./withTwin.js')
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,

  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});



/**
 * @type {import('next').NextConfig}
 */
// module.exports = withTwin({
  
// })
module.exports = withTwin(withMDX({
  reactStrictMode: true, // < Recommended by Next
  // Append the default value with md extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    runtime: 'nodejs',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}));
