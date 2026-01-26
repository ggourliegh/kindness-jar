# Kindness Jar - Production Deployment Guide

**Version:** 4.1.0  
**Last Updated:** January 26, 2026  
**Status:** Ready for Deployment

---

## 🎯 Overview

This guide will help you deploy the Kindness Jar app to production with Stripe payment integration.

**What You'll Deploy:**
- **Frontend**: Netlify (Free tier)
- **Backend**: Render.com (Free tier available)
- **Payments**: Stripe (Pay-as-you-go)

**Total Time:** 30-45 minutes

---

## 📋 Prerequisites

Before starting, make sure you have:

- [ ] Stripe account created (stripe.com)
- [ ] GitHub account (for deployment)
- [ ] Netlify account (netlify.com)
- [ ] Render.com account (render.com)
- [ ] Your Stripe API keys (test and live)

---

## Part 1: Get Your Stripe API Keys

### Step 1: Log into Stripe Dashboard

1. Go to https://dashboard.stripe.com
2. Log in with your Stripe account

### Step 2: Get Test Keys (For Testing)

1. **Toggle to TEST MODE** (top right corner)
2. Click "Developers" → "API keys"
3. Copy both keys:
   - **Publishable key**: `pk_test_...` (for frontend)
   - **Secret key**: `sk_test_...` (for backend - click "Reveal")

### Step 3: Save Your Keys

Create a text file to save them:
```
TEST KEYS:
Publishable: pk_test_xxxxxxxxxxxxx
Secret: sk_test_xxxxxxxxxxxxx

LIVE KEYS (get these later):
Publishable: pk_live_xxxxxxxxxxxxx
Secret: sk_live_xxxxxxxxxxxxx
```

---

## Part 2: Deploy Backend to Render.com

### Step 1: Push Code to GitHub

Your code is already in the `feature/stripe-integration` branch. Let's merge it and push:

```bash
# Switch to develop branch
git checkout develop

# Merge feature branch
git merge feature/stripe-integration

# Push to GitHub
git push origin develop
```

### Step 2: Create Render Web Service

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `ggourliegh/kindness-jar`
4. Select the `develop` branch
5. Configure:
   - **Name**: `kindness-jar-backend`
   - **Region**: Oregon (US West)
   - **Branch**: `develop`
   - **Root Directory**: Leave blank
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 3: Add Environment Variables

In Render dashboard, go to "Environment" tab and add:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `STRIPE_SECRET_KEY` | `sk_test_YOUR_SECRET_KEY` (from Part 1) |
| `FRONTEND_URL` | `http://localhost:8080` (will update after frontend deploy) |

### Step 4: Deploy

1. Click "Create Web Service"
2. Wait for deployment (2-3 minutes)
3. Copy your backend URL: `https://kindness-jar-backend.onrender.com`

---

## Part 3: Deploy Frontend to Netlify

### Step 1: Prepare Frontend

Update the frontend with your Stripe publishable key and backend URL:

1. Open `kindness-jar-realistic-glass.html`
2. Find line ~1775 (in `handleDonate` function)
3. Replace:
   ```javascript
   const STRIPE_PUBLISHABLE_KEY = 'pk_test_YOUR_PUBLISHABLE_KEY_HERE';
   ```
   With your actual key:
   ```javascript
   const STRIPE_PUBLISHABLE_KEY = 'pk_test_51xxxxxxxxxxxxx';
   ```

4. Replace:
   ```javascript
   : 'https://your-backend-url.onrender.com';
   ```
   With your Render URL:
   ```javascript
   : 'https://kindness-jar-backend.onrender.com';
   ```

5. Save and commit:
   ```bash
   git add kindness-jar-realistic-glass.html
   git commit -m "config: add Stripe keys and backend URL for production"
   git push origin develop
   ```

### Step 2: Deploy to Netlify

**Option A: Drag & Drop (Easiest)**
1. Go to https://app.netlify.com
2. Drag `kindness-jar-realistic-glass.html` to the drop zone
3. Done! You get a URL like: `https://kindness-jar-abc123.netlify.app`

**Option B: GitHub Integration (Recommended)**
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub"
4. Select `ggourliegh/kindness-jar`
5. Configure:
   - **Branch**: `develop`
   - **Build command**: Leave blank
   - **Publish directory**: `.`
6. Click "Deploy"
7. Copy your Netlify URL

### Step 3: Update Backend with Frontend URL

1. Go back to Render.com dashboard
2. Go to your backend service → "Environment"
3. Update `FRONTEND_URL` to your Netlify URL:
   ```
   https://kindness-jar-abc123.netlify.app
   ```
4. Click "Save Changes"
5. Backend will automatically redeploy

---

## Part 4: Test the Integration

### Test Payment Flow

1. Visit your Netlify URL
2. Click "Support This App" button
3. Select $5
4. Click "Donate $5"
5. **You should be redirected to Stripe Checkout**
6. Use test card:
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits
7. Complete payment
8. **You should be redirected back with success message**

### Verify in Stripe Dashboard

1. Go to Stripe Dashboard → Payments
2. You should see your test payment!

---

## Part 5: Go Live with Real Payments

### Step 1: Get Live Stripe Keys

1. In Stripe Dashboard, toggle to **LIVE MODE**
2. Go to "Developers" → "API keys"
3. Copy your LIVE keys:
   - Publishable: `pk_live_...`
   - Secret: `sk_live_...`

### Step 2: Update Backend

1. Render.com → Environment
2. Update `STRIPE_SECRET_KEY` to `sk_live_...`
3. Save (will redeploy)

### Step 3: Update Frontend

1. Open `kindness-jar-realistic-glass.html`
2. Replace `pk_test_...` with `pk_live_...`
3. Commit and push:
   ```bash
   git add kindness-jar-realistic-glass.html
   git commit -m "config: switch to Stripe live mode"
   git push origin develop
   ```
4. Netlify will auto-deploy

### Step 4: Test with Real Money

**IMPORTANT**: Test with a small amount first!

1. Visit your app
2. Donate $1 with a real card
3. Verify money appears in Stripe Dashboard
4. Stripe will transfer to your bank in 2-7 days

---

## Part 6: Merge to Main & Tag Release

Once everything is tested and working:

```bash
# Switch to main branch
git checkout main

# Merge develop
git merge develop

# Tag the release
git tag -a v4.1.0 -m "Release v4.1.0 - Stripe Integration & Production Deployment"

# Push everything
git push origin main
git push origin v4.1.0
```

---

## 🎉 You're Live!

Your app is now:
- ✅ Deployed to production
- ✅ Accepting real donations
- ✅ Under version control
- ✅ Ready to share with the world!

---

## 📊 Monitoring

### Stripe Dashboard
- **Payments**: See all transactions
- **Balance**: Money ready to transfer
- **Transfers**: Automatic every 2 days

### Render.com
- **Logs**: View backend logs
- **Metrics**: CPU, memory usage
- **Free tier**: Spins down after 15 min inactivity

### Netlify
- **Analytics**: Page views, bandwidth
- **Deploy log**: Build history
- **Free tier**: 100GB bandwidth/month

---

## 🆘 Troubleshooting

### "CORS Error"
- Check `FRONTEND_URL` in Render matches your Netlify URL exactly
- Make sure no trailing slash

### "Payment Failed"
- Check Stripe keys are correct (test vs live)
- Verify backend is running (visit backend URL)
- Check browser console for errors

### Backend Not Responding
- Render free tier spins down after inactivity
- First request may take 30-60 seconds to wake up
- Consider upgrading to paid plan ($7/month) for always-on

---

## 💡 Next Steps

1. **Custom Domain**: Add your own domain in Netlify
2. **Analytics**: Add Google Analytics
3. **Marketing**: Share your app, create QR codes
4. **Features**: Add new features on feature branches
5. **Monitor**: Check Stripe dashboard regularly

---

**Congratulations! Your Kindness Jar app is live!** 🎊

*Deployment Guide Version: 1.0*  
*Last Updated: January 26, 2026*
