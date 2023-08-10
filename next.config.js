/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_PUBLIC_URL: process.env.PUBLIC_URL,
    NEXT_PUBLIC_DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_SHADOW_DATABASE_URL: process.env.SHADOW_DATABASE_URL,
  },
};

module.exports = nextConfig;
