-- Schema definition script 

BEGIN;

-- Platform Backend Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,                                   -- User ID
    username VARCHAR(50) UNIQUE NOT NULL,                    -- Username
    email VARCHAR(100) UNIQUE NOT NULL,                      -- Email
    phone_number VARCHAR(50) UNIQUE,                         -- Phone number 
    password_hash VARCHAR(255) NOT NULL,                     -- Password
    stage VARCHAR(50) NOT NULL,                              -- Status of the user ()
);

CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,                                   -- User ID
    book_name VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    book_description_ru TEXT,
    book_description_kz TEXT,
    comment reference,
    rating FLOAT,
    book_status reference,
    book_language VARCHAR(100),
    tags TEXT[] DEFAULT '{}'
    FOREIGN KEY 
);

CREATE TABLE IF NOT EXISTS book_shelf (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL, 
    book_id BIGINT,
    user_rating FLOAT,
    user_comment TEXT,
    user_read_status VARCHAR(50) NOT NULL, 
    FOREIGN KEY users REFERENCES users(id),
    FOREIGN KEY book_id REFERENCES books(id)
)

CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    book_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    parent_id INT REFERENCES comments(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY user_id REFERENCES users(id),
    FOREIGN KEY books REFERENCES books(id)
);

CREATE TABLE IF NOT EXISTS members (
    club_id VARCHAR,
    user_id BIGINT,
    role_id INT REFERENCES roles(id), 
    FOREIGN KEY club_id REFERENCES clubs(club_id)
    FOREIGN KEY user_id REFERENCES users(id)
)

CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS clubs (
    club_id VARCHAR(255) PRIMARY KEY,
    user_id TEXT[]
)

COMMIT;