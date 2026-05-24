import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // originaly export, switched in Waylon Ma's hotfix to push this code to cloudflare
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
