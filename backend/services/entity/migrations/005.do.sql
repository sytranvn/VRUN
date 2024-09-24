CREATE TABLE IF NOT EXISTS Answer (
    id INTEGER PRIMARY KEY,
    question_id INTEGER,
    description TEXT
    is_answer BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES Question(id)
);
