/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // optional but recommended
  eslint: {
    ignoreDuringBuilds: true, // ✅ prevents ESLint errors from breaking the build
  },
};

export default nextConfig;