/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "metaborg.io",
      "hatrabbits.com",
      "unsplash.com",
      "expertphotography.b-cdn.net",
      "images.unsplash.com",
    ],
  },
};

module.exports = nextConfig;
