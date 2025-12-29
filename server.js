// ====================================
// CRESENT CONSTRUCTION - QUOTE SERVER
// Node.js/Express Backend
// ====================================

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files (HTML, CSS, JS)

// ====================================
// CONFIGURATION
// ====================================

// Email Configuration
const emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD // Use Gmail App Password, not regular password
    }
});

// Twilio Configuration for WhatsApp
const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

// Database file for storing quotes
const DB_FILE = path.join(__dirname, 'quotes.json');

// ====================================
// UTILITY FUNCTIONS
// ====================================

// Get all quotes from JSON file
function getQuotes() {
    try {
        if (fs.existsSync(DB_FILE)) {
            const data = fs.readFileSync(DB_FILE, 'utf-8');
            return JSON.parse(data);
        }
        return [];
    } catch (error) {
        console.error('Error reading quotes:', error);
        return [];
    }
}

// Save quote to JSON file
function saveQuote(quote) {
    try {
        const quotes = getQuotes();
        quote.id = Date.now();
        quote.createdAt = new Date().toISOString();
        quotes.push(quote);
        fs.writeFileSync(DB_FILE, JSON.stringify(quotes, null, 2));
        return quote;
    } catch (error) {
        console.error('Error saving quote:', error);
        throw error;
    }
}

// Generate quote HTML for email
function generateQuoteHTML(quote) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #339bf2 0%, #00225a 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; }
            .field { margin: 15px 0; border-bottom: 1px solid #eee; padding-bottom: 10px; }
            .label { color: #00225a; font-weight: bold; font-size: 12px; text-transform: uppercase; }
            .value { color: #333; font-size: 16px; margin-top: 5px; }
            .footer { background: #333; color: white; padding: 20px; text-align: center; font-size: 12px; }
            .button { display: inline-block; padding: 12px 30px; background: #339bf2; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🏗️ Project Quote Request</h1>
                <p>From Cresent Construction</p>
            </div>
            
            <div class="content">
                <h2>Quote Details</h2>
                
                <div class="field">
                    <div class="label">Customer Name</div>
                    <div class="value">${quote.fullName}</div>
                </div>
                
                <div class="field">
                    <div class="label">Phone Number</div>
                    <div class="value">+91 ${quote.phone}</div>
                </div>
                
                <div class="field">
                    <div class="label">Email Address</div>
                    <div class="value"><a href="mailto:${quote.email}">${quote.email}</a></div>
                </div>
                
                <div class="field">
                    <div class="label">Project Type</div>
                    <div class="value">${quote.projectType.toUpperCase()}</div>
                </div>
                
                <div class="field">
                    <div class="label">Message / Project Details</div>
                    <div class="value">${quote.message.replace(/\n/g, '<br>')}</div>
                </div>
                
                <div class="field" style="border: none;">
                    <div class="label">Submitted On</div>
                    <div class="value">${new Date(quote.createdAt).toLocaleString('en-IN')}</div>
                </div>
            </div>
            
            <div class="footer">
                <p>Cresent Construction | GST: 33HHXPM3536A1Z7</p>
                <p>📞 +91 7418 621 523 | +91 8072 145 499</p>
                <p>📧 crescentconstructiontvl@gmail.com</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

// ====================================
// EMAIL FUNCTIONS
// ====================================

async function sendEmailToAdmin(quote) {
    try {
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: 'crescentconstructiontvl@gmail.com',
            subject: `📋 New Quote Request from ${quote.fullName}`,
            html: generateQuoteHTML(quote),
            replyTo: quote.email
        };

        await emailTransporter.sendMail(mailOptions);
        console.log('✅ Email sent to admin');
        return true;
    } catch (error) {
        console.error('❌ Error sending email to admin:', error);
        throw error;
    }
}

async function sendEmailToCustomer(quote) {
    try {
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: quote.email,
            subject: '✅ Quote Request Received - Cresent Construction',
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #339bf2 0%, #00225a 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
                    .content { background: #f9f9f9; padding: 20px; }
                    .footer { background: #333; color: white; padding: 20px; text-align: center; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Thank You! 🙏</h1>
                    </div>
                    
                    <div class="content">
                        <p>Dear <strong>${quote.fullName}</strong>,</p>
                        
                        <p>Thank you for submitting your quote request to <strong>Cresent Construction</strong>. We have received your inquiry and will review your project details shortly.</p>
                        
                        <h3>Your Quote Summary:</h3>
                        <ul>
                            <li><strong>Project Type:</strong> ${quote.projectType}</li>
                            <li><strong>Contact:</strong> ${quote.phone} | ${quote.email}</li>
                            <li><strong>Submitted:</strong> ${new Date(quote.createdAt).toLocaleString('en-IN')}</li>
                        </ul>
                        
                        <p>Our team will contact you within <strong>24-48 hours</strong> with a detailed quote and project proposal.</p>
                        
                        <p>You can also reach us directly:</p>
                        <ul>
                            <li>📞 Phone: +91 7418 621 523 / +91 8072 145 499</li>
                            <li>📧 Email: crescentconstructiontvl@gmail.com</li>
                            <li>💬 WhatsApp: +91 7418 621 523</li>
                        </ul>
                        
                        <p>Best regards,<br><strong>Cresent Construction Team</strong></p>
                    </div>
                    
                    <div class="footer">
                        <p>Cresent Construction | GST: 33HHXPM3536A1Z7</p>
                        <p>📞 +91 7418 621 523 | +91 8072 145 499</p>
                    </div>
                </div>
            </body>
            </html>
            `
        };

        await emailTransporter.sendMail(mailOptions);
        console.log('✅ Confirmation email sent to customer');
        return true;
    } catch (error) {
        console.error('❌ Error sending confirmation email:', error);
        throw error;
    }
}

// ====================================
// WHATSAPP FUNCTIONS
// ====================================

async function sendWhatsAppMessage(quote) {
    try {
        const message = `
🏗️ *Cresent Construction - Quote Received*

Hello ${quote.fullName},

Thank you for submitting your quote request! 🙏

*Your Details:*
📋 Project Type: ${quote.projectType}
📞 Phone: +91 ${quote.phone}
📧 Email: ${quote.email}

We will review your project and contact you within 24-48 hours with a detailed quote.

*Contact Us:*
📞 +91 7418 621 523
📞 +91 8072 145 499
📧 crescentconstructiontvl@gmail.com
🏢 Palayamkottai, Tirunelveli

Thank you! ✨
        `.trim();

        const result = await twilioClient.messages.create({
            body: message,
            from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
            to: `whatsapp:+91${quote.phone}`
        });

        console.log('✅ WhatsApp message sent:', result.sid);
        return true;
    } catch (error) {
        console.error('❌ Error sending WhatsApp message:', error);
        // Don't throw - continue if WhatsApp fails
        return false;
    }
}

// ====================================
// API ENDPOINTS
// ====================================

// Home route - serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Submit Quote - Main endpoint
app.post('/api/submit-quote', async (req, res) => {
    try {
        const { fullName, phone, email, projectType, message } = req.body;

        // Validation
        if (!fullName || !phone || !email || !projectType || !message) {
            return res.status(400).json({
                success: false,
                error: 'All fields are required'
            });
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email address'
            });
        }

        // Validate phone (10 digits)
        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                error: 'Phone number must be 10 digits'
            });
        }

        // Create quote object
        const quote = {
            fullName: fullName.trim(),
            phone: phone.trim(),
            email: email.trim().toLowerCase(),
            projectType: projectType.trim(),
            message: message.trim()
        };

        // Save to database
        const savedQuote = saveQuote(quote);

        // Send emails (async, don't wait)
        Promise.all([
            sendEmailToAdmin(quote).catch(err => console.error('Admin email failed:', err)),
            sendEmailToCustomer(quote).catch(err => console.error('Customer email failed:', err))
        ]).then(() => {
            console.log('📧 Both emails sent successfully');
        });

        // Send WhatsApp message (async, don't wait)
        sendWhatsAppMessage(quote).catch(err => console.error('WhatsApp failed:', err));

        // Return success response
        res.status(200).json({
            success: true,
            message: 'Quote submitted successfully!',
            quoteId: savedQuote.id
        });

    } catch (error) {
        console.error('❌ Error submitting quote:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to submit quote. Please try again.'
        });
    }
});

// Get all quotes - Admin endpoint
app.get('/api/quotes', (req, res) => {
    try {
        // In production, add authentication here
        const quotes = getQuotes();
        res.json({
            success: true,
            total: quotes.length,
            quotes: quotes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch quotes'
        });
    }
});

// Get single quote by ID
app.get('/api/quotes/:id', (req, res) => {
    try {
        const quotes = getQuotes();
        const quote = quotes.find(q => q.id === parseInt(req.params.id));
        
        if (!quote) {
            return res.status(404).json({
                success: false,
                error: 'Quote not found'
            });
        }

        res.json({
            success: true,
            quote: quote
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch quote'
        });
    }
});

// Delete quote
app.delete('/api/quotes/:id', (req, res) => {
    try {
        let quotes = getQuotes();
        const index = quotes.findIndex(q => q.id === parseInt(req.params.id));
        
        if (index === -1) {
            return res.status(404).json({
                success: false,
                error: 'Quote not found'
            });
        }

        quotes.splice(index, 1);
        fs.writeFileSync(DB_FILE, JSON.stringify(quotes, null, 2));

        res.json({
            success: true,
            message: 'Quote deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to delete quote'
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        server: 'Cresent Construction Quote Server',
        timestamp: new Date().toISOString()
    });
});

// ====================================
// SERVER START
// ====================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════╗
║  🏗️  CRESENT CONSTRUCTION QUOTE SERVER     ║
╚════════════════════════════════════════════╝

✅ Server running on http://localhost:${PORT}
📧 Email Service: ${process.env.GMAIL_USER ? '✓ Configured' : '✗ Not configured'}
💬 WhatsApp Service: ${process.env.TWILIO_ACCOUNT_SID ? '✓ Configured' : '✗ Not configured'}
📁 Database: ${DB_FILE}

Ready to receive quote requests! 🚀
    `);
});

module.exports = app;
