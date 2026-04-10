CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS residences (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    location VARCHAR(150) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    contact_phone VARCHAR(20),
    image_url VARCHAR(255),
    type VARCHAR(50),
    capacity INTEGER,
    bathrooms INTEGER,
    current_residents INTEGER,
    user_id BIGINT NOT NULL,
    CONSTRAINT fk_residence_user
        FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT chk_residences_price_positive
        CHECK (price > 0)
);

CREATE INDEX IF NOT EXISTS idx_residence_location
    ON residences (location);
