const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

// Static files serve karega (HTML, CSS, JS)
app.use(express.static('public'));

// Roblox User Search API
app.get('/api/user/:username', async (req, res) => {
    try {
        const response = await fetch(`https://users.roblox.com/v1/users/search?keyword=${encodeURIComponent(req.params.username)}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('User search error:', error);
        res.status(500).json({ error: 'API call failed' });
    }
});

// Roblox Avatar Details API
app.get('/api/avatar/:userId', async (req, res) => {
    try {
        const response = await fetch(`https://avatar.roblox.com/v1/users/${req.params.userId}/avatar`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Avatar fetch error:', error);
        res.status(500).json({ error: 'API call failed' });
    }
});

// User Info by ID
app.get('/api/userinfo/:userId', async (req, res) => {
    try {
        const response = await fetch(`https://users.roblox.com/v1/users/${req.params.userId}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('User info error:', error);
        res.status(500).json({ error: 'API call failed' });
    }
});

// Root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
