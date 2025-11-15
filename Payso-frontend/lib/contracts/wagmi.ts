import { http } from 'wagmi'
import { arcTestnet } from './config'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

export const config = getDefaultConfig({
  appName: 'Payso - Blockchain Payroll Escrow',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [arcTestnet],
  transports: {
    [arcTestnet.id]: http(),
  },
})