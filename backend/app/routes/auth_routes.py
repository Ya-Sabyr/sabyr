import logging

from fastapi import APIRouter, Request, Depends
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.db_configuration import get_db
from app.schemas.schemas import UserCreate
from app.schemas.responses import TokenResponse
from app.utils.auth_utils import authenticate_user, create_access_token, hash_password, register_user
from typing import Annotated

auth_router = APIRouter()

BLACKLIST = set()

@auth_router.post("/register", response_model=TokenResponse)
async def register_user_route(request: UserCreate, db: AsyncSession = Depends(get_db)) -> TokenResponse:
    username = request.username
    email = request.email
    password = request.password
    access_token = await create_access_token(
        data={
            "sub": username,
            "role": ''
        },
    )
    
    return TokenResponse(access_token=access_token, token_type="Bearer")

    

@auth_router.post("/login", response_model=TokenResponse)
async def login_user_route(request: Annotated[OAuth2PasswordRequestForm, Depends()], db: AsyncSession = Depends(get_db)) -> TokenResponse:
    username = request.username
    password = request.password
    access_token = await create_access_token(
        data={
            "sub": username
        },
    )
    
    return TokenResponse(access_token=access_token, token_type="Bearer")

@auth_router.post("/logout")
async def logout_user_route(request: Request) -> JSONResponse:
    token = request.headers.get("Authorization").split(" ")[1]
    BLACKLIST.add(token)
    
    return JSONResponse(status_code=200, content={"message": "Logged out successfully"})