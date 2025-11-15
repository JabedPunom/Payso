# Deployed Contracts - Arc Testnet

## Quick Reference

### Network Information
- **Network**: Arc Testnet
- **Chain ID**: 5042002
- **RPC URL**: https://rpc.testnet.arc.network
- **Explorer**: https://testnet.arcscan.app

### Contract Addresses

```javascript
const CONTRACTS = {
  USDC: "0xC7B1F6c93931c710aAf8fa54a6F3d3D477cd396e",
  EURC: "0xd2A490ac2e2eDAEb41a0DB39De526342B1a93Ac5",
  FXRouter: "0xEDC33756ecb474CFb717E9c709Cfb5121984e3A4",
  PayrollEscrow: "0xE0390bB3c6fF668fC48767d4f0D334897770CB51"
};
```

### Deployer Account
- **Address**: `0x24f2c1199B390Ffe5de345495eDA04492dc4e12E`
- **Role**: Employer/Owner of PayrollEscrow

---

## Contract Details

### 1. USDC (Mock Stablecoin)
- **Address**: `0xC7B1F6c93931c710aAf8fa54a6F3d3D477cd396e`
- **Name**: USD Coin
- **Symbol**: USDC
- **Decimals**: 6
- **Explorer**: [View Contract](https://testnet.arcscan.app/address/0xC7B1F6c93931c710aAf8fa54a6F3d3D477cd396e)

**Key Functions**:
- `mint(address to, uint256 amount)` - Mint tokens (owner only)
- `approve(address spender, uint256 amount)` - Approve spending
- `transfer(address to, uint256 amount)` - Transfer tokens
- `balanceOf(address account)` - Check balance

### 2. EURC (Mock Stablecoin)
- **Address**: `0xd2A490ac2e2eDAEb41a0DB39De526342B1a93Ac5`
- **Name**: Euro Coin
- **Symbol**: EURC
- **Decimals**: 6
- **Explorer**: [View Contract](https://testnet.arcscan.app/address/0xd2A490ac2e2eDAEb41a0DB39De526342B1a93Ac5)

**Key Functions**: Same as USDC

### 3. FXRouter
- **Address**: `0xEDC33756ecb474CFb717E9c709Cfb5121984e3A4`
- **Owner**: `0x24f2c1199B390Ffe5de345495eDA04492dc4e12E`
- **Explorer**: [View Contract](https://testnet.arcscan.app/address/0xEDC33756ecb474CFb717E9c709Cfb5121984e3A4)

**Configured Rates**:
- USDC → EURC: 0.94 (940000000000000000 wei)
- EURC → USDC: 1.06 (1060000000000000000 wei)

**Liquidity**:
- USDC: 10,000,000 tokens
- EURC: 10,000,000 tokens

**Key Functions**:
- `swap(address tokenIn, address tokenOut, uint256 amountIn, address recipient)` - Swap tokens
- `getRate(address tokenIn, address tokenOut)` - Get exchange rate
- `setRate(address tokenIn, address tokenOut, uint256 rate)` - Set rate (owner only)

### 4. PayrollEscrow
- **Address**: `0xE0390bB3c6fF668fC48767d4f0D334897770CB51`
- **Employer**: `0x24f2c1199B390Ffe5de345495eDA04492dc4e12E`
- **Explorer**: [View Contract](https://testnet.arcscan.app/address/0xE0390bB3c6fF668fC48767d4f0D334897770CB51)

**Key Functions**:
- `depositAndSchedule(address recipient, uint256 amount, uint256 releaseAt, bool requiresWorkEvent, address stablecoin, address preferredPayout)` - Schedule payment
- `claimPayment(uint256 paymentId)` - Claim payment (recipient only)
- `verifyWork(uint256 paymentId, bytes signature)` - Verify work completion
- `getPayment(uint256 paymentId)` - Get payment details
- `isClaimable(uint256 paymentId)` - Check if payment is claimable
- `getPaymentsByRecipient(address recipient)` - Get all payments for recipient

---

## Usage Examples

### Schedule a Payment (Employer)

```bash
# 1. Approve USDC to PayrollEscrow
cast send 0xC7B1F6c93931c710aAf8fa54a6F3d3D477cd396e \
  "approve(address,uint256)" \
  0xE0390bB3c6fF668fC48767d4f0D334897770CB51 \
  1000000000 \
  --rpc-url https://rpc.testnet.arc.network \
  --private-key $PRIVATE_KEY

# 2. Schedule payment (1000 USDC, releases in 1 hour, payout in EURC)
cast send 0xE0390bB3c6fF668fC48767d4f0D334897770CB51 \
  "depositAndSchedule(address,uint256,uint256,bool,address,address)" \
  0xEmployeeAddress \
  1000000000 \
  $(($(date +%s) + 3600)) \
  false \
  0xC7B1F6c93931c710aAf8fa54a6F3d3D477cd396e \
  0xd2A490ac2e2eDAEb41a0DB39De526342B1a93Ac5 \
  --rpc-url https://rpc.testnet.arc.network \
  --private-key $PRIVATE_KEY
```

### Claim Payment (Employee)

```bash
cast send 0xE0390bB3c6fF668fC48767d4f0D334897770CB51 \
  "claimPayment(uint256)" \
  0 \
  --rpc-url https://rpc.testnet.arc.network \
  --private-key $EMPLOYEE_PRIVATE_KEY
```

### Check Payment Status

```bash
cast call 0xE0390bB3c6fF668fC48767d4f0D334897770CB51 \
  "isClaimable(uint256)(bool)" \
  0 \
  --rpc-url https://rpc.testnet.arc.network
```

---

## Frontend Integration

See `deployed-addresses.json` for structured data to import into your frontend application.

**Example**:
```javascript
import deployedAddresses from './deployed-addresses.json';

const payrollEscrow = new ethers.Contract(
  deployedAddresses.contracts.PayrollEscrow.address,
  PayrollEscrowABI,
  signer
);
```

