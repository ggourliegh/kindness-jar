# Kindness Jar Backend Setup

Quick setup instructions for your payment processing server.

## Files Included

- `server.js` - Your Express server with Stripe integration
- `package.json` - Dependencies configuration
- `.env.template` - Template for your environment variables

## Quick Setup

### 1. Create Project Folder

```bash
mkdir kindness-jar-backend
cd kindness-jar-backend
```

### 2. Copy Files

Copy these files into your `kindness-jar-backend` folder:
- server.js
- package.json
- .env.template

### 3. Create Your .env File

```bash
# Rename .env.template to .env
mv .env.template .env

# Or on Windows:
ren .env.template .env
```

Then open `.env` and replace `sk_test_PASTE_YOUR_SECRET_KEY_HERE` with your actual Stripe secret key.

### 4. Install Dependencies

```bash
npm install
```

### 5. Start Server

```bash
npm start
```

You should see:
```
✅ Server running on http://localhost:3000
💳 Ready to accept donations!
```

## Testing

Open your browser and go to:
```
http://localhost:3000
```

You should see: "Kindness Jar Payment Server is running! 🎉"

## Next Steps

1. Update your frontend HTML file with your Stripe publishable key
2. Test a donation with Stripe test card: 4242 4242 4242 4242
3. Deploy to Heroku (see main setup guide)

## Support

See `STRIPE-SETUP-GUIDE-OPTION-B.md` for complete instructions.
