BEGIN;

-- Platform Backend Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,                                   -- User ID
    username VARCHAR(50) UNIQUE NOT NULL,                    -- Username
    email VARCHAR(100) UNIQUE NOT NULL,                      -- Email
    phone_number VARCHAR(50) UNIQUE,                         -- Phone number 
    password_hash VARCHAR(255) NOT NULL,                     -- Password
    stage VARCHAR(50) NOT NULL                               -- Status of the user
);

CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,                                   -- Book ID
    book_name VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    book_description_ru TEXT,
    book_description_kz TEXT,
    comment TEXT,                                            -- Assuming it's a text field
    rating FLOAT CHECK (rating >= 0 AND rating <= 5),        -- Rating should be between 0 and 5
    book_status VARCHAR(50),                                 -- Assuming it's a text field
    book_language VARCHAR(100),
    tags TEXT[] DEFAULT '{}'                                 -- Tags as an array of text
);

CREATE TABLE IF NOT EXISTS book_shelf (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL, 
    book_id BIGINT,
    user_rating FLOAT CHECK (user_rating >= 0 AND user_rating <= 5), -- User rating between 0 and 5
    user_comment TEXT,
    user_read_status VARCHAR(50) NOT NULL, 
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);

CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    book_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    parent_id INT REFERENCES comments(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);

CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS members (
    club_id VARCHAR(255),
    user_id BIGINT,
    role_id INT REFERENCES roles(id),
    PRIMARY KEY (club_id, user_id),                           -- Composite primary key
    FOREIGN KEY (club_id) REFERENCES clubs(club_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS creations (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    caption TEXT,
    image_id VARCHAR(255),
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS clubs (
    club_id VARCHAR(255) PRIMARY KEY,
    user_id TEXT[]                                           -- Assuming this is an array of user IDs
);

COMMIT;
