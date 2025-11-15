# ArcPay Escrow - Smart Contracts

Programmable multi-currency payroll escrow system built on Arc Testnet with automatic FX conversion.

## 🚀 Deployed Contracts (Arc Testnet)

| Contract | Address | Explorer |
|----------|---------|----------|
| **USDC** | `0xC7B1F6c93931c710aAf8fa54a6F3d3D477cd396e` | [View](https://testnet.arcscan.app/address/0xC7B1F6c93931c710aAf8fa54a6F3d3D477cd396e) |
| **EURC** | `0xd2A490ac2e2eDAEb41a0DB39De526342B1a93Ac5` | [View](https://testnet.arcscan.app/address/0xd2A490ac2e2eDAEb41a0DB39De526342B1a93Ac5) |
| **FXRouter** | `0xEDC33756ecb474CFb717E9c709Cfb5121984e3A4` | [View](https://testnet.arcscan.app/address/0xEDC33756ecb474CFb717E9c709Cfb5121984e3A4) |
| **PayrollEscrow** | `0xE0390bB3c6fF668fC48767d4f0D334897770CB51` | [View](https://testnet.arcscan.app/address/0xE0390bB3c6fF668fC48767d4f0D334897770CB51) |

**Network**: Arc Testnet (Chain ID: 5042002)
**RPC**: https://rpc.testnet.arc.network
**Explorer**: https://testnet.arcscan.app

📄 See [CONTRACTS.md](./CONTRACTS.md) for detailed contract information and usage examples.

## 📋 Features

- ⏰ **Time-locked Payments**: Schedule payments with specific release times
- 💱 **Multi-currency Support**: Pay in USDC or EURC with automatic conversion
- ✅ **Work Verification**: Optional signature-based work completion verification
- 🔒 **Secure Escrow**: Funds locked until conditions are met
- 🔄 **Automatic FX**: Built-in currency exchange via FXRouter

## 🛠️ Technology Stack

Built with **Foundry** - a blazing fast, portable and modular toolkit for Ethereum development.

- **Forge**: Ethereum testing framework
- **Cast**: CLI for interacting with contracts
- **Anvil**: Local Ethereum node
- **Chisel**: Solidity REPL

📚 [Foundry Documentation](https://book.getfoundry.sh/)

## 🚀 Quick Start

### Prerequisites

1. Install [Foundry](https://book.getfoundry.sh/getting-started/installation)
2. Get testnet USDC from [Circle Faucet](https://faucet.circle.com)
3. Set up your `.env` file with your private key

### Build

```shell
forge build
```

### Test

```shell
forge test
```

Run tests with gas reporting:
```shell
forge test --gas-report
```

### Deploy to Arc Testnet

```shell
forge script script/Deploy.s.sol:Deploy --rpc-url https://rpc.testnet.arc.network --broadcast
```

📖 See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 📖 Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Complete deployment guide
- [CONTRACTS.md](./CONTRACTS.md) - Contract addresses and usage examples
- [deployed-addresses.json](./deployed-addresses.json) - Machine-readable deployment data

## 🧪 Testing

Run all tests:
```shell
forge test -vv
```

Run specific test file:
```shell
forge test --match-path test/PayrollEscrow.t.sol -vvv
```

Generate coverage report:
```shell
forge coverage
```

## 🔧 Development Commands

### Format Code
```shell
forge fmt
```

### Gas Snapshots
```shell
forge snapshot
```

### Local Development
```shell
anvil
```

### Interact with Contracts
```shell
cast call <contract_address> "functionName()" --rpc-url https://rpc.testnet.arc.network
```

## 📚 Additional Resources

- [Foundry Book](https://book.getfoundry.sh/)
- [Arc Network Docs](https://docs.arc.network)
- [Arc Testnet Explorer](https://testnet.arcscan.app)

## 📄 License

MIT
