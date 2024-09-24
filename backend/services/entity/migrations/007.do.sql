CREATE TABLE IF NOT EXISTS Examinee_Exam_Answer (
    id INTEGER PRIMARY KEY,
    examinee_exam_id INTEGER,
    question_id INTEGER,
    answer_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (examinee_exam_id) REFERENCES Examinee_Exam(id),
    FOREIGN KEY (question_id) REFERENCES Question(id),
    FOREIGN KEY (answer_id) REFERENCES Answer(id)
);
