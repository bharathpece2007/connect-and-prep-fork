const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });
const apiKey = process.env.GEMINI_API_KEY;

async function listModels() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        if (data.models) {
            const filtered = data.models
                .map(m => m.name)
                .filter(name => name.includes('flash') || name.includes('pro'));
            console.log('Filtered models:', filtered);
        } else {
            console.log('No models key found, data:', data);
        }
    } catch (e) {
        console.error('Error listing models:', e);
    }
}

listModels();
