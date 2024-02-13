/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en-US", "ar-SA"],
    defaultLocale: "ar-SA",
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
