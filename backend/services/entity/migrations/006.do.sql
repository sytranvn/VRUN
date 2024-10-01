CREATE TABLE IF NOT EXISTS Examinee_Exams (
    id INTEGER PRIMARY KEY,
    exam_id INTEGER,
    examinee_id INTEGER,
    start_time DATETIME,
    duration INTEGER, -- minutes
    status TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (exam_id) REFERENCES Exams(id),
    FOREIGN KEY (examinee_id) REFERENCES Users(id)
);
