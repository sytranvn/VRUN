from sqlmodel import DDL


exam_essay_score_trigger = DDL("""
CREATE OR REPLACE FUNCTION update_candidate_exam_essay_score()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.essay_type = 'SPEAKING' THEN
        UPDATE candidate_exam
        SET speaking_score = (
            SELECT score
            FROM candidate_exam_essay
            WHERE candidate_exam_essay.id = NEW.id
            LIMIT 1
        )
        WHERE candidate_exam.id = NEW.candidate_exam_id;
    ELSE
        UPDATE candidate_exam
        SET writing_score = (
            SELECT score
            FROM candidate_exam_essay
            WHERE candidate_exam_essay.id = NEW.id
            LIMIT 1
        )
        WHERE candidate_exam.id = NEW.candidate_exam_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_candidate_exam_essay_score_trigger
AFTER update of status ON candidate_exam_essay
FOR EACH ROW
EXECUTE PROCEDURE update_candidate_exam_essay_score();
""")


trigger_candidate_exam = DDL("""
CREATE OR REPLACE FUNCTION calculate_candidate_exam_score()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.reading_score IS NOT NULL
       AND NEW.listening_score IS NOT NULL
       AND NEW.writing_score IS NOT NULL
       AND NEW.speaking_score IS NOT NULL
    THEN
        UPDATE candidate_exam
        SET score = (
           NEW.reading_score +
           NEW.listening_score +
           NEW.writing_score +
           NEW.speaking_score
        ) / 4,
        status = 'ASSESSED'
        WHERE candidate_exam.id = NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_candidate_exam_score_trigger
AFTER update OF listening_score, writing_score, reading_score, speaking_score
ON candidate_exam
FOR EACH ROW
EXECUTE PROCEDURE calculate_candidate_exam_score();
""")

