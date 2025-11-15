# 🔧 Error Fix Guide - "Cannot set property message"

## Error You're Seeing

```
TypeError: Cannot set property message of which has only a getter
```

## What This Means

This error occurs when there's an issue with how React Query (TanStack Query) is being initialized in the Web3Provider, typically related to SSR (Server-Side Rendering) in Next.js.

## Fixes Applied ✅

### 1. Updated Web3Provider
**File**: `components/web3-provider.tsx`

**Changed:**
```typescript
// OLD - Creates QueryClient outside component
const queryClient = new QueryClient()

export function Web3Provider({ children }) {
  return <QueryClientProvider client={queryClient}>
```

**To:**
```typescript
// NEW - Creates QueryClient inside component with useState
export function Web3Provider({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  }))
  
  return <QueryClientProvider client={queryClient}>
```

**Why:** This prevents SSR hydration mismatches.

### 2. Updated Wagmi Config
**File**: `lib/contracts/wagmi.ts`

**Changed:**
```typescript
// OLD - Using RainbowKit's getDefaultConfig
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

export const config = getDefaultConfig({...})
```

**To:**
```typescript
// NEW - Using wagmi's createConfig directly
import { createConfig } from 'wagmi'
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors'

export const config = createConfig({
  chains: [arcTestnet],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    coinbaseWallet({ appName: 'Payso' }),
  ],
  transports: {
    [arcTestnet.id]: http(),
  },
  ssr: true,
})
```

**Why:** More control over configuration and better SSR compatibility.

---

## How to Test the Fix

### 1. Stop the Dev Server
```bash
# Press Ctrl+C in terminal
```

### 2. Clear Next.js Cache
```bash
rm -rf .next
```

### 3. Restart Dev Server
```bash
npm run dev
```

### 4. Check Browser
- Visit http://localhost:3000
- Should load without errors
- Check browser console (F12)
- Should see no errors

---

## If Error Persists

### Option 1: Clear All Caches
```bash
# Stop server
# Delete cache folders
rm -rf .next
rm -rf node_modules/.cache

# Restart
npm run dev
```

### Option 2: Reinstall Dependencies
```bash
# Stop server
# Remove node_modules
rm -rf node_modules
rm -rf package-lock.json

# Reinstall
npm install

# Restart
npm run dev
```

### Option 3: Check for Version Conflicts
```bash
# Check versions
npm list wagmi
npm list @rainbow-me/rainbowkit
npm list @tanstack/react-query

# Should see:
# wagmi@2.19.4
# @rainbow-me/rainbowkit@2.2.9
# @tanstack/react-query@5.90.9
```

---

## Common Causes

### 1. SSR Hydration Mismatch
**Symptom:** Error on page load
**Fix:** Use `useState` for QueryClient ✅ (Applied)

### 2. Multiple QueryClient Instances
**Symptom:** Inconsistent state
**Fix:** Create client inside component ✅ (Applied)

### 3. Wagmi Config Issues
**Symptom:** Cannot read properties
**Fix:** Use createConfig directly ✅ (Applied)

### 4. RainbowKit Version Mismatch
**Symptom:** Type errors
**Fix:** Ensure compatible versions ✅ (Already correct)

---

## Verification Checklist

After applying fixes, verify:

- [ ] `npm run dev` starts without errors
- [ ] Landing page loads (http://localhost:3000)
- [ ] No console errors in browser
- [ ] "Connect Wallet" button appears
- [ ] Can click "Connect Wallet"
- [ ] RainbowKit modal opens
- [ ] Can connect MetaMask
- [ ] Dashboard loads after connection

---

## Expected Behavior

### ✅ Correct Output
```bash
npm run dev

▲ Next.js 16.0.3 (Turbopack)
- Local:   http://localhost:3000
- Network: http://192.168.4.107:3000

✓ Starting...
✓ Ready in 310ms
✓ Compiled / in 2.5s
```

### ❌ Error Output (What We're Fixing)
```bash
TypeError: Cannot set property message of which has only a getter
⨯ unhandledRejection: TypeError...
GET / 500 in 4.8s
```

---

## Files Modified

1. ✅ `components/web3-provider.tsx` - Fixed QueryClient initialization
2. ✅ `lib/contracts/wagmi.ts` - Simplified wagmi config
3. ✅ `components/wallet-connect.tsx` - Renamed to avoid conflicts (previous fix)

---

## Next Steps

### 1. Test the Fix
```bash
# Clear cache
rm -rf .next

# Restart
npm run dev
```

### 2. Verify Landing Page
- Visit http://localhost:3000
- Should load without errors

### 3. Test Wallet Connection
- Click "Connect Wallet"
- Modal should open
- Connect MetaMask
- Should work smoothly

### 4. Test Dashboard
- Navigate to /dashboard
- Should load
- Should show wallet info

---

## Still Having Issues?

### Check Browser Console
1. Open browser (Chrome/Firefox)
2. Press F12
3. Go to Console tab
4. Look for specific error messages
5. Share the exact error

### Check Terminal Output
1. Look at the terminal where `npm run dev` is running
2. Find the exact error line
3. Note the file and line number
4. Share the full error stack

### Common Solutions

**Error: "Module not found"**
```bash
npm install
```

**Error: "Port 3000 already in use"**
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

**Error: "Cannot find module '@rainbow-me/rainbowkit'"**
```bash
npm install @rainbow-me/rainbowkit@latest
```

---

## Summary

### What Was Wrong
- QueryClient created outside component (SSR issue)
- RainbowKit config might have compatibility issues

### What We Fixed
- ✅ QueryClient now created with useState
- ✅ Wagmi config simplified
- ✅ Better SSR compatibility

### Expected Result
- ✅ App loads without errors
- ✅ Wallet connection works
- ✅ Dashboard accessible

---

**Try the fix now:**
```bash
rm -rf .next && npm run dev
```

**🎯 This should resolve the error!**

