import os
from pathlib import Path
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Locate and load environment variables from root directory or current directory
env_path = Path(__file__).resolve().parent.parent / ".env"
if env_path.exists():
    load_dotenv(dotenv_path=env_path)
else:
    load_dotenv()

app = FastAPI(
    title="Connect & Prep Python AI Backend",
    description="FastAPI service powering the Prep Box AI Study Assistant via Gemini 2.5 Flash",
    version="1.0.0"
)

# Setup CORS to allow requests from the React frontend development ports
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request and response validation
class ChatMessage(BaseModel):
    sender: str
    text: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []

class ChatResponse(BaseModel):
    reply: str

@app.get("/api/health")
@app.get("/health")
async def health_check():
    """Health check endpoint to verify backend status."""
    return {"status": "OK", "message": "Connect & Prep Python AI Backend is running"}

@app.post("/api/ai/chat")
@app.post("/api/chat")
@app.post("/ai/chat")
async def chat_endpoint(request: ChatRequest):
    """
    Handles AI chat requests from the frontend Prep Box.
    Maps conversation history and the new message into the format expected by the Google Gen AI SDK.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    
    # 1. Elegant simulated learning companion fallback if the Gemini API Key is missing
    if not api_key:
        message_lower = request.message.lower()
        if "calculus" in message_lower or "derivative" in message_lower or "integration" in message_lower:
            reply = (
                "📚 **Prep Box AI - Calculus Helper**\n\nCalculus is all about study of change! \n\n"
                "1. **Derivatives**: Find the rate of change at a specific instant (like speedometer showing exact speed).\n"
                "   - Formula: $d/dx(x^n) = n \\cdot x^{n-1}$\n"
                "2. **Integrals**: Find the accumulated area under a curve (like total distance covered).\n\n"
                "What specific calculus problem can we solve together?"
            )
        elif "mitosis" in message_lower or "meiosis" in message_lower or "biology" in message_lower:
            reply = (
                "🧬 **Prep Box AI - Biology Helper**\n\nGreat question about cell division!\n\n"
                "* **Mitosis**: Standard cell division for growth and repair. It creates **2 identical daughter cells** with the same number of chromosomes.\n"
                "* **Meiosis**: Special cell division for reproduction. It creates **4 genetically unique cells** with half the number of chromosomes.\n\n"
                "Do you want to go through the phases (Prophase, Metaphase, Anaphase, Telophase)?"
            )
        elif "french revolution" in message_lower or "history" in message_lower:
            reply = (
                "🏰 **Prep Box AI - History Helper**\n\nThe French Revolution (1789-1799) was caused by major social, political, and financial crises:\n\n"
                "1. **Estates System**: The commoners (Third Estate) paid all the taxes, while nobles and clergy paid nothing.\n"
                "2. **Bankruptcy**: France was bankrupt due to wars (including supporting the American Revolution).\n"
                "3. **Famine**: Extreme crop failures led to bread shortages.\n\n"
                "This led to the storming of the Bastille on July 14, 1789. What details should we explore?"
            )
        elif "kannada" in message_lower or "translate" in message_lower:
            reply = (
                "🗣️ **Prep Box AI - Language Tutor**\n\nHere are some common translation phrases in Kannada:\n"
                "* \"Hello\" -> *Namaskara* (ನಮಸ್ಕಾರ)\n"
                "* \"How are you?\" -> *Hegiddeera?* (ಹೇಗಿದ್ದೀರಾ?)\n"
                "* \"Welcome to school\" -> *Shaalege swagatha* (ಶಾಲೆಗೆ ಸ್ವಾಗತ)\n\n"
                "What other phrase would you like to translate or practice?"
            )
        elif "hello" in message_lower or "hi " in message_lower or "hey" in message_lower:
            reply = (
                "👋 **Hello there! I am Prep Box AI**, your student study companion. \n\n"
                "I can help you:\n"
                "* 📝 Solve **Homework** problems\n"
                "* 🧮 Learn tough subjects like **Calculus**, **Physics**, or **Chemistry**\n"
                "* 🗺️ Create personalized **Study Roadmaps**\n\n"
                "Feel free to ask me anything or try one of the suggestions below!"
            )
        else:
            reply = (
                f"🎓 **Prep Box AI**\n\nThat's an interesting question: \"{request.message}\"\n\n"
                "I am configured to use Google's **Gemini 2.5 Flash** model. To fully unlock my direct, "
                "unlimited AI brain power for all subjects, please make sure a valid `GEMINI_API_KEY` "
                "is added to the `.env` file in the project root!\n\n"
                "How else can I assist you in your studies today?"
            )
        return ChatResponse(reply=reply)

    # 2. Live API connection using the official google-genai SDK
    try:
        from google import genai
        from google.genai import types

        # Initialize the GenAI Client (loads API key automatically or via parameter)
        client = genai.Client(api_key=api_key)

        contents = []

        # Convert historical conversation turns (React structure) to Gemini content blocks
        if request.history:
            # Send up to the last 10 messages to keep request context concise and high-quality
            for h in request.history[-10:]:
                # React 'user' -> GenAI 'user'; React 'ai' -> GenAI 'model'
                role = "user" if h.sender == "user" else "model"
                contents.append(
                    types.Content(
                        role=role,
                        parts=[types.Part.from_text(text=h.text)]
                    )
                )

        # Append the new user prompt
        contents.append(
            types.Content(
                role="user",
                parts=[types.Part.from_text(text=request.message)]
            )
        )

        # Generate response using the ultra-capable gemini-2.5-flash model
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=contents,
            config=types.GenerateContentConfig(
                system_instruction=(
                    "You are Prep Box AI, a highly friendly and extremely smart K-12 learning assistant "
                    "for the Connect & Prep portal. Help students with their homework, revision, "
                    "timetables, and academic questions. Keep your tone encouraging, supportive, "
                    "and educational."
                )
            )
        )

        reply = response.text or "I'm sorry, I encountered an issue generating a response. Please try again."
        return ChatResponse(reply=reply)

    except ImportError:
        raise HTTPException(
            status_code=500,
            detail="The 'google-genai' SDK is not installed on the server. Please run: pip install google-genai"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Gemini API Error: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    # Start server on port 5002 or as specified by the PORT environment variable
    port = int(os.getenv("PORT", 5002))
    uvicorn.run("app:app", host="0.0.0.0", port=port, reload=True)
