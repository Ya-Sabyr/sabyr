import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

# Get the database URL from the environment variable
DATABASE_URL = os.getenv("DATABASE_URL")

# Replace the dialect in the URL
DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://")

# Create the SQLAlchemy engine
engine = create_async_engine(DATABASE_URL, echo=True)

# Create a sessionmaker with AsyncSession
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, class_=AsyncSession)

# Create a declarative base class
Base = declarative_base()

async def init_db():
    """
    Initializes the database by creating all tables.
    """
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        print("Database tables created successfully.")
    except Exception as e:
        print(f"Error creating database tables: {e}")

async def get_db():
    """
    Provides a database session.

    Yields
    ------
    AsyncSession
        The SQLAlchemy asynchronous session.
    """
    async with SessionLocal() as session:
        yield session