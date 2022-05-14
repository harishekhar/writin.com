/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  i18n,
  pageExtensions: ["page.tsx", "tsx", "js"],
  eslint: {
    dirs: ["src/"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: { and: [/\.tsx?$/] },
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
