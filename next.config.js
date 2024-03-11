/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "dist/next",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
}

module.exports = nextConfig
