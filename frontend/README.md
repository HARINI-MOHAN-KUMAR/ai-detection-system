# AI-Driven Detection System for Misinformation and Deepfake Media

A full-stack AI system that detects fake news, deepfake images, audio manipulation, and analyzes source credibility.

## Features

- Text Misinformation Detection — BERT AI model fine-tuned on fake news dataset
- Image Deepfake Detection — Upload images for AI analysis
- Audio Deepfake Detection — Upload audio files for voice manipulation detection
- Source Credibility Analysis — Domain scoring and reliability check
- History Dashboard — All past analysis results stored in database
- REST API — FastAPI backend with interactive docs

## Tech Stack

### Frontend
- React 18 + Vite
- Lucide React (icons)
- Axios (API calls)

### Backend
- FastAPI (Python)
- SQLAlchemy + SQLite
- HuggingFace Transformers
- PyTorch (CPU)

### AI Models
- BERT fine-tuned on fake news detection
- EfficientNet-B4 (image deepfake)
- RawNet2 (audio deepfake)

## Project Structure
```
ai_fake_news/
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── UploadZone.jsx
│       │   └── ResultCard.jsx
│       ├── pages/
│       │   └── History.jsx
│       └── App.jsx
└── backend/
    └── app/
        ├── main.py
        ├── database.py
        └── api/
            ├── text_routes.py
            ├── image_routes.py
            ├── audio_routes.py
            └── source_routes.py
```

## Installation and Setup

### 1. Clone the project
```bash
git clone https://github.com/yourusername/ai-detection-system.git
cd ai-detection-system
```

### 2. Backend setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install fastapi uvicorn python-multipart requests sqlalchemy transformers torch
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Open the app
- Frontend: http://localhost:5173
- Backend API docs: http://127.0.0.1:8000/docs
- Results database: http://127.0.0.1:8000/api/results

## How It Works

1. User uploads text, image, or audio via the frontend
2. Frontend sends the data to FastAPI backend
3. Backend runs the appropriate AI model
4. Result is saved to SQLite database
5. Result is displayed with confidence score and explanation

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/text/detect | Detect fake news in text |
| POST | /api/image/detect | Detect deepfake in image |
| POST | /api/audio/detect | Detect deepfake in audio |
| POST | /api/source/analyze | Analyze source credibility |
| GET | /api/results | Get all past results |

## Developer

Built using React, FastAPI, and HuggingFace Transformers.