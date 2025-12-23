from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Dict
from enum import Enum
 
# =====================
# CONFIG
# =====================
SECRET_KEY = "83daa0256a2289b0fb23693bf1f6034d44396675749244721a2b20e896e11662"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
 
# =====================
# APP
# =====================
app = FastAPI(title="FastAPI Role Based Auth")
 
# =====================
# DATABASE (In-Memory)
# =====================
fake_users_db: Dict[str, Dict] = {}
 
# =====================
# SECURITY
# =====================
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
 
 
# =====================
# MODELS
# =====================
 
class Role(str, Enum):
    admin = "admin"
    user = "user"
 
 
class RegisterRequest(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    role: Role
 
 
class User(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    role: Role
    disabled: bool = False
 
 
class UserInDB(User):
    hashed_password: str
 
 
class Token(BaseModel):
    access_token: str
    token_type: str
 
 
# =====================
# UTILS
# =====================
 
def hash_password(password: str) -> str:
    return pwd_context.hash(password)
 
 
def verify_password(password: str, hashed_password: str) -> bool:
    return pwd_context.verify(password, hashed_password)
 
 
def get_user(email: str):
    if email in fake_users_db:
        return UserInDB(**fake_users_db[email])
 
 
def authenticate_user(email: str, password: str):
    user = get_user(email)
    if not user or not verify_password(password, user.hashed_password):
        return False
    return user
 
 
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
 
 
# =====================
# DEPENDENCIES
# =====================
 
async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid token",
        headers={"WWW-Authenticate": "Bearer"},
    )
 
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
 
    user = get_user(email)
    if not user:
        raise credentials_exception
    return user
 
 
# =====================
# ROUTES
# =====================
 
@app.post("/register", status_code=201)
def register_user(register: RegisterRequest):
    email = register.email.lower()
    if email in fake_users_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists",
        )
 
    hashed_password = hash_password(register.password)
 
    fake_users_db[email] = {
        "first_name": register.first_name,
        "last_name": register.last_name,
        "email": email,
        "role": register.role,
        "disabled": False,
        "hashed_password": hashed_password,
    }
 
    return {"msg": "User registered successfully!"}
 
 
@app.post("/login", response_model=Token)
def login_user(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
 
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    )
 
    return {"access_token": access_token, "token_type": "bearer"}
 
 
@app.get("/me")
async def read_me(current_user: User = Depends(get_current_user)):
    return current_user
 
 
# Example of admin-only endpoint
@app.get("/admin-dashboard")
async def admin_dashboard(current_user: User = Depends(get_current_user)):
    if current_user.role != Role.admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You need admin privileges",
        )
    return {"msg": "Welcome to the admin dashboard!"}
 