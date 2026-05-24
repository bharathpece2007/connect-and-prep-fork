const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// @route   POST /api/ai/chat
// @desc    Interact with the Prep Box AI Tutor
// @access  Private
router.post('/chat', protect, async (req, res) => {
    const { message, history } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        // Advanced Simulated Educational Chatbot engine as a robust fallback
        let reply = "";
        const lowerMsg = message.toLowerCase();

        if (lowerMsg.includes('calculus') || lowerMsg.includes('derivative') || lowerMsg.includes('integration')) {
            reply = "📚 **Prep Box AI - Calculus Helper**\n\nCalculus is all about study of change! \n\n1. **Derivatives**: Find the rate of change at a specific instant (like speedometer showing exact speed).\n   - Formula: $d/dx(x^n) = n \\cdot x^{n-1}$\n2. **Integrals**: Find the accumulated area under a curve (like total distance covered).\n\nWhat specific calculus problem can we solve together?";
        } else if (lowerMsg.includes('mitosis') || lowerMsg.includes('meiosis') || lowerMsg.includes('biology')) {
            reply = "🧬 **Prep Box AI - Biology Helper**\n\nGreat question about cell division!\n\n* **Mitosis**: Standard cell division for growth and repair. It creates **2 identical daughter cells** with the same number of chromosomes.\n* **Meiosis**: Special cell division for reproduction. It creates **4 genetically unique cells** with half the number of chromosomes.\n\nDo you want to go through the phases (Prophase, Metaphase, Anaphase, Telophase)?";
        } else if (lowerMsg.includes('french revolution') || lowerMsg.includes('history')) {
            reply = "🏰 **Prep Box AI - History Helper**\n\nThe French Revolution (1789-1799) was caused by major social, political, and financial crises:\n\n1. **Estates System**: The commoners (Third Estate) paid all the taxes, while nobles and clergy paid nothing.\n2. **Bankruptcy**: France was bankrupt due to wars (including supporting the American Revolution).\n3. **Famine**: Extreme crop failures led to bread shortages.\n\nThis led to the storming of the Bastille on July 14, 1789. What details should we explore?";
        } else if (lowerMsg.includes('kannada') || lowerMsg.includes('translate')) {
            reply = "🗣️ **Prep Box AI - Language Tutor**\n\nHere are some common translation phrases in Kannada:\n* \"Hello\" -> *Namaskara* (ನಮಸ್ಕಾರ)\n* \"How are you?\" -> *Hegiddeera?* (ಹೇಗಿದ್ದೀರಾ?)\n* \"Welcome to school\" -> *Shaalege swagatha* (ಶಾಲೆಗೆ ಸ್ವಾಗತ)\n\nWhat other phrase would you like to translate or practice?";
        } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi ') || lowerMsg.includes('hey')) {
            reply = "👋 **Hello there! I am Prep Box AI**, your student study companion. \n\nI can help you:\n* 📝 Solve **Homework** problems\n* 🧮 Learn tough subjects like **Calculus**, **Physics**, or **Chemistry**\n* 🗺️ Create personalized **Study Roadmaps**\n\nFeel free to ask me anything or try one of the suggestions below!";
        } else {
            reply = `🎓 **Prep Box AI**\n\nThat's an interesting question: "${message}"\n\nI am configured to use Google's **Gemini 1.5 Flash** model. To fully unlock my direct, unlimited AI brain power for all subjects, please make sure a valid \`GEMINI_API_KEY\` is added to the \`.env\` file in the server project root!\n\nHow else can I assist you in your studies today?`;
        }

        return res.json({ reply });
    }

    try {
        const contents = [];
        if (history && history.length > 0) {
            // Take last 5 exchanges to keep within token limits and maintain context
            history.slice(-5).forEach(h => {
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

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
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
            return res.json({ reply: data.candidates[0].content.parts[0].text });
        } else {
            console.error('Gemini error response:', data);
            return res.status(500).json({ error: 'Failed to generate response from Gemini API', details: data });
        }
    } catch (err) {
        console.error('AI Chat Error:', err);
        return res.status(500).json({ error: 'Server error during AI chat processing' });
    }
});

module.exports = router;
