/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_PUBLIC_URL: process.env.PUBLIC_URL,
  },
};

module.exports = nextConfig;
