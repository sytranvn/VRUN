CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    role INTEGER,
    full_name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(role) REFERENCES Role(id)
);

INSERT INTO User (id, username, full_name, role)
VALUES (1, 'admin1', 'Admin 1', 1), (2, 'admin2','Admin 2', 1);
