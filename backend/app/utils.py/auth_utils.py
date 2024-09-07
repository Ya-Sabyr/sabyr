import os
import jwt
import logging

from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer
from fastapi.responses import JSONResponse
from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import ValidationError
from app.database.db_functions import get_user_by_username, get_user_by_email, create_company, create_user
from app.database.db_configuration import get_db
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60    

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def register_user(username: str, email: str, password: str, db: AsyncSession = Depends(get_db)):
    user_exists = await get_user_by_username(db, username)
    if user_exists:
        logging.error(f"User with {username} exists")
        return JSONResponse(status_code=400, content={"message": "User already exists"})
    user_exists = await get_user_by_email(db, email)
    if user_exists:
        logging.error(f"Email exists {email}")
        return JSONResponse(status_code=400, content={"message": "User already exists"})
    
    company = await create_company(db, {
        "company_name": "Not set",
    })
    
    hashed_password = await hash_password(password)
    
    user_data = {
        "username": username,
        "email": email,
        "password_hash": hashed_password,
        "company_id": company.company_id,
        "status_role": "user"
    }
    
    user = await create_user(db, user_data)
    if not user:
        return JSONResponse(status_code=500, content={"message": "Failed to create user"})

async def authenticate_user(username: str, password: str, db: AsyncSession = Depends(get_db)):
    user = await get_user_by_username(db, username)
    if not user:
        return None 
    
    if not await verify_password(password, user.password_hash):
        return None
    
    return user

async def verify_password(password: str, hashed_password: str) -> bool:
    return pwd_context.verify(password, hashed_password)
    
    
async def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

reuseable_oauth = OAuth2PasswordBearer(
    tokenUrl="auth/login",
)


async def get_current_user(token: str = Depends(reuseable_oauth), db: AsyncSession = Depends(get_db)) -> dict:
    try:
        payload = jwt.decode(
            token, SECRET_KEY, algorithms=[ALGORITHM]
        )
        username = payload.get("sub")
        user_id = payload.get("id")
        role = payload.get("role")
        
        if username is None or user_id is None or role is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
    except(jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = await get_user_by_username(db, username)
    
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Could not find user",
        )
    
    return user

async def admin_required(current_user: dict = Depends(get_current_user)):
    if current_user["role"] != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have access to this resource",
        )
    return current_user

async def premium_required(current_user: dict = Depends(get_current_user)):
    if current_user["role"] != "premium" or current_user["role"] != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have access to this resource",
    )
    return current_user


async def hash_password(password: str) -> str:
    """
    Hash a password using bcrypt.
    
    Args:
        password (str): The plaintext password to hash.
    
    Returns:
        str: The hashed password.
    """
    return pwd_context.hash(password)