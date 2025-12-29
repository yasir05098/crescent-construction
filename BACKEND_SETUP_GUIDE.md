# 🚀 BACKEND SETUP GUIDE - Email & WhatsApp Integration

**Status:** Complete backend system with Email + WhatsApp support

---

## 📋 What's Included

✅ **Node.js/Express Server** - Quote management API  
✅ **Email Integration** - Gmail with Nodemailer  
✅ **WhatsApp Integration** - Twilio WhatsApp API  
✅ **Database** - JSON file storage (easy to upgrade to MongoDB/PostgreSQL later)  
✅ **Admin Dashboard** - API endpoints for quotes management  
✅ **Updated Frontend** - JavaScript to connect to backend  

---

## 🛠️ STEP 1: Install Node.js

### Windows:
1. Download from: https://nodejs.org/ (LTS version recommended)
2. Run installer and click "Next" through all steps
3. Restart your computer
4. Open PowerShell and verify: `node --version` and `npm --version`

### macOS:
```bash
brew install node
```

### Linux (Ubuntu):
```bash
sudo apt-get install nodejs npm
```

---

## 📦 STEP 2: Install Backend Dependencies

1. Open Terminal/PowerShell
2. Navigate to your project folder:
```bash
cd "c:\Users\ilham\Downloads\cresent contruction"
```

3. Install packages:
```bash
npm install
```

This will install:
- `express` - Web server framework
- `cors` - Cross-origin request handling
- `nodemailer` - Email sending
- `twilio` - WhatsApp sending
- `dotenv` - Environment variables

---

## 🔑 STEP 3: Configure Gmail (For Email)

### Get Gmail App Password:

1. **Enable 2-Factor Authentication:**
   - Go to: https://myaccount.google.com/security
   - Scroll down to "2-Step Verification"
   - Click "Get Started" and follow steps

2. **Generate App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Google will generate a 16-character password
   - Copy this password (ignore spaces)

3. **Update `.env` file:**
   - Copy `.env.example` to `.env`
   - Add your Gmail details:
   ```
   GMAIL_USER=your-email@gmail.com
   GMAIL_PASSWORD=abcd1234efgh5678
   ```

---

## 💬 STEP 4: Configure Twilio (For WhatsApp)

### Get Twilio WhatsApp Number:

1. **Sign Up at Twilio:**
   - Go to: https://www.twilio.com/try-twilio
   - Create free account (gets $15 credits)
   - Verify your phone number

2. **Get Account Credentials:**
   - Dashboard: https://www.twilio.com/console
   - Copy "Account SID" and "Auth Token"
   - Save these somewhere safe

3. **Set Up WhatsApp Sandbox:**
   - Go to: https://www.twilio.com/console/sms/whatsapp/learn
   - Follow "WhatsApp Sandbox" setup
   - Get your Twilio WhatsApp number (format: +1234567890)

4. **Update `.env` file:**
   ```
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your_auth_token_here
   TWILIO_WHATSAPP_NUMBER=+1234567890
   ```

---

## ⚙️ STEP 5: Final Configuration

1. **Create `.env` file in project root:**
   ```
   PORT=3000
   NODE_ENV=development

   GMAIL_USER=your-email@gmail.com
   GMAIL_PASSWORD=your-app-password

   TWILIO_ACCOUNT_SID=your-account-sid
   TWILIO_AUTH_TOKEN=your-auth-token
   TWILIO_WHATSAPP_NUMBER=+1234567890

   ADMIN_EMAIL=crescentconstructiontvl@gmail.com
   ```

2. **Verify all values are correct**

---

## 🚀 STEP 6: Start the Server

### Option 1: Normal Mode
```bash
npm start
```

### Option 2: Development Mode (Auto-restart on changes)
```bash
npm run dev
```

You should see:
```
╔════════════════════════════════════════════╗
║  🏗️  CRESENT CONSTRUCTION QUOTE SERVER     ║
╚════════════════════════════════════════════╝

✅ Server running on http://localhost:3000
📧 Email Service: ✓ Configured
💬 WhatsApp Service: ✓ Configured
📁 Database: ./quotes.json

Ready to receive quote requests! 🚀
```

---

## 🌐 STEP 7: Test the Website

1. Open browser: `http://localhost:3000`
2. Click "Get a Quote" button
3. Fill in form:
   - Name: Test User
   - Phone: 9876543210
   - Email: your-email@gmail.com
   - Project Type: Residential
   - Message: Test quote

4. Click Submit

**What happens:**
- ✅ Email sent to admin (crescentconstructiontvl@gmail.com)
- ✅ Confirmation email sent to customer
- ✅ WhatsApp message sent to customer's phone
- ✅ Quote saved to `quotes.json`

---

## 📊 API Endpoints

### Submit Quote
```
POST /api/submit-quote
Content-Type: application/json

{
    "fullName": "John Doe",
    "phone": "9876543210",
    "email": "john@example.com",
    "projectType": "residential",
    "message": "I need a house built"
}

Response:
{
    "success": true,
    "message": "Quote submitted successfully!",
    "quoteId": 1703605200000
}
```

### Get All Quotes
```
GET /api/quotes

Response:
{
    "success": true,
    "total": 5,
    "quotes": [
        {
            "id": 1703605200000,
            "fullName": "John Doe",
            "phone": "9876543210",
            "email": "john@example.com",
            "projectType": "residential",
            "message": "I need a house built",
            "createdAt": "2025-12-26T10:00:00.000Z"
        }
    ]
}
```

### Get Single Quote
```
GET /api/quotes/1703605200000
```

### Delete Quote
```
DELETE /api/quotes/1703605200000
```

### Health Check
```
GET /api/health

Response:
{
    "status": "OK",
    "server": "Cresent Construction Quote Server",
    "timestamp": "2025-12-26T10:00:00.000Z"
}
```

---

## 📁 Database File

Quotes are saved to: `quotes.json`

Example content:
```json
[
    {
        "id": 1703605200000,
        "fullName": "John Doe",
        "phone": "9876543210",
        "email": "john@example.com",
        "projectType": "residential",
        "message": "I need a house built",
        "createdAt": "2025-12-26T10:00:00.000Z"
    }
]
```

You can:
- ✅ View quotes.json with any text editor
- ✅ Delete entries directly from file
- ✅ Backup to external storage
- ✅ Later migrate to real database (MongoDB, PostgreSQL)

---

## 🐛 Troubleshooting

### Error: "Port 3000 already in use"
```bash
# Windows - Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### Error: "GMAIL_USER not defined"
- Check `.env` file exists in project root
- Verify all variables are set
- Check for typos

### Error: "Twilio account not found"
- Verify Account SID and Auth Token are correct
- Check Twilio console for active account
- Ensure WhatsApp Sandbox is enabled

### Email not sending
- Use Gmail app password (not regular password)
- Enable 2-Factor Authentication on Gmail
- Check Gmail "Allow less secure apps" if using old Gmail

### WhatsApp message not sending
- Ensure Twilio account is active and has credits
- Verify phone number has WhatsApp installed
- Confirm WhatsApp Sandbox number is correct
- Check Twilio console for error messages

---

## 🔒 Security Notes

### Before Production:

1. **Never commit `.env` file** to Git
   - Add to `.gitignore`: `.env`
   - Only commit `.env.example`

2. **Use environment variables**
   - Don't hardcode secrets in code
   - Use strong, unique passwords

3. **Add Authentication to API**
   - Protect `/api/quotes` endpoints
   - Require admin password or token

4. **Use HTTPS**
   - Deploy with SSL certificate
   - Never send data over HTTP

5. **Validate all inputs**
   - Check data types
   - Sanitize user input
   - Prevent SQL injection

6. **Rate limiting**
   - Limit quotes per IP
   - Prevent spam submissions

---

## 📈 Upgrading to Production

### Option 1: Vercel (Recommended - Free)
```bash
npm install -g vercel
vercel
```

### Option 2: Heroku
```bash
npm install -g heroku
heroku create
git push heroku main
```

### Option 3: AWS/DigitalOcean
- Deploy Node.js app to cloud server
- Set up domain and SSL
- Configure environment variables

---

## 📧 Email Features

✅ Sends to admin with full quote details  
✅ Sends confirmation to customer  
✅ Beautiful HTML formatted emails  
✅ Reply-to customer email address  
✅ Company branding in emails  

---

## 💬 WhatsApp Features

✅ Sends quote confirmation message  
✅ Includes company contact info  
✅ Professional formatted message  
✅ 24-48 hour response promise  
✅ Links to multiple contact channels  

---

## 📞 Support

If you encounter issues:

1. Check server logs for error messages
2. Verify `.env` configuration
3. Test API endpoints with Postman
4. Check Twilio/Gmail console for errors
5. Review server.js code comments

---

## 🎉 Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Configure `.env` file
3. ✅ Test with `npm start`
4. ✅ Submit test quote
5. ✅ Verify email and WhatsApp work
6. ✅ Deploy to production
7. ✅ Monitor quotes coming in!

---

**Your quote system is now ready! 🚀**

**Admin access quotes at:**
- Local: http://localhost:3000/api/quotes
- Production: https://yoursite.com/api/quotes

Happy receiving quotes! 🏗️
