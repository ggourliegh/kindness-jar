# HOW TO ENABLE TRUE AI TASK GENERATION

**Current Status:** The "Get Random Act" button works by showing you random acts from the 400 acts already in the app. This works perfectly and doesn't require any setup!

**Want REAL AI-generated tasks?** Follow this guide to enable Claude AI to generate completely new, unique tasks on demand.

---

## ⚠️ WHY IT DOESN'T WORK YET

The Anthropic Claude API requires:
1. **API Key** (secret key from your Anthropic account)
2. **Backend Server** (can't put secret key in browser code - security risk!)

**You can't call the API directly from the browser** because:
- Your API key would be visible to anyone viewing your code
- Anyone could steal it and use your account
- You'd get charged for their usage!

---

## ✅ SOLUTION: ADD BACKEND ENDPOINT

You need a simple backend server that:
1. Receives request from your frontend
2. Calls Anthropic API with YOUR secret API key
3. Returns the generated act to frontend

---

## 🚀 QUICK SETUP (15 minutes)

### Step 1: Get Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up / Log in
3. Go to API Keys section
4. Create new key
5. Copy it: `sk-ant-xxxxx`

**Pricing:** $3 per million input tokens (very cheap!)
- Each generation ≈ 100 tokens
- $3 = ~10,000 generations!

### Step 2: Add to Your Backend

**If you already have the backend from Stripe setup:**

Add this to your `server.js`:

```javascript
// Add this endpoint to your existing server.js
app.post('/generate-kindness', async (req, res) => {
  try {
    const { category } = req.body;
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY, // Your secret key
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 200,
        messages: [{
          role: 'user',
          content: `Generate a unique, creative, and specific act of kindness for the category "${category}". It should be actionable, meaningful, and different from generic suggestions. Return ONLY the act itself, no preamble or explanation. Make it personal and heartfelt.`
        }]
      })
    });

    const data = await response.json();
    const generatedAct = data.content[0].text.trim();
    
    res.json({ act: generatedAct });
  } catch (error) {
    console.error('AI generation error:', error);
    res.status(500).json({ error: 'Failed to generate act' });
  }
});
```

**Add to your `.env` file:**
```
ANTHROPIC_API_KEY=sk-ant-YOUR_KEY_HERE
```

**Install fetch (if not already):**
```bash
npm install node-fetch
```

**Add to top of server.js:**
```javascript
const fetch = require('node-fetch');
```

### Step 3: Update Frontend

In your HTML file, find `handleGenerateAI` and replace with:

```javascript
const handleGenerateAI = async () => {
  setIsGenerating(true);
  
  try {
    const response = await fetch('http://localhost:3000/generate-kindness', {
      // Change to your deployed URL: https://your-backend.herokuapp.com/generate-kindness
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category: selectedJar.name
      })
    });

    const data = await response.json();
    
    setCurrentAct(data.act);
    setIsAIGenerated(true);
  } catch (error) {
    console.error('AI generation error:', error);
    alert('Could not generate new act. Please try again!');
  } finally {
    setIsGenerating(false);
  }
};
```

**Also update the button text back:**
```javascript
// Change from:
'↻ Get Random Act'

// Back to:
'🤖 Generate AI Task'
```

**And add back the AI badge:**
```javascript
{isAIGenerated && (
  <div style={{ textAlign: 'center' }}>
    <span className="ai-badge">✨ AI Generated ✨</span>
  </div>
)}
```

### Step 4: Test It

1. **Start your backend:**
   ```bash
   cd kindness-jar-backend
   node server.js
   ```

2. **Open your app**
3. **Click a jar**
4. **Click "Generate AI Task"**
5. **Watch real AI magic!** ✨

---

## 🌐 FOR PRODUCTION

**Update the fetch URL from:**
```javascript
'http://localhost:3000/generate-kindness'
```

**To your deployed backend:**
```javascript
'https://your-app-backend.herokuapp.com/generate-kindness'
```

---

## 💰 COST ESTIMATE

**Anthropic Pricing:**
- Input: $3 per million tokens
- Output: $15 per million tokens

**Per Generation:**
- Input: ~50 tokens ($0.00015)
- Output: ~100 tokens ($0.0015)
- **Total: ~$0.00165 per generation**

**Monthly Usage Examples:**
- 100 generations/month = $0.17
- 1,000 generations/month = $1.65
- 10,000 generations/month = $16.50

**Extremely affordable!**

---

## 🎯 ALTERNATIVE: KEEP IT SIMPLE

**Honestly?** The current system with 400 curated acts works great!

**Pros of NO AI:**
- ✅ Zero cost
- ✅ Zero setup
- ✅ Works immediately
- ✅ Acts are hand-picked quality
- ✅ No backend needed

**Pros of WITH AI:**
- ✅ Infinite variety
- ✅ Never repeats
- ✅ Contextual to category
- ✅ Always fresh
- ✅ "Wow" factor

**My Recommendation:**
- Launch without AI first
- See if users actually want more variety
- Add AI later if needed
- You already have 400 great acts!

---

## 📝 SUMMARY

**Current Status:** ✅ Works with 400 curated acts  
**To Enable AI:** Add backend endpoint (15 min setup)  
**Cost:** ~$0.002 per generation  
**Worth It?** Optional - current system is great!

---

**Questions?** Check the main setup guides or let me know! 🚀
