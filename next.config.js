/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  compress: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  env: {
    NEXT_PUBLIC_ENV: "PRODUCTION", // konfigurasi Next.js lainnya
  },
};

module.exports = withBundleAnalyzer(nextConfig);
