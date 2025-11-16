# 🔧 Troubleshooting: "Verify Work" Navigation Not Showing

## ❓ **Issue**
The "Verify Work" link is not appearing in the sidebar.

---

## ✅ **Solution Steps**

### **1. Restart the Frontend Dev Server** ⚡ **MOST LIKELY FIX**

The Next.js dev server needs to be restarted to recognize the new route.

**Steps:**
1. Stop the current dev server (Ctrl+C in the terminal)
2. Restart it:
   ```bash
   cd Payso-frontend
   npm run dev
   ```
3. Wait for the server to fully start
4. Refresh your browser (Ctrl+F5 or Cmd+Shift+R)

---

### **2. Verify You're Connected as an Employer** 👤

The "Verify Work" link **only appears for employers**, not employees.

**Check if you're an employer:**
- Look at the sidebar user section
- Should say "Employer" (not "Employee")
- Your wallet address should match the contract employer address

**If you see "Employee":**
- You're connected with the wrong wallet
- Switch to the employer wallet (the one that deployed the contract)
- Or use the multi-employer feature to authorize your current address

---

### **3. Clear Browser Cache** 🗑️

Sometimes the browser caches the old sidebar.

**Steps:**
1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"
4. Or use Ctrl+Shift+Delete to clear cache

---

## 📍 **Where to Find "Verify Work"**

The "Verify Work" link should appear in the sidebar between "Scheduled" and "Settings":

```
Sidebar Navigation (Employer View):
├── 📊 Overview
├── 💰 Schedule Payment
├── ⏰ Scheduled
├── ✅ Verify Work          ← NEW LINK HERE
└── ⚙️ Settings
```

**Icon:** FileCheck (checkmark with document)  
**Route:** `/dashboard/verify-work`  
**Visible to:** Employers only

---

## 🔍 **Verify Files Exist**

Check that these files were created:

### **1. Component File**
```bash
Payso-frontend/components/dashboard/work-verification.tsx
```
Should exist and be ~300 lines

### **2. Page File**
```bash
Payso-frontend/app/dashboard/verify-work/page.tsx
```
Should exist and be ~23 lines

### **3. Sidebar Updated**
```bash
Payso-frontend/components/dashboard/sidebar.tsx
```
Should have `FileCheck` import and "Verify Work" in `employerNavItems`

---

## 🧪 **Test the Route Directly**

Even if the link doesn't show, you can test the route directly:

1. Navigate to: `http://localhost:3000/dashboard/verify-work`
2. If the page loads, the route works (just need to fix sidebar visibility)
3. If you get 404, restart the dev server

---

## 🐛 **Common Issues**

### **Issue 1: "Verify Work" link not visible**
**Cause:** Connected as employee, not employer  
**Fix:** Switch to employer wallet

### **Issue 2: 404 error when clicking link**
**Cause:** Dev server not restarted  
**Fix:** Restart dev server with `npm run dev`

### **Issue 3: Link visible but page is blank**
**Cause:** Component import error  
**Fix:** Check browser console for errors

### **Issue 4: TypeScript errors**
**Cause:** Missing dependencies  
**Fix:** Run `npm install` in Payso-frontend directory

---

## 📋 **Quick Checklist**

- [ ] Dev server restarted
- [ ] Browser cache cleared
- [ ] Connected as employer (not employee)
- [ ] Files exist in correct locations
- [ ] No console errors in browser DevTools
- [ ] Route works when accessed directly

---

## 🔧 **Manual Verification**

### **Check Sidebar Code:**

Open `Payso-frontend/components/dashboard/sidebar.tsx` and verify:

**Line 7:** Should have `FileCheck` import
```typescript
import { LayoutDashboard, Wallet, Clock, Settings, LogOut, Menu, X, FileCheck } from 'lucide-react'
```

**Lines 17-23:** Should have "Verify Work" in employer nav items
```typescript
const employerNavItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: Wallet, label: 'Schedule Payment', href: '/dashboard/payments' },
  { icon: Clock, label: 'Scheduled', href: '/dashboard/scheduled' },
  { icon: FileCheck, label: 'Verify Work', href: '/dashboard/verify-work' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]
```

---

## 🎯 **Expected Behavior**

### **When Connected as Employer:**
- ✅ See "Verify Work" link in sidebar
- ✅ Can click to navigate to `/dashboard/verify-work`
- ✅ See work verification page with payment list

### **When Connected as Employee:**
- ❌ "Verify Work" link NOT visible (this is correct)
- ✅ Only see: Overview, My Payments, Upcoming, Settings

---

## 🚀 **Quick Test**

Run this in your browser console while on the dashboard:

```javascript
// Check if you're an employer
console.log('Current path:', window.location.pathname)
console.log('Sidebar element:', document.querySelector('aside'))
console.log('Nav links:', Array.from(document.querySelectorAll('nav a')).map(a => a.textContent))
```

This will show all navigation links. If "Verify Work" is not in the list, you're likely connected as an employee.

---

## 💡 **Still Not Working?**

### **Option 1: Force Refresh Everything**
```bash
# Stop dev server (Ctrl+C)
cd Payso-frontend
rm -rf .next
npm run dev
```

### **Option 2: Check for TypeScript Errors**
```bash
cd Payso-frontend
npm run build
```
This will show any compilation errors.

### **Option 3: Check Browser Console**
1. Open DevTools (F12)
2. Go to Console tab
3. Look for any red errors
4. Share the errors if you need help

---

## 📞 **Need More Help?**

If the link still doesn't appear after trying all the above:

1. **Check the browser console** for errors
2. **Verify you're on the employer wallet** (check sidebar user section)
3. **Try accessing the route directly**: `http://localhost:3000/dashboard/verify-work`
4. **Share any error messages** you see

---

## ✅ **Success Indicators**

You'll know it's working when:
- ✅ "Verify Work" link appears in sidebar (with FileCheck icon)
- ✅ Clicking it navigates to work verification page
- ✅ Page shows "Work Verification" title
- ✅ Page lists payments requiring verification
- ✅ "Verify Work" buttons appear for each payment

---

**Most likely fix:** Just restart the dev server! 🔄

```bash
# In Payso-frontend directory
npm run dev
```

Then refresh your browser and check the sidebar again.

