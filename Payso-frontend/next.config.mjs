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
    optimizePackageImports: ['@rainbow-me/rainbowkit', 'wagmi', 'viem', 'framer-motion', '@reown/appkit', '@walletconnect'],
  },
  webpack: (config) => {
    // Comprehensive exclusion of test files and problematic modules
    const ignoreRules = [
      // Thread stream test files
      {
        test: /node_modules\/thread-stream\/test/,
        use: 'ignore-loader',
      },
      // All test files
      {
        test: /node_modules\/.*\/test\.(js|mjs|ts)$/,
        use: 'ignore-loader',
      },
      // Specific Web3 test decorators
      {
        test: /node_modules\/@reown\/.*\/test\./,
        use: 'ignore-loader',
      },
      {
        test: /node_modules\/@walletconnect\/.*\/test\./,
        use: 'ignore-loader',
      },
      {
        test: /node_modules\/viem\/.*\/test\./,
        use: 'ignore-loader',
      },
      // Test decorator files
      {
        test: /clients\/decorators\/test\.(js|mjs|ts)$/,
        use: 'ignore-loader',
      },
      {
        test: /_esm\/clients\/decorators\/test\.(js|mjs|ts)$/,
        use: 'ignore-loader',
      },
      // Specific problematic files from Vercel logs
      {
        test: /node_modules\/@reown\/appkit-controllers\/node_modules\/@walletconnect\/utils\/node_modules\/viem\/.*\/test\.(js|mjs|ts)$/,
        use: 'ignore-loader',
      },
      {
        test: /node_modules\/@walletconnect\/utils\/node_modules\/viem\/.*\/test\.(js|mjs|ts)$/,
        use: 'ignore-loader',
      },
      {
        test: /node_modules\/@reown\/appkit\/node_modules\/@walletconnect\/utils\/node_modules\/viem\/.*\/test\.(js|mjs|ts)$/,
        use: 'ignore-loader',
      },
      // Test actions
      {
        test: /testActions/,
        use: 'ignore-loader',
      },
      // Test directories
      {
        test: /\/test\//,
        use: 'ignore-loader',
      },
      {
        test: /\/tests\//,
        use: 'ignore-loader',
      },
      {
        test: /\/__tests__\//,
        use: 'ignore-loader',
      },
    ];

    ignoreRules.forEach(rule => {
      config.module.rules.push(rule);
    });

    // Add a custom plugin to handle the specific testActions issue
    class IgnoreTestActionsPlugin {
      apply(compiler) {
        compiler.hooks.normalModuleFactory.tap('IgnoreTestActionsPlugin', (nmf) => {
          nmf.hooks.beforeResolve.tap('IgnoreTestActionsPlugin', (resolveData) => {
            if (resolveData.request && (
              resolveData.request.includes('testActions') ||
              resolveData.request.includes('./decorators/test.js') ||
              resolveData.request.includes('./clients/decorators/test.js') ||
              resolveData.request.includes('viem/_esm/clients/decorators/test.js')
            )) {
              return false; // Ignore this import
            }
          });
        });
      }
    }

    config.plugins.push(new IgnoreTestActionsPlugin());

    // Exclude specific problematic modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'tap': false,
      'tape': false,
      'why-is-node-running': false,
      'desm': false,
      'testActions': false,
      './decorators/test.js': false,
      './clients/decorators/test.js': false,
    };

    // Add aliases for problematic imports
    config.resolve.alias = {
      ...config.resolve.alias,
      // Mock testActions imports
      'testActions': false,
      './decorators/test.js': false,
      './clients/decorators/test.js': false,
      // Specific viem test imports
      '@reown/appkit-controllers/node_modules/@walletconnect/utils/node_modules/viem/_esm/clients/decorators/test.js': false,
      '@walletconnect/utils/node_modules/viem/_esm/clients/decorators/test.js': false,
      'viem/_esm/clients/decorators/test.js': false,
      // Thread stream
      'thread-stream': false,
    };

    return config;
  },
};

module.exports = nextConfig;
