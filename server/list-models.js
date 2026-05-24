const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });
const apiKey = process.env.GEMINI_API_KEY;

async function listModels() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        console.log('Available models:', JSON.stringify(data, null, 2));
    } catch (e) {
        console.error('Error listing models:', e);
    }
}

listModels();
