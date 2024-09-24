CREATE TABLE IF NOT EXISTS Exam (
    id INTEGER PRIMARY KEY,
    created_by INTEGER,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'DRAFT',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES User(id)
);
