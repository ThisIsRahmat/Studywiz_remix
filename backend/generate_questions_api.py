from fastapi import FastAPI, HTTPException
from generate_questions import *
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
handler = Mangum(app)
MAX_INPUT_LENGTH = 32

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/generate_questions")
async def generate_questions_api(prompt: str):
    questions = generate_questions(prompt)
    return {"Questions": questions}