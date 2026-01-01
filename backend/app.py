from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
import uvicorn
from model_loader import load_assets, predict_answer

class Query(BaseModel):
    story: str
    question: str

app = FastAPI(
    title="Story QA Chatbot API",
    description="Dual-Encoder LSTM for contextual question answering (bAbI Task 1)."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    try:
        os.chdir(os.path.dirname(os.path.abspath(__file__)))
        load_assets()
    except Exception as e:
        print(f"FATAL ERROR during model loading: {e}")
        raise HTTPException(status_code=500, detail="Failed to load ML assets.")

@app.get("/")
def read_root():
    return {"status": "Model API is running. Go to /docs for API documentation."}

@app.post("/predict")
def get_prediction(query: Query):
    print(f"Received Query: Story length={len(query.story)}, Q: {query.question}")
    try:
        result = predict_answer(query.story, query.question)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {e}")

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)