const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Root route - IMPORTANT!
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running!' });
});

// Roblox APIs
app.get('/api/user/:username', async (req, res) => {
    try {
        const response = await fetch(`https://users.roblox.com/v1/users/search?keyword=${req.params.username}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'API call failed' });
    }
});

app.get('/api/avatar/:userId', async (req, res) => {
    try {
        const response = await fetch(`https://avatar.roblox.com/v1/users/${req.params.userId}/avatar`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'API call failed' });
    }
});

// Railway specific port binding
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
});
