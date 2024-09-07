import logging

from fastapi import APIRouter, Request, Depends
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.schemas import Profile, BooksInBookshelf, AddBook, BookId
from app.schemas.responses import TokenResponse
from app.utils.auth_utils import create_access_token
from typing import Annotated

community_router = APIRouter()

community_books_pending = [
    {
        'book_id': 1,
        'book_name': "Капитал",
        'book_author': 'Карл Маркс',
        'book_description': """Данная книга является классическим произведением экономической науки, написанным с позиций трудовой теории стоимости. В ней автор определил понятие стоимости как выражение общественно необходимого труда для производства товаров, дал яркую характеристику капиталистического общества XIX века. Труд К.Маркса является завершением классической политической экономии, он оказал глобальное воздействие на ход исторического процесса в XX веке."""
    }
]

@community_router.post("/add_community_book")
async def add_community_book(request: AddBook) -> JSONResponse:
    community_books_pending.append({
      'book_id': len(community_books_pending) + 1,
      'book_name': request.book_name,
      'book_author': request.book_author,
      'book_description': request.book_description,
    })
    
    return JSONResponse(content={'status': 'ok'}, status_code=201)

@community_router.get("/community_books_pending", response_model=BooksInBookshelf)
async def get_community_books_pending() -> JSONResponse:
    return JSONResponse(community_books_pending)