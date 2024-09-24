CREATE TABLE IF NOT EXISTS Role (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Role(id, name) 
VALUES
    (1, 'admin'),
    (2, 'examiner'),
    (3, 'examinee');


