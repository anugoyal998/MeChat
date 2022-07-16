/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://mechat-server-anubhav.herokuapp.com/api/:path*',
      },
    ]
  },
  images: {
    domains: ['res.cloudinary.com']
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig
