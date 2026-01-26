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
// When deployed to Netlify, change to: 'https://your-app.netlify.app'

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
              images: ['https://i.imgur.com/placeholder.png'], // Optional: add your logo URL
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
  console.log(`📝 Don't forget to update YOUR_DOMAIN when deploying!`);
});
