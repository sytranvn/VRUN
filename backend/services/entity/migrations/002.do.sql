CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY,
    role INTEGER,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    provider TEXT NOT NULL,
    provider_id TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(role) REFERENCES Role(id)
);
