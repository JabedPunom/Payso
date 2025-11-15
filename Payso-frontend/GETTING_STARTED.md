# 🚀 Getting Started with Payso

## Quick Start (5 Minutes)

### 1. **Install Dependencies**

```bash
cd Payso-frontend
npm install
```

### 2. **Start Development Server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. **Connect Your Wallet**

1. Click "Connect Wallet" button in header
2. Select MetaMask (or your preferred wallet)
3. Approve the connection
4. **Important**: Switch to Arc Testnet when prompted

### 4. **Get Test Tokens**

You need USDC on Arc Testnet to use the app:

1. Visit Arc Testnet Faucet (ask in Arc Discord)
2. Get some test USDC
3. Your balance will show in the dashboard

---

## 👔 For Employers

### Schedule Your First Payment

1. **Navigate to Dashboard**
   - Click "Dashboard" in header
   - Or go to `/dashboard/payments`

2. **Fill the Payment Form**
   - **Recipient**: Employee's wallet address (0x...)
   - **Amount**: Payment amount (e.g., 1000)
   - **Token**: Select USDC or EURC
   - **Release Date**: When payment unlocks
   - **Release Time**: Specific time
   - **Work Verification**: Toggle if you want to verify work before payment
   - **Preferred Payout**: Currency employee will receive

3. **Approve & Schedule**
   - Click "Approve Token" (first time only)
   - Wait for approval transaction
   - Click "Schedule Payment"
   - Confirm in your wallet
   - Wait for confirmation

4. **Track Your Payment**
   - View in "Scheduled" tab
   - Monitor status
   - Verify work if required

---

## 👨‍💼 For Employees

### Claim Your First Payment

1. **Navigate to Payments**
   - Go to `/dashboard/payments`
   - See all your payments

2. **Check Payment Status**
   - 🟡 **Pending**: Not yet claimable (wait for release date)
   - 🟢 **Claimable**: Ready to claim!
   - ⚪ **Work Required**: Employer needs to verify
   - ✅ **Claimed**: Already received

3. **Claim Payment**
   - Find a "Claimable" payment
   - Click "Claim Payment"
   - Confirm transaction in wallet
   - Funds sent to your wallet automatically!

4. **Currency Conversion**
   - If payment is in different currency than preferred
   - Conversion happens automatically
   - You receive your preferred currency

---

## 🔧 Troubleshooting

### "Wrong Network" Error
**Solution**: Switch to Arc Testnet
- Click the network button in RainbowKit
- Select "Arc Testnet"
- Approve in your wallet

### "Insufficient Funds" Error
**Solution**: Get test USDC
- You need USDC for gas fees on Arc
- Visit Arc faucet or Discord

### "Approval Failed" Error
**Solution**: Try again
- Make sure you have enough USDC
- Check you're on Arc Testnet
- Refresh page and retry

### Payments Not Showing
**Solution**: 
- Ensure wallet is connected
- Check you're on Arc Testnet
- Refresh the page
- Verify contract addresses

---

## 📱 Mobile Usage

The app is fully responsive!

1. Open on mobile browser
2. Use MetaMask mobile app
3. Connect via WalletConnect
4. Same features as desktop

---

## 🎯 Key Concepts

### **Payment Lifecycle**

```
1. SCHEDULED
   ↓
2. PENDING (waiting for release date)
   ↓
3. WORK VERIFICATION (if required)
   ↓
4. CLAIMABLE (ready to claim)
   ↓
5. CLAIMED (funds transferred)
```

### **Currency Conversion**

- Employer pays in USDC
- Employee prefers EURC
- FXRouter converts automatically
- Employee receives EURC

### **Work Verification**

- Optional feature
- Employer must verify work completion
- Uses cryptographic signatures
- Prevents premature claims

---

## 🔗 Important Links

- **Dashboard**: http://localhost:3000/dashboard
- **Arc Explorer**: https://testnet.arcscan.app
- **Documentation**: See `INTEGRATION_COMPLETE.md`

---

## 💡 Tips

1. **Always check network** - Must be on Arc Testnet
2. **Approve tokens first** - One-time approval per token
3. **Wait for confirmations** - Transactions take a few seconds
4. **Check balances** - Ensure you have enough USDC
5. **Use test amounts** - Start small to test the flow

---

## 🆘 Need Help?

1. Check `INTEGRATION_COMPLETE.md` for detailed docs
2. Review `BLOCKCHAIN_INTEGRATION.md` for technical details
3. Check browser console for errors
4. Verify contract addresses in `lib/contracts/config.ts`

---

**🎉 You're ready to use Payso!**

Start by connecting your wallet and exploring the dashboard.

