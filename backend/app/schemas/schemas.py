from pydantic import BaseModel, EmailStr
from fastapi import Form
from typing import Annotated

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    
    class Config:
        orm_mode = True
        

class Username(BaseModel):
    username: str


class AddBook(BaseModel):
    book_name: str
    book_author: str
    book_description: str


class BookId(BaseModel):
    book_id: int


class Books(BaseModel):
    book_id: int
    book_name: str
    book_author: str
    book_description: str
    book_image: str
    book_status: str
    

class BooksInBookshelf(BaseModel):
    bookshelf_name: str
    books: list[Books]
    
class Profile(BaseModel):
    username: str
    email: str
    phone_number: str
    bookshelf_info: BooksInBookshelf