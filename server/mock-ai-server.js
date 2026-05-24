const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();

// Enable CORS for React frontend origins
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json());

// Main AI chat handler matching FastAPI's POST contract
app.post('/api/ai/chat', async (req, res) => {
    const { message, history } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.error("Missing GEMINI_API_KEY in .env");
        return res.status(400).json({ error: "Missing GEMINI_API_KEY in .env" });
    }

    try {
        const contents = [];
        if (history && history.length > 0) {
            history.slice(-10).forEach(h => {
                contents.push({
                    role: h.sender === 'user' ? 'user' : 'model',
                    parts: [{ text: h.text }]
                });
            });
        }
        contents.push({
            role: 'user',
            parts: [{ text: message }]
        });

        // Use stable native fetch in Node 25 to send request to Gemini
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents,
                systemInstruction: {
                    parts: [{ text: "You are Prep Box AI, a highly friendly and extremely smart K-12 learning assistant for the Connect & Prep portal. Help students with their homework, revision, timetables, and academic questions. Keep your tone encouraging and educational." }]
                }
            })
        });

        const data = await response.json();
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
            const reply = data.candidates[0].content.parts[0].text;
            return res.json({ reply });
        } else {
            console.error('Gemini error response:', data);
            return res.status(500).json({ error: 'Failed to generate response from Gemini API', details: data });
        }
    } catch (err) {
        console.error('AI Chat Error:', err);
        return res.status(500).json({ error: 'Server error during AI chat processing' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Live AI server running on port 5002' });
});

const PORT = 5002;
app.listen(PORT, () => {
    console.log(`Mock AI Chat server running on port ${PORT}`);
});
