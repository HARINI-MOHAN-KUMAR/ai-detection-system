from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import text_routes, image_routes, audio_routes, source_routes, url_routes, auth_routes
from app.database import create_tables

app = FastAPI(title="AI Detection System", version="1.0.0")

create_tables()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(text_routes.router, prefix="/api/text", tags=["Text Detection"])
app.include_router(image_routes.router, prefix="/api/image", tags=["Image Detection"])
app.include_router(audio_routes.router, prefix="/api/audio", tags=["Audio Detection"])
app.include_router(source_routes.router, prefix="/api/source", tags=["Source Analysis"])
app.include_router(url_routes.router, prefix="/api/url", tags=["URL Detection"])

@app.get("/")
def root():
    return {"message": "AI Detection System API is running!"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.get("/api/results")
def get_all_results():
    from app.database import SessionLocal
    db = SessionLocal()
    results = db.query(__import__('app.database', fromlist=['DetectionResult']).DetectionResult).order_by(
        __import__('app.database', fromlist=['DetectionResult']).DetectionResult.created_at.desc()
    ).limit(50).all()
    db.close()
    return [
        {
            "id": r.id,
            "type": r.type,
            "label": r.label,
            "confidence": r.confidence,
            "explanation": r.explanation,
            "source_score": r.source_score,
            "input_text": r.input_text,
            "file_name": r.file_name,
            "created_at": str(r.created_at),
        }
        for r in results
    ]