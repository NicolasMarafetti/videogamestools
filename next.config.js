/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['.'],
  },
  env: {
    SERVER_MEDIA_URL: process.env.SERVER_MEDIA_URL,
    WEBSITE_URL: process.env.WEBSITE_URL,
  },
  images: {
    domains: [
      'fontmeme.com',
      'jolstatic.fr',
      'image.jeuxvideo.com',
      'logo-marque.com',
      'lol-marque.com',
      'm.media-amazon.com',
      'upload.wikimedia.org',
    ],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  reactStrictMode: true,
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
});
