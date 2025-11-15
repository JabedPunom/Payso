/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Production optimizations
  productionBrowserSourceMaps: false,
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['@rainbow-me/rainbowkit', 'wagmi', 'viem', 'framer-motion'],
  },
  webpack: (config) => {
    // Exclude test files from thread-stream and other problematic packages
    config.module.rules.push({
      test: /node_modules\/thread-stream\/test/,
      use: 'ignore-loader',
    });
    
    config.module.rules.push({
      test: /node_modules\/.*\/test\.(js|mjs|ts)$/,
      use: 'ignore-loader',
    });
    
    // Exclude specific problematic modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'tap': false,
      'tape': false,
      'why-is-node-running': false,
      'desm': false,
    };
    
    return config;
  },
};

export default nextConfig;