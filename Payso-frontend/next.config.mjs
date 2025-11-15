/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Use empty turbopack config to avoid conflicts
  turbopack: {},
  webpack: (config) => {
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
};

export default nextConfig;