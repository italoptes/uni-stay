ALTER TABLE residences
    ADD COLUMN type VARCHAR(50),
    ADD COLUMN capacity INTEGER,
    ADD COLUMN bathrooms INTEGER,
    ADD COLUMN current_residents INTEGER;
