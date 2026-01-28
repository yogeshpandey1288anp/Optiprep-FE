# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from controller.user_controller import router as user_router
from controller.directortool_controller import router as directortool_router

app = FastAPI(title="Optiprep Backend", version="2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(user_router)
app.include_router(directortool_router)


