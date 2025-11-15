# ArcPay Escrow - Deployment Guide

## 🌐 Arc Testnet Network Details

```
Network Name: Arc Testnet
RPC URL: https://rpc.testnet.arc.network
Chain ID: 5042002
Currency Symbol: USDC (native token)
Block Explorer: https://testnet.arcscan.app
```

## 📋 Prerequisites

### 1. Get Testnet USDC (for gas fees)

Arc uses USDC as the native token for gas fees. Get free testnet USDC from:

**Circle Testnet Faucet**: https://faucet.circle.com

Steps:
1. Visit the faucet
2. Connect your wallet or enter your address
3. Request testnet USDC
4. Wait for confirmation

### 2. Setup Your Wallet

**Option A: Using MetaMask**
1. Open MetaMask
2. Click network dropdown → "Add Network"
3. Enter Arc Testnet details:
   - Network Name: `Arc Testnet`
   - RPC URL: `https://rpc.testnet.arc.network`
   - Chain ID: `5042002`
   - Currency Symbol: `USDC`
   - Block Explorer: `https://testnet.arcscan.app`

**Option B: Using Private Key (for deployment script)**
1. Export your private key from MetaMask (Settings → Security & Privacy → Reveal Private Key)
2. **⚠️ NEVER share or commit this key!**

### 3. Configure Environment

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and add your private key:
```bash
PRIVATE_KEY=0xyour_private_key_with_0x_prefix
RPC_URL=https://rpc.testnet.arc.network
CHAIN_ID=5042002
EXPLORER_URL=https://testnet.arcscan.app
```

**⚠️ Security Warning**: Never commit `.env` to git! It's already in `.gitignore`.

## 🚀 Deployment Steps

### Step 1: Verify Setup

Check your account balance:
```bash
cast balance YOUR_ADDRESS --rpc-url https://rpc.testnet.arc.network
```

### Step 2: Run Deployment Script

Deploy all contracts:
```bash
forge script script/Deploy.s.sol:Deploy --rpc-url $RPC_URL --broadcast --legacy
```

**Note**: Use `--legacy` flag if you encounter EIP-1559 issues.

### Step 3: Verify Deployment

The script will output:
- ✅ USDC Mock Token address
- ✅ EURC Mock Token address
- ✅ FXRouter address
- ✅ PayrollEscrow address

Check contracts on explorer:
```
https://testnet.arcscan.app/address/YOUR_CONTRACT_ADDRESS
```

## 📝 Post-Deployment

### ✅ Deployed Contract Addresses (Arc Testnet)

**Deployment Date**: November 15, 2025
**Deployer**: `0x24f2c1199B390Ffe5de345495eDA04492dc4e12E`

| Contract | Address | Explorer Link |
|----------|---------|---------------|
| **USDC** | `0xC7B1F6c93931c710aAf8fa54a6F3d3D477cd396e` | [View on Explorer](https://testnet.arcscan.app/address/0xC7B1F6c93931c710aAf8fa54a6F3d3D477cd396e) |
| **EURC** | `0xd2A490ac2e2eDAEb41a0DB39De526342B1a93Ac5` | [View on Explorer](https://testnet.arcscan.app/address/0xd2A490ac2e2eDAEb41a0DB39De526342B1a93Ac5) |
| **FXRouter** | `0xEDC33756ecb474CFb717E9c709Cfb5121984e3A4` | [View on Explorer](https://testnet.arcscan.app/address/0xEDC33756ecb474CFb717E9c709Cfb5121984e3A4) |
| **PayrollEscrow** | `0xE0390bB3c6fF668fC48767d4f0D334897770CB51` | [View on Explorer](https://testnet.arcscan.app/address/0xE0390bB3c6fF668fC48767d4f0D334897770CB51) |

**FX Rates Configured**:
- USDC → EURC: 0.94 (1 USDC = 0.94 EURC)
- EURC → USDC: 1.06 (1 EURC = 1.06 USDC)

**Initial Liquidity**:
- FXRouter USDC Balance: 10,000,000 USDC
- FXRouter EURC Balance: 10,000,000 EURC

**Test Tokens Minted**:
- Deployer received: 100,000 USDC and 100,000 EURC for testing

### Test the Deployment

Run a test transaction:
```bash
# 1. Approve USDC to PayrollEscrow
cast send 0xC7B1F6c93931c710aAf8fa54a6F3d3D477cd396e "approve(address,uint256)" 0xE0390bB3c6fF668fC48767d4f0D334897770CB51 1000000000 --rpc-url $RPC_URL --private-key $PRIVATE_KEY

# 2. Schedule a payment (releaseAt = current timestamp + 1 hour)
cast send 0xE0390bB3c6fF668fC48767d4f0D334897770CB51 "depositAndSchedule(address,uint256,uint256,bool,address,address)" \
  EMPLOYEE_ADDRESS \
  1000000 \
  $(($(date +%s) + 3600)) \
  false \
  0xC7B1F6c93931c710aAf8fa54a6F3d3D477cd396e \
  0xC7B1F6c93931c710aAf8fa54a6F3d3D477cd396e \
  --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

## 🔍 Troubleshooting

### Issue: "Insufficient funds for gas"
**Solution**: Get more testnet USDC from the faucet

### Issue: "Nonce too low"
**Solution**: Reset your account nonce or wait a few blocks

### Issue: "Transaction reverted"
**Solution**: Check the revert reason in the explorer

### Issue: "RPC connection failed"
**Solution**: Verify RPC URL is correct: `https://rpc.testnet.arc.network`

## 📊 Deployment Costs (Estimated)

- MockStablecoin (USDC): ~0.5 USDC
- MockStablecoin (EURC): ~0.5 USDC
- FXRouter: ~1.0 USDC
- PayrollEscrow: ~2.0 USDC
- Configuration: ~0.5 USDC

**Total**: ~4.5 USDC (testnet)

## 🎯 Next Steps After Deployment

1. ✅ Save all contract addresses
2. ✅ Verify contracts on block explorer
3. ✅ Test a complete payment flow
4. ✅ Update README with deployed addresses
5. ✅ Create demo video/screenshots for hackathon submission

## 📚 Useful Commands

```bash
# Check contract code
cast code CONTRACT_ADDRESS --rpc-url $RPC_URL

# Call view function
cast call CONTRACT_ADDRESS "employer()(address)" --rpc-url $RPC_URL

# Get transaction receipt
cast receipt TX_HASH --rpc-url $RPC_URL

# Get current block number
cast block-number --rpc-url $RPC_URL
```

## 🔗 Resources

- Arc Docs: https://docs.arc.network
- Arc Explorer: https://testnet.arcscan.app
- Circle Faucet: https://faucet.circle.com
- Foundry Book: https://book.getfoundry.sh

