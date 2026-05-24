# 🎓 Connect & Prep - Python AI Backend

This is a modern, high-performance Python backend server built using **FastAPI** to power the **Prep Box AI Study Assistant** in the Connect & Prep School Portal. 

It connects directly to Google's highly advanced **Gemini 2.5 Flash** model using the official new `google-genai` Python SDK.

---

## ⚡ Features
- **FastAPI Framework**: Sleek, modern, and asynchronous Python web server.
- **Official Google Gen AI SDK**: Integrates the new, ultra-fast `google-genai` package.
- **Advanced Context Handling**: Seamlessly parses React chat history states and keeps Gemini aware of recent multi-turn conversation exchanges.
- **Robust Fallback**: Includes a simulated educational fallback chatbot engine if the API key is not yet configured.
- **Unified CORS**: Properly handles request domains from standard React dev ports (`5173`, `5174`, `5175`, `3000`).

---

## 🛠️ Setup Instructions

### 1. Prerequisites
Ensure you have **Python 3.9+** installed on your system. You can verify this by running:
```bash
python --version
```

### 2. Create a Virtual Environment (Recommended)
Navigate to this directory in your terminal and create a isolated Python environment:
```bash
# Move into the python backend directory
cd server-python

# Create a virtual environment named 'venv'
python -m venv venv
```

Activate the environment:
- **Windows (PowerShell)**:
  ```powershell
  .\venv\Scripts\Activate.ps1
  ```
- **Windows (Command Prompt)**:
  ```cmd
  .\venv\Scripts\activate.bat
  ```
- **macOS / Linux**:
  ```bash
  source venv/bin/activate
  ```

### 3. Install Dependencies
Install all the required packages from the `requirements.txt` file:
```bash
pip install -r requirements.txt
```

---

## 🔑 Configuration

The backend is configured to automatically look for the `.env` file at the root of the `connect-and-prep-school` workspace. 

1. Open the `.env` file in the project root:
   ```env
   # Google Gemini API Key
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```
2. Insert your **Gemini API Key** (you can acquire a free or pay-as-you-go key from [Google AI Studio](https://aistudio.google.com/)).
3. If no key is supplied, the server will operate in an interactive mock mode covering **Calculus**, **Biology**, **History**, **Languages**, and general study help!

---

## 🚀 Running the Server

Start the FastAPI application by executing:
```bash
python app.py
```

This runs the server on `http://localhost:5001`, which is a drop-in replacement for the Node.js backend's AI endpoints. 

### 📚 API Endpoints
- **Health Check**: `GET http://localhost:5001/api/health`
- **Chat Endpoint**: `POST http://localhost:5001/api/ai/chat` (Accepts `{ "message": "...", "history": [...] }` and returns `{ "reply": "..." }`)

You can view the interactive API documentation (Swagger UI) by navigating to:
👉 **[http://localhost:5001/docs](http://localhost:5001/docs)**
