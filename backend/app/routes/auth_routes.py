import logging

from fastapi import APIRouter, Request, Depends
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.db_configurations import get_db
from app.database.db_functions import (create_user, get_user_by_username, get_user_by_email, create_company)
from app.schemas.schemas import UserCreate
from app.schemas.responses import TokenResponse
from app.route_utils.auth_utils import authenticate_user, create_access_token, hash_password, register_user
from typing import Annotated

auth_router = APIRouter()

BLACKLIST = set()

@auth_router.post("/register", response_model=TokenResponse)
async def register_user_route(request: UserCreate, db: AsyncSession = Depends(get_db)) -> TokenResponse:
    username = request.username
    email = request.email
    password = request.password
    user = await register_user(username=username, email=email, password=password, db=db)
    
    user = await authenticate_user(username, password, db)
    if not user:
        return JSONResponse(status_code=401, content={"message": "Invalid credentials"})
    access_token = await create_access_token(
        data={
            "sub": user.username,
            "id": user.id,
            "role": user.status_role
        },
    )
    
    return TokenResponse(access_token=access_token, token_type="Bearer")

    

@auth_router.post("/login", response_model=TokenResponse)
async def login_user_route(request: Annotated[OAuth2PasswordRequestForm, Depends()], db: AsyncSession = Depends(get_db)) -> TokenResponse:
    username = request.username
    password = request.password
    user = await authenticate_user(username, password, db)
    if not user:
        return JSONResponse(status_code=401, content={"message": "Invalid credentials"})
    access_token = await create_access_token(
        data={
            "sub": user.username,
            "id": user.id,
            "role": user.status_role
        },
    )
    
    return TokenResponse(access_token=access_token, token_type="Bearer")

@auth_router.post("/logout")
async def logout_user_route(request: Request) -> JSONResponse:
    token = request.headers.get("Authorization").split(" ")[1]
    BLACKLIST.add(token)
    
    return JSONResponse(status_code=200, content={"message": "Logged out successfully"})