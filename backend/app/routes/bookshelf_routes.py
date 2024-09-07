import logging

from fastapi import APIRouter, Request, Depends
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.schemas import Profile, BooksInBookshelf, AddBook, BookId
from app.schemas.responses import TokenResponse
from app.utils.auth_utils import create_access_token
from typing import Annotated

bookshelf_router = APIRouter()

books = [{
    'book_id': 1,
    'book_name': "Великий Гэтсби",
    'book_author': 'Фрэнсис Скотт',
    'book_description': """«Бурные» двадцатые годы прошлого столетия… Время шикарных вечеринок, «сухого закона» и «легких» денег… Эти «новые американцы» уверены, что расцвет будет вечным, что, достигнув вершин власти и богатства, они обретут и личное счастье… Таким был и Джей Гэтсби, ставший жертвой бессмысленной погони за пленительной мечтой об истинной и вечной любви, которой не суждено было сбыться… Перед вами — самый знаменитый роман Ф.С. Фицджеральда в новом переводе!""",
    'book_status': '80'

    },
    {
        'book_id': 2,
        'book_name': 'Три мушкетера',
        'book_author': 'Александр Пушкин',
        'book_description': """Широкоизвестный историко-приключенческий роман из эпохи Людовика XIII, принадлежащий перу знаменитого французского писателя-классика Александра Дюма-отца. Издательство 1977 года. Иллюстрации И.С. Кускова. Послесловие и примечания М. Трескунова.""",
        'book_status': '100'
    },
    {
        'book_id': 3,
        'book_name': 'Война и мир',
        'book_author': 'Лев Николай Толстой',
        'book_description': """«Война и мир» — роман-эпопея русского писателя, публициста, просветителя и религиозного мыслителя Льва Николаевича Толстого (1828–1910). Создавался в 1863–1869 годы. Отрывок из романа под названием «1805 год» впервые был опубликован в 1865 году в «Русском вестнике». В 1868 году в свет вышли три части романа, за которыми вскоре последовали еще две. В первом издании «Войны и мира» был длинный ряд чисто теоретических страниц, мешавших целостности художественного впечатления; в более поздних изданиях эти рассуждения были обособлены в особую часть.""",
        'book_status': '100'
    },]
id = [10, 9, 8, 7, 6, 5, 4]

@bookshelf_router.post("/profile", response_models = Profile)
async def get_books(request: Request) -> Profile:

    return Profile(username="test", email="test", phone_number="test", bookshelf_info={'bookshelf_name': 'test', 'books': books})

@bookshelf_router.post("/add_book", response_models = BooksInBookshelf)
async def add_book(request: AddBook) -> BooksInBookshelf:
    books.append({
        'book_id': len(books) + 1,
        'book_name': request.book_name,
        'book_author': request.book_author,
        'book_description': request.book_description,
    })
    
    return BooksInBookshelf(bookshelf_name="test", books=books)

@bookshelf_router.delete("/delete_book", response_model=BooksInBookshelf)
async def delete_book(request: BookId) -> BooksInBookshelf:
    books = [book for book in books if book['book_id'] != request.book_id]
    return BooksInBookshelf(bookshelf_name="test", books=books)