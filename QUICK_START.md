# 🚀 QUICK START - Email & WhatsApp Quote System

## ⚡ 5-Minute Setup

### Step 1: Open Terminal
```bash
cd c:\Users\ilham\Downloads\cresent\ contruction
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create .env File
Create a file named `.env` in your project folder with:

```
PORT=3000
NODE_ENV=development
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-app-password-16-chars
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_WHATSAPP_NUMBER=+1234567890
```

### Step 4: Start Server
```bash
npm start
```

### Step 5: Open Website
```
http://localhost:3000
```

---

## 📧 Get Gmail App Password (2 minutes)

1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Copy the 16-character password
4. Paste in `.env` file as `GMAIL_PASSWORD`

---

## 💬 Get Twilio WhatsApp (5 minutes)

1. Sign up: https://www.twilio.com/try-twilio (free $15 credit)
2. Dashboard: https://www.twilio.com/console
3. Copy "Account SID" and "Auth Token"
4. Go to WhatsApp Sandbox: https://www.twilio.com/console/sms/whatsapp/learn
5. Get your WhatsApp number
6. Paste all 3 values in `.env` file

---

## ✅ Test It

1. Visit: `http://localhost:3000`
2. Click "Get a Quote"
3. Fill form and submit
4. Check your email ✉️
5. Check WhatsApp 💬

---

## 📊 View All Quotes

**Admin Dashboard:** `http://localhost:3000/admin.html`

Features:
- 📊 Statistics & analytics
- 🔍 Filter by project type
- 📥 Export to CSV
- 🗑️ Delete quotes
- 👁️ View details

---

## 🔗 API Endpoints

| Endpoint | Method | Use |
|----------|--------|-----|
| `/api/submit-quote` | POST | Submit form |
| `/api/quotes` | GET | Get all quotes |
| `/api/quotes/:id` | GET | Get single quote |
| `/api/quotes/:id` | DELETE | Delete quote |
| `/api/health` | GET | Check server status |

---

## ❌ If Something Doesn't Work

**Error: Port 3000 already in use**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID 12345 /F
```

**Error: Missing GMAIL_USER**
- Check `.env` file exists
- Verify spelling and values

**Email not sending**
- Use Gmail app password (not regular password)
- Enable 2-Factor Authentication

**WhatsApp not sending**
- Check Twilio account is active
- Verify sandbox is enabled

---

## 📁 What's New

| File | Purpose |
|------|---------|
| `server.js` | 🖥️ Backend server |
| `.env.example` | 🔑 Configuration template |
| `package.json` | 📦 Dependencies |
| `admin.html` | 📊 Dashboard |
| `BACKEND_SETUP_GUIDE.md` | 📖 Detailed guide |
| `js/main.js` | ✅ Updated for backend |

---

## 🎯 What Happens When User Submits Quote

1. **Form Validation** ✓ Check all fields
2. **Send to Server** → POST to `/api/submit-quote`
3. **Save to Database** → `quotes.json`
4. **Send Email to Admin** → crescentconstructiontvl@gmail.com
5. **Send Confirmation Email** → Customer's email
6. **Send WhatsApp Message** → Customer's phone
7. **Show Success Message** → "Quote submitted!"

---

## 🚀 Deploy to Production

```bash
# Vercel (Free)
npm install -g vercel
vercel

# Heroku
npm install -g heroku
heroku create
git push heroku main
```

---

## 📞 Support

See `BACKEND_SETUP_GUIDE.md` for detailed help

---

**Ready to go! 🏗️**
