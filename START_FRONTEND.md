# 🚀 Start the Frontend to See "Verify Work" Link

## ⚡ **Quick Start**

### **Step 1: Open a New Terminal**
- Open a new terminal/command prompt
- Or use Git Bash

### **Step 2: Navigate to Frontend Directory**
```bash
cd c:\Users\Admin\Documents\arc-hackathon\Payso\Payso-frontend
```

### **Step 3: Start the Dev Server**
```bash
npm run dev
```

### **Step 4: Wait for Server to Start**
You should see:
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Ready in X.Xs
```

### **Step 5: Open in Browser**
Navigate to: `http://localhost:3000`

---

## 🔍 **Verify "Verify Work" Link Appears**

### **1. Connect Your Wallet**
- Click "Connect Wallet" button
- Select your wallet (MetaMask, etc.)
- Make sure you're on Arc Testnet

### **2. Check Your Role**
Look at the sidebar (left side):
- Should show your role: "Employer" or "Employee"
- If it says "Employee", you need to switch wallets

### **3. Look for "Verify Work" Link**
In the sidebar, you should see:
```
📊 Overview
💰 Schedule Payment
⏰ Scheduled
✅ Verify Work          ← THIS IS THE NEW LINK
⚙️ Settings
```

**If you DON'T see it:**
- You're connected as an employee (not employer)
- Switch to the employer wallet
- The employer wallet is the one that deployed the contracts

---

## 👤 **How to Connect as Employer**

### **Option 1: Use the Main Employer Wallet**
The wallet that deployed the contracts:
- Address: `0x24f2c1199B390Ffe5de345495eDA04492dc4e12E` (or your deployer address)
- This wallet is automatically the main employer

### **Option 2: Authorize Your Current Wallet**
If you want to use a different wallet:
1. Connect with the main employer wallet first
2. Go to "Settings"
3. Add your other wallet as an authorized employer
4. Disconnect and reconnect with the new wallet
5. You should now see "Employer" role

---

## 🎯 **Test the Work Verification Feature**

### **Step 1: Schedule a Payment with Work Verification**
1. Go to "Schedule Payment"
2. Fill in the form:
   - Recipient: Any wallet address
   - Amount: e.g., 100
   - Release Date: Tomorrow
   - **Toggle "Requires Work Verification" ON** ← Important!
   - Select currencies
3. Approve token
4. Submit payment

### **Step 2: Verify the Work**
1. Click "Verify Work" in sidebar
2. You should see the payment you just created
3. Status should be "Pending Verification"
4. Click "Verify Work" button
5. Wallet popup appears - sign the message
6. Wait for transaction confirmation
7. Status updates to "Verified"

### **Step 3: Claim the Payment (as Employee)**
1. Disconnect current wallet
2. Connect with the recipient wallet
3. Go to "My Payments"
4. You should see the payment as "Claimable"
5. Click "Claim Payment"
6. Confirm transaction
7. Tokens are transferred to your wallet!

---

## 🐛 **Troubleshooting**

### **Issue: "Verify Work" link not showing**
**Solution:**
- Make sure you're connected as an employer
- Check the sidebar user section - should say "Employer"
- If it says "Employee", switch wallets

### **Issue: Dev server won't start**
**Solution:**
```bash
# Install dependencies first
npm install

# Then start
npm run dev
```

### **Issue: Port 3000 already in use**
**Solution:**
```bash
# Kill the process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Then restart
npm run dev
```

### **Issue: TypeScript errors**
**Solution:**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
npm install

# Restart
npm run dev
```

---

## 📋 **Quick Checklist**

Before testing, make sure:
- [ ] Frontend dev server is running (`npm run dev`)
- [ ] Browser is open to `http://localhost:3000`
- [ ] Wallet is connected
- [ ] Connected as **employer** (not employee)
- [ ] On Arc Testnet network
- [ ] Sidebar shows "Employer" role

---

## ✅ **Expected Result**

When everything is working:
1. ✅ Sidebar shows "Verify Work" link (with checkmark icon)
2. ✅ Clicking it navigates to work verification page
3. ✅ Page shows list of payments requiring verification
4. ✅ Can click "Verify Work" to sign and submit
5. ✅ Employees can claim verified payments

---

## 🎉 **You're All Set!**

Once the dev server is running and you're connected as an employer, you'll see the "Verify Work" link in the sidebar.

**Commands to run:**
```bash
cd Payso-frontend
npm run dev
```

Then open `http://localhost:3000` in your browser!

---

## 💡 **Pro Tip**

Keep the dev server running in a separate terminal window so you can see any errors or logs in real-time.

**Happy testing!** 🚀

