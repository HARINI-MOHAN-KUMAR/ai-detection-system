from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.database import get_db, DetectionResult
import requests
from bs4 import BeautifulSoup
import random

router = APIRouter()

class URLInput(BaseModel):
    url: str

def fetch_article_text(url: str):
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, headers=headers, timeout=10)
    soup = BeautifulSoup(response.content, "lxml")

    # Remove scripts and styles
    for tag in soup(["script", "style", "nav", "footer"]):
        tag.decompose()

    # Get main text
    paragraphs = soup.find_all("p")
    text = " ".join([p.get_text() for p in paragraphs])
    return text[:2000]

@router.post("/analyze")
def analyze_url(input: URLInput, db: Session = Depends(get_db)):
    try:
        # Fetch article text
        text = fetch_article_text(input.url)

        if len(text) < 50:
            return {
                "type": "url",
                "label": "UNKNOWN",
                "confidence": 0,
                "explanation": "Could not extract enough text from this URL.",
                "source_score": 0,
                "url": input.url,
            }

        # Import and use the text classifier
        from app.api.text_routes import classifier
        result = classifier(text[:512])[0]

        label = "FAKE" if result["label"] == "LABEL_1" else "REAL"
        confidence = round(result["score"] * 100, 1)
        source_score = random.randint(20, 85)

        explanation = (
            f"Article fetched and analyzed from URL. "
            f"AI model detected this as {label} with {confidence}% confidence."
        )

        # Save to database
        db_result = DetectionResult(
            type="url",
            label=label,
            confidence=confidence,
            explanation=explanation,
            source_score=source_score,
            input_text=input.url,
        )
        db.add(db_result)
        db.commit()
        db.refresh(db_result)

        return {
            "id": db_result.id,
            "type": "url",
            "label": label,
            "confidence": confidence,
            "explanation": explanation,
            "source_score": source_score,
            "url": input.url,
            "text_preview": text[:200],
        }

    except Exception as e:
        return {
            "type": "url",
            "label": "ERROR",
            "confidence": 0,
            "explanation": f"Failed to fetch URL: {str(e)}",
            "source_score": 0,
            "url": input.url,
        }