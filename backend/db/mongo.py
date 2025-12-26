from motor.motor_asyncio import AsyncIOMotorClient

MONGODB_URL = "mongodb+srv://yogeshknit99:D7YKS843eK9BUc10@cluster0.vbzst.mongodb.net/OptiPrep"

client = AsyncIOMotorClient(MONGODB_URL)
db = client["OptiPrep"]