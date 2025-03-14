/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  output: 'standalone',
  
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
