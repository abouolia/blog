/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: true, // < Recommended by Next
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  poweredByHeader: false,
  async headers() {
    return [
      {
        // Images and fonts are immutable once published; without this the
        // platform revalidates them on every visit.
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
