/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  trailingSlash: true,
  distDir: 'build', // Keeps the custom build directory.
  images: {
    unoptimized: true,
    domains: [
      'github.com',
      'avatars.githubusercontent.com',
      'res.cloudinary.com',
      'imgur.com',
    ],
  },
};

module.exports = nextConfig;
