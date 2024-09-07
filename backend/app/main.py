from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from app.database.db_configuration import init_db
from app.routes.auth_routes import auth_router
import logging
app = FastAPI(debug=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # List of allowed origins, use ["*"] to allow all
    allow_credentials=True,
    allow_methods=["*"],  # List of allowed HTTP methods, use ["*"] to allow all
    allow_headers=["*"],  # List of allowed headers, use ["*"] to allow all
)

app.include_router(
    auth_router, prefix="/auth", tags=["auth"],
)

@app.on_event("startup")
async def startup_event():
    
    logging.info("Starting whatsapp message service")
    await init_db()