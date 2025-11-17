const express = require('express');
const path = require('path');
const app = express();

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Basic route - IMPORTANT for Railway health checks
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Roblox Avatar Tool - LIVE</title>
            <style>
                body { 
                    font-family: Arial; 
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    margin: 0; padding: 50px; color: white; text-align: center;
                }
            </style>
        </head>
        <body>
            <h1>🚀 Roblox Avatar Tool - LIVE!</h1>
            <p>Server successfully deployed on Railway!</p>
            <p>Now adding the full tool...</p>
        </body>
        </html>
    `);
});

// Health check route - CRITICAL for Railway
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Server is running perfectly',
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`✅ Health check: http://0.0.0.0:${PORT}/health`);
    console.log(`✅ Application ready to receive requests`);
});
