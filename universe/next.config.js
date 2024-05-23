/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    URL_API_BACKEND: process.env.URL_API_BACKEND,
  },
}

module.exports = nextConfig
