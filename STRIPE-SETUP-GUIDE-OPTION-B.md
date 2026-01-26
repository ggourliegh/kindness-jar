# 💳 STRIPE CHECKOUT SESSIONS - COMPLETE SETUP GUIDE

**Method:** Option B - Checkout Sessions (Most Flexible)  
**Time Required:** 45-60 minutes  
**Skill Level:** Beginner-friendly with detailed steps  
**Result:** Full payment processing with your bank account

---

## 📋 WHAT YOU'LL NEED

- ✅ Stripe account (you have this!)
- ✅ Text editor (VS Code, Sublime, Notepad++)
- ✅ Terminal/Command Prompt
- ✅ Node.js installed (we'll install if needed)
- ✅ Your Kindness Jar HTML file

---

## 🎯 OVERVIEW

We're building this:

```
User clicks "Donate $5"
  ↓
Your App sends request to YOUR server
  ↓
YOUR Server creates Stripe Checkout Session
  ↓
Stripe redirects user to secure payment page
  ↓
User enters card details on Stripe's page (not yours!)
  ↓
Payment successful
  ↓
Stripe redirects back to your app
  ↓
Money goes to YOUR bank account! 🎉
```

**Why this is better than Payment Links:**
- More control over user experience
- Can customize success messages
- Can track conversions better
- Professional integration
- Foundation for future premium features

---

## PART 1: GET YOUR STRIPE KEYS (5 minutes)

### Step 1.1: Log into Stripe Dashboard

1. Go to [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. Log in with your Stripe account

### Step 1.2: Switch to Test Mode (Important!)

**Look at the top right corner:**
- You'll see a toggle switch that says "Test mode" or "Live mode"
- **Switch to TEST MODE** (we'll test first, then switch to live)
- The toggle should be ON (showing "Test mode")

### Step 1.3: Get Your Test API Keys

1. **Click** "Developers" in left sidebar
2. **Click** "API keys"
3. You'll see two keys:

**Publishable key** (Safe to share, goes in frontend):
```
pk_test_51xxxxxxxxxxxxxxxxxxxxx
```
**Copy this** and save it in a text file labeled "PUBLISHABLE KEY"

**Secret key** (NEVER share, only use on backend):
- **Click** "Reveal test key"
```
sk_test_51xxxxxxxxxxxxxxxxxxxxx
```
**Copy this** and save it in a text file labeled "SECRET KEY"

⚠️ **IMPORTANT:** 
- Never put secret key in your HTML file
- Never commit it to GitHub
- Only use it on your backend server

### Step 1.4: Save Your Keys

Create a text file called `stripe-keys.txt`:
```
PUBLISHABLE KEY (frontend):
pk_test_51xxxxxxxxxxxxxxxxxxxxx

SECRET KEY (backend - KEEP PRIVATE):
sk_test_51xxxxxxxxxxxxxxxxxxxxx
```

---

## PART 2: INSTALL NODE.JS (10 minutes)

### Step 2.1: Check if Node.js is Already Installed

Open Terminal (Mac/Linux) or Command Prompt (Windows):

```bash
node --version
```

**If you see:** `v18.0.0` or similar → **Skip to Part 3!**  
**If you see:** "command not found" → **Continue below**

### Step 2.2: Install Node.js

**Windows:**
1. Go to [https://nodejs.org](https://nodejs.org)
2. Download "LTS" version (recommended)
3. Run installer
4. Keep clicking "Next" (default options are fine)
5. Restart your computer
6. Open Command Prompt and test: `node --version`

**Mac:**
1. Go to [https://nodejs.org](https://nodejs.org)
2. Download "LTS" version
3. Run the .pkg installer
4. Open Terminal and test: `node --version`

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version
```

---

## PART 3: CREATE YOUR BACKEND SERVER (20 minutes)

### Step 3.1: Create Project Folder

**On Windows:**
```cmd
cd Desktop
mkdir kindness-jar-backend
cd kindness-jar-backend
```

**On Mac/Linux:**
```bash
cd ~/Desktop
mkdir kindness-jar-backend
cd kindness-jar-backend
```

### Step 3.2: Initialize Node.js Project

```bash
npm init -y
```

You'll see: `package.json` created ✅

### Step 3.3: Install Required Packages

```bash
npm install express stripe cors dotenv
```

**What these do:**
- **express** - Web server framework
- **stripe** - Stripe's official library
- **cors** - Allow frontend to talk to backend
- **dotenv** - Secure way to store API keys

Wait for installation... (~30 seconds)

### Step 3.4: Create Environment Variables File

Create a file called `.env` in your `kindness-jar-backend` folder:

**Windows (Command Prompt):**
```cmd
echo. > .env
```

**Mac/Linux (Terminal):**
```bash
touch .env
```

**Open `.env` in your text editor and add:**
```
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_SECRET_KEY_HERE
PORT=3000
```

**Replace** `sk_test_YOUR_ACTUAL_SECRET_KEY_HERE` with your actual secret key from Part 1!

⚠️ **NEVER commit .env to GitHub!**

### Step 3.5: Create the Backend Server File

Create a file called `server.js` in your `kindness-jar-backend` folder.

**Copy this complete code:**

```javascript
// Load environment variables
require('dotenv').config();

// Import required packages
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

// Create Express app
const app = express();

// Middleware
app.use(cors()); // Allow requests from your frontend
app.use(express.json()); // Parse JSON bodies

// Your website URL (change after deploying!)
const YOUR_DOMAIN = 'http://localhost:8080'; // For local testing

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Kindness Jar Payment Server is running! 🎉');
});

// Create checkout session endpoint
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { amount } = req.body;

    // Validate amount
    if (!amount || amount < 1) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Kindness Jar Donation',
              description: 'Support the Kindness Jar app and help spread kindness! 💖',
              images: ['https://i.imgur.com/placeholder.png'], // Optional: add your logo
            },
            unit_amount: amount, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}?success=true&amount=${amount}`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    // Return session ID to frontend
    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`💳 Ready to accept donations!`);
});
```

**Save this file as `server.js`**

### Step 3.6: Test Your Backend Server

In your terminal (still in `kindness-jar-backend` folder):

```bash
node server.js
```

**You should see:**
```
✅ Server running on http://localhost:3000
💳 Ready to accept donations!
```

🎉 **Your backend is working!**

**Leave this terminal window open!** (Server needs to keep running)

---

## PART 4: UPDATE YOUR FRONTEND (15 minutes)

### Step 4.1: Open Your HTML File

Open `kindness-jar-v4-super-fun.html` in your text editor.

### Step 4.2: Add Stripe.js Library

**Find this line (around line 10):**
```html
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

**Add this line RIGHT AFTER it:**
```html
<script src="https://js.stripe.com/v3/"></script>
```

### Step 4.3: Update the handleDonate Function

**Find this function (around line 1500):**
```javascript
const handleDonate = async () => {
  // In production, you would integrate with Stripe here
  alert(`Thank you for your support! Donation feature coming soon. You selected $${donationAmount}`);
  // Stripe integration would go here:
  // const stripe = Stripe('your-publishable-key');
  // stripe.redirectToCheckout({ ... })
};
```

**Replace it with this:**
```javascript
const handleDonate = async () => {
  try {
    // Initialize Stripe with your PUBLISHABLE key
    const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY_HERE'); // Replace with your key!
    
    // Show loading state
    const originalText = 'Donate';
    // You could update button text here
    
    // Call your backend to create checkout session
    const response = await fetch('http://localhost:3000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: donationAmount * 100, // Convert dollars to cents
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const session = await response.json();

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  } catch (error) {
    console.error('Payment error:', error);
    alert('Something went wrong. Please try again.');
  }
};
```

**IMPORTANT:** Replace `pk_test_YOUR_PUBLISHABLE_KEY_HERE` with your actual publishable key from Part 1!

### Step 4.4: Add Success/Cancel Handling

**Find the App component start (around line 1380):**
```javascript
function App() {
  // State management
  const [selectedJar, setSelectedJar] = useState(null);
```

**Add this code RIGHT AFTER the state declarations (before the useEffect hooks):**
```javascript
  // Check for payment success/cancel on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const canceled = urlParams.get('canceled');
    const amount = urlParams.get('amount');

    if (success) {
      const dollars = (parseInt(amount) / 100).toFixed(2);
      alert(`🎉 Thank you for your ${dollars} donation! You're amazing! 💖`);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (canceled) {
      alert('Donation was canceled. No worries, you can try again anytime! 😊');
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);
```

### Step 4.5: Save Your Changes

**Save** `kindness-jar-v4-super-fun.html`

---

## PART 5: TEST THE FULL PAYMENT FLOW (10 minutes)

### Step 5.1: Start a Local Server for Your Frontend

**Open a NEW terminal window** (keep your backend running in the other one!)

**Navigate to where your HTML file is:**
```bash
cd Desktop
# or wherever your HTML file is
```

**Start a simple HTTP server:**

**If you have Python (Mac/Linux usually do):**
```bash
python3 -m http.server 8080
```

**Or Python 2:**
```bash
python -m SimpleHTTPServer 8080
```

**If you don't have Python (Windows):**
```bash
npx http-server -p 8080
```

**You should see:**
```
Serving HTTP on 0.0.0.0 port 8080 ...
```

### Step 5.2: Open Your App in Browser

Open your browser and go to:
```
http://localhost:8080/kindness-jar-v4-super-fun.html
```

### Step 5.3: Test a Donation

1. **Click** "Support This App" button
2. **Select** an amount (e.g., $5)
3. **Click** "Donate $5"
4. **You should be redirected** to Stripe's payment page!

### Step 5.4: Use Stripe Test Card

On the Stripe payment page, use these **TEST card details:**

```
Card number: 4242 4242 4242 4242
Expiration: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
Email: your-email@example.com
```

**Click** "Pay"

### Step 5.5: Verify Success

You should:
1. Be redirected back to your app
2. See success message: "🎉 Thank you for your $5.00 donation!"
3. Check your Stripe Dashboard → Payments → See the test payment!

🎉 **IT WORKS!**

---

## PART 6: DEPLOY TO PRODUCTION (20 minutes)

### Step 6.1: Deploy Backend to Heroku (Free)

**Install Heroku CLI:**
- Download from [https://devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)

**Login to Heroku:**
```bash
heroku login
```

**In your `kindness-jar-backend` folder:**
```bash
# Initialize git
git init
git add .
git commit -m "Initial backend commit"

# Create Heroku app
heroku create kindness-jar-backend

# Set environment variable
heroku config:set STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE

# Deploy
git push heroku main
```

**Your backend is now live at:** `https://kindness-jar-backend.herokuapp.com`

### Step 6.2: Update Frontend for Production

**In your HTML file, change:**

```javascript
// FROM:
const response = await fetch('http://localhost:3000/create-checkout-session', {

// TO:
const response = await fetch('https://kindness-jar-backend.herokuapp.com/create-checkout-session', {
```

**Also update in server.js:**
```javascript
// FROM:
const YOUR_DOMAIN = 'http://localhost:8080';

// TO:
const YOUR_DOMAIN = 'https://your-netlify-url.netlify.app';
```

Redeploy backend:
```bash
git add .
git commit -m "Update domain"
git push heroku main
```

### Step 6.3: Deploy Frontend to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Drag your updated HTML file
3. Get your URL (e.g., `kindness-jar-abc123.netlify.app`)

### Step 6.4: Switch to Live Mode

**In Stripe Dashboard:**
1. Toggle "Test mode" to OFF (switch to LIVE mode)
2. Get your LIVE keys:
   - `pk_live_...` (publishable key)
   - `sk_live_...` (secret key)

**Update your code:**
- Frontend HTML: Replace `pk_test_...` with `pk_live_...`
- Backend .env: Replace `sk_test_...` with `sk_live_...`
- Redeploy both

**Update Heroku:**
```bash
heroku config:set STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_SECRET_KEY
```

🎉 **YOU'RE LIVE! Real donations now go to your bank account!**

---

## PART 7: VERIFY IT'S WORKING

### Checklist:

- [ ] Backend running on Heroku
- [ ] Frontend on Netlify
- [ ] Stripe in LIVE mode
- [ ] LIVE keys in code
- [ ] Test a $1 donation (real card, real money)
- [ ] Check Stripe Dashboard → Payments
- [ ] Money appears in Stripe balance
- [ ] Success message shows in app

---

## 🆘 TROUBLESHOOTING

### "CORS Error" in browser console
**Fix:** Make sure `cors()` is in your server.js and backend is running

### "Network Error" when clicking donate
**Fix:** Check backend server is running (`node server.js`)

### "Invalid API Key"
**Fix:** Double-check you copied the FULL key from Stripe (starts with `sk_test_` or `pk_test_`)

### Payment succeeds but no success message
**Fix:** Check the `YOUR_DOMAIN` in server.js matches your frontend URL

### "Cannot find module 'express'"
**Fix:** Run `npm install` in your backend folder

---

## 📊 MONITORING PAYMENTS

**Stripe Dashboard:**
- Payments → See all transactions
- Balance → Money ready to transfer
- Customers → See donor info
- Reports → Analytics

**Money Transfer:**
- Stripe automatically transfers to your bank every 2 days
- Or you can do instant transfers (small fee)

---

## 🎉 YOU DID IT!

You now have:
- ✅ Full Stripe Checkout integration
- ✅ Secure payment processing
- ✅ Money going to YOUR bank account
- ✅ Professional payment flow
- ✅ Test mode for development
- ✅ Live mode for real donations

**Next steps:**
1. Test with real small donation ($1)
2. Share your app
3. Start receiving donations!
4. Watch your impact grow 💖

---

## 📚 FILES YOU CREATED

```
Desktop/
  └── kindness-jar-backend/
      ├── server.js           (your backend)
      ├── .env                (your secret keys - NEVER share!)
      ├── package.json        (dependencies)
      └── node_modules/       (installed packages)

  └── kindness-jar-v4-super-fun.html  (updated with Stripe)
```

---

**Congratulations! You've completed the full Stripe integration!** 🎊

Need help? Check the error in your terminal and browser console, or let me know what's not working!
