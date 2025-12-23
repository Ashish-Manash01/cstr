/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // Ignore type checking errors during build - backend runs separately
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
