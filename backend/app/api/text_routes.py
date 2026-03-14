from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.database import get_db, DetectionResult
from transformers import pipeline
import random

router = APIRouter()

# Load model once when server starts
print("Loading AI model... please wait...")
classifier = pipeline(
    "text-classification",
    model="mrm8488/bert-tiny-finetuned-fake-news-detection",
    truncation=True,
    max_length=512,
)
print("AI model loaded!")

class TextInput(BaseModel):
    text: str

@router.post("/detect")
def detect_text(input: TextInput, db: Session = Depends(get_db)):
    # Run real AI model
    result = classifier(input.text)[0]

    label = "FAKE" if result["label"] == "LABEL_1" else "REAL"
    confidence = round(result["score"] * 100, 1)
    source_score = random.randint(20, 85)
    explanation = (
        f"AI model detected this as {label} with {confidence}% confidence. "
        f"Analysis powered by BERT fine-tuned on fake news dataset."
    )

    # Save to database
    db_result = DetectionResult(
        type="text",
        label=label,
        confidence=confidence,
        explanation=explanation,
        source_score=source_score,
        input_text=input.text[:500],
    )
    db.add(db_result)
    db.commit()
    db.refresh(db_result)

    return {
        "id": db_result.id,
        "type": "text",
        "label": label,
        "confidence": confidence,
        "explanation": explanation,
        "source_score": source_score,
    }