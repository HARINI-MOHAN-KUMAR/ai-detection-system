from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class SourceInput(BaseModel):
    url: str

KNOWN_FAKE_DOMAINS = ["fakenews.com", "hoaxsite.net", "clickbait.org"]
KNOWN_REAL_DOMAINS = ["bbc.com", "reuters.com", "apnews.com", "nytimes.com"]

@router.post("/analyze")
def analyze_source(input: SourceInput):
    domain = input.url.lower().replace("https://", "").replace("http://", "").split("/")[0]

    if any(d in domain for d in KNOWN_FAKE_DOMAINS):
        score = 15
        verdict = "Unreliable"
    elif any(d in domain for d in KNOWN_REAL_DOMAINS):
        score = 92
        verdict = "Highly Reliable"
    else:
        score = 45
        verdict = "Unknown"

    return {
        "domain": domain,
        "credibility_score": score,
        "verdict": verdict,
        "explanation": f"Domain '{domain}' credibility assessed based on known source database.",
    }