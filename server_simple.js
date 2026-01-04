const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const quoteFile = path.join(__dirname, 'quotes.json');

// ========== WHATSAPP ONLY ==========
async function sendWhatsAppMessage(phoneNumber, quoteData) {
    const accessToken = process.env.META_WHATSAPP_ACCESS_TOKEN?.trim();
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim();
    
    if (!accessToken || !phoneNumberId) {
        console.log('❌ WhatsApp config missing');
        return false;
    }

    console.log(`📱 Sending to: ${phoneNumber}`);
    console.log(`📞 Phone ID: ${phoneNumberId}`);

    try {
        const url = `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`;
        
        // Build template with quote data as parameters
        const payload = {
            messaging_product: 'whatsapp',
            to: phoneNumber,
            type: 'template',
            template: {
                name: 'quote_notification',
                language: { code: 'en_US' },
                body: {
                    parameters: [
                        { type: 'text', text: quoteData.fullName },
                        { type: 'text', text: quoteData.phone },
                        { type: 'text', text: quoteData.email },
                        { type: 'text', text: quoteData.projectType },
                        { type: 'text', text: quoteData.message }
                    ]
                }
            }
        };
        
        const response = await axios.post(
            url,
            payload,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        console.log(`✅ Message sent to ${phoneNumber}`);
        return true;
    } catch (error) {
        console.error('❌ WhatsApp error:', error.response?.data?.error || error.message);
        return false;
    }
}

// ========== HOME ==========
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ========== SUBMIT QUOTE API ==========
app.post('/api/submit-quote', async (req, res) => {
    try {
        const { fullName, phone, email, projectType, message } = req.body;

        if (!fullName || !phone || !email || !projectType || !message) {
            return res.status(400).json({ success: false, error: 'All fields required' });
        }

        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({ success: false, error: 'Phone must be 10 digits' });
        }

        console.log(`\n📋 New Quote from ${fullName}`);

        // Save quote to database
        let quotes = [];
        if (fs.existsSync(quoteFile)) {
            quotes = JSON.parse(fs.readFileSync(quoteFile, 'utf8'));
        }
        const quoteData = { fullName, phone, email, projectType, message, timestamp: new Date().toISOString() };
        quotes.push(quoteData);
        fs.writeFileSync(quoteFile, JSON.stringify(quotes, null, 2));

        // Send to owner
        const ownerPhone = process.env.OWNER_WHATSAPP_NUMBER;
        console.log(`👨‍💼 Sending quote to owner: ${ownerPhone}`);
        await sendWhatsAppMessage(ownerPhone, quoteData);

        // Send confirmation to customer
        const customerPhone = `91${phone}`;
        const confirmationData = {
            fullName,
            phone: '+91 7418 621 523',
            email: 'info@crescentconstruction.com',
            projectType: 'Quote Confirmation',
            message: 'Thank you! We received your request and will contact you soon.'
        };
        console.log(`👤 Sending confirmation to customer: ${customerPhone}`);
        await sendWhatsAppMessage(customerPhone, confirmationData);

        res.json({ 
            success: true, 
            message: 'Quote received! Check WhatsApp.' 
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// ========== START ==========
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\n✅ Server running on http://localhost:${PORT}\n`);
    console.log(`Token: ${process.env.META_WHATSAPP_ACCESS_TOKEN ? '✓ Present' : '✗ Missing'}`);
    console.log(`Phone ID: ${process.env.WHATSAPP_PHONE_NUMBER_ID || '✗ Missing'}`);
    console.log(`Owner: ${process.env.OWNER_WHATSAPP_NUMBER || '✗ Missing'}\n`);
});
