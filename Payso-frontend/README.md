# Payso - Blockchain Payroll Escrow Platform

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/jabed-hossains-projects-536e8e8a/payso)

## Overview

Payso is a revolutionary blockchain-powered payroll escrow service that automates employee payments, eliminates disputes, and ensures on-time salary distribution using smart contracts on the Arc Testnet. Built with Next.js, TypeScript, and Web3 technologies, Payso provides a secure, transparent, and efficient solution for modern payroll management.

## Key Features

### 🏦 Smart Contract Escrow
- **Automated Payments**: Schedule and automate salary payments using time-locked smart contracts
- **Multi-Currency Support**: Support for USDC and EURC stablecoins for flexible payroll options
- **Work Verification**: Optional work verification system to ensure deliverables before payment release
- **Dispute Prevention**: Immutable smart contracts eliminate payment disputes

### 👥 Dual Dashboard System
- **Employer Dashboard**: Schedule payments, manage employees, and track payment history
- **Employee Dashboard**: View scheduled payments, claim available funds, and track payment status
- **Real-time Updates**: Live payment status tracking and notifications

### 🔐 Security & Transparency
- **Blockchain Integration**: All transactions recorded on Arc Testnet for transparency
- **Wallet Authentication**: Secure Web3 wallet connection via RainbowKit
- **Smart Contract Auditing**: Open-source contracts for community verification

### 💰 Financial Features
- **Time-locked Payments**: Schedule payments for specific dates and times
- **Flexible Payout Options**: Choose between different stablecoin currencies
- **Payment History**: Complete transaction history with blockchain verification
- **Balance Tracking**: Real-time wallet balance monitoring

## Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Modern component library
- **Framer Motion**: Smooth animations and transitions
- **RainbowKit**: Web3 wallet connection interface

### Blockchain & Smart Contracts
- **Arc Testnet**: High-performance blockchain network
- **Solidity**: Smart contract development
- **Wagmi**: React hooks for Ethereum
- **Viem**: TypeScript Ethereum client
- **Hardhat**: Development environment for smart contracts

### Infrastructure
- **Vercel**: Deployment and hosting platform
- **Vercel Analytics**: Performance monitoring

## Smart Contract Architecture

### PayrollEscrow Contract
The core smart contract handles:
- **Payment Scheduling**: Time-locked payment creation
- **Work Verification**: Optional verification requirements
- **Payment Claims**: Employee fund withdrawal
- **Emergency Controls**: Admin functions for contract management

### Supported Tokens
- **USDC**: USD Coin stablecoin
- **EURC**: Euro Coin stablecoin

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm package manager
- Web3 wallet (MetaMask, WalletConnect, etc.)
- Arc Testnet network configuration

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/payso.git
   cd payso
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
   NEXT_PUBLIC_PAYROLL_ESCROW_ADDRESS=your_contract_address
   NEXT_PUBLIC_USDC_ADDRESS=your_usdc_address
   NEXT_PUBLIC_EURC_ADDRESS=your_eurc_address
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
# or
pnpm build
```

## Usage Guide

### For Employers

1. **Connect Wallet**: Connect your Web3 wallet to the platform
2. **Switch to Employer Mode**: Navigate to the employer dashboard
3. **Schedule Payment**: 
   - Enter employee wallet address
   - Set payment amount and currency
   - Choose release date and time
   - Optionally enable work verification
4. **Approve Tokens**: Approve the smart contract to spend your tokens
5. **Confirm Payment**: Review and confirm the payment schedule

### For Employees

1. **Connect Wallet**: Connect your Web3 wallet to the platform
2. **View Payments**: See all scheduled payments in your dashboard
3. **Track Status**: Monitor payment status (Pending, Claimable, Claimed)
4. **Claim Payments**: Withdraw funds when payments become claimable
5. **Complete Work**: If work verification is required, complete assigned tasks

## Smart Contract Deployment

### Deploy to Arc Testnet

1. **Configure Hardhat**
   ```bash
   cd payso-contract
   cp .env.example .env
   ```

2. **Set Environment Variables**
   ```env
   PRIVATE_KEY=your_private_key
   ARC_RPC_URL=https://arc-testnet.rpc.url
   ```

3. **Deploy Contracts**
   ```bash
   npx hardhat run scripts/deploy.js --network arc-testnet
   ```

## Security Considerations

- **Private Key Management**: Never expose private keys in frontend code
- **Contract Auditing**: Review smart contract code before mainnet deployment
- **Network Security**: Use only trusted RPC endpoints
- **Token Approvals**: Be cautious with unlimited token approvals

## Contributing

We welcome contributions to Payso! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the GitHub repository
- Contact our development team
- Join our community discussions

## Roadmap

- **Multi-chain Support**: Expand to additional blockchain networks
- **Mobile App**: Native mobile applications
- **Advanced Analytics**: Enhanced reporting and analytics features
- **Integration APIs**: Third-party payroll system integrations
- **Governance**: Decentralized governance for protocol upgrades

---

**Built with ❤️ for the future of payroll management**