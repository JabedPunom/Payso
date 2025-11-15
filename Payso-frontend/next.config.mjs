/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Configure Turbopack to handle thread-stream package properly
  experimental: {
    turbo: {
      rules: {
        // Exclude test files and problematic modules from Turbopack processing
        '**/test/**': { loader: 'ignore-loader' },
        '**/*.test.{js,ts,mjs}': { loader: 'ignore-loader' },
        '**/node_modules/thread-stream/test/**': { loader: 'ignore-loader' },
        '**/node_modules/thread-stream/*.test.{js,ts,mjs}': { loader: 'ignore-loader' },
        '**/node_modules/thread-stream/LICENSE': { loader: 'ignore-loader' },
        '**/node_modules/thread-stream/README.md': { loader: 'ignore-loader' },
        '**/node_modules/tap/**': { loader: 'ignore-loader' },
        '**/node_modules/tape/**': { loader: 'ignore-loader' },
        '**/node_modules/why-is-node-running/**': { loader: 'ignore-loader' },
        '**/node_modules/desm/**': { loader: 'ignore-loader' },
      },
    },
  },
  // Configure webpack as fallback
  webpack: (config, { isServer }) => {
    // Exclude test files and problematic modules from webpack bundling
    config.module.rules.push({
      test: /node_modules\/thread-stream\/test/,
      use: 'ignore-loader',
    });
    
    // Exclude all test files
    config.module.rules.push({
      test: /\.test\.(js|ts|mjs)$/,
      use: 'ignore-loader',
    });
    
    // Exclude specific problematic testing modules
    config.resolve.alias = {
      ...config.resolve.alias,
      'tap': false,
      'tape': false,
      'why-is-node-running': false,
      'desm': false,
    };
    
    // Add fallback for Node.js modules that shouldn't be bundled
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      util: false,
      os: false,
      path: false,
      url: false,
      querystring: false,
      zlib: false,
      http: false,
      https: false,
      assert: false,
      constants: false,
      timers: false,
      events: false,
      punycode: false,
      string_decoder: false,
      sys: false,
      buffer: false,
      process: false,
      console: false,
    };
    
    return config;
  },
  // Production optimizations
  productionBrowserSourceMaps: false,
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;