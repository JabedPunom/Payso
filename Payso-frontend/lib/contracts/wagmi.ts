import { http, fallback } from 'wagmi'
import { arcTestnet } from './config'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

// Ensure project ID is available
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id'

if (!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID) {
  console.warn('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. Using demo project ID.')
}

// Multiple RPC endpoints for fallback
const arcRpcUrls = [
  process.env.NEXT_PUBLIC_ARC_RPC_URL || 'https://rpc.quicknode.testnet.arc.network',
]

console.log('🔗 Configuring Arc Testnet RPC endpoints:', arcRpcUrls)

export const config = getDefaultConfig({
  appName: 'Payso - Blockchain Payroll Escrow',
  projectId,
  chains: [arcTestnet],
  transports: {
    [arcTestnet.id]: fallback(
      arcRpcUrls.map(url => http(url, {
        timeout: 30_000, // 30 second timeout
        retryCount: 1, // Reduce retries to avoid rate limiting
        retryDelay: 2000, // Increase delay between retries
        batch: {
          wait: 100, // Batch requests within 100ms window
        },
      }))
    ),
  },
  // Add ssr: true to prevent hydration issues
  ssr: true,
})