from fastapi import FastAPI

app = FastAPI(title="OptiPrep Backend")

@app.get("/")
def root():
    return {"message": "Backend is running successfully"}
