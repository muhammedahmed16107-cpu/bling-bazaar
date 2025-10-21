/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ this line disables ESLint during build
  },
};

export default nextConfig;