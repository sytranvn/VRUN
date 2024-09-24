CREATE TABLE IF NOT EXISTS Question (
    id INTEGER PRIMARY KEY,
    exam_id INTEGER,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'DRAFT',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (exam_id) REFERENCES Exam(id)
);
