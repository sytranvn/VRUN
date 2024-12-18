from sqlmodel import DDL


exam_essay_score_trigger = DDL("""
CREATE OR REPLACE FUNCTION calculate_average_essay_score(candidate_exam_id UUID, skill text)
returns DECIMAL
as
$$
SELECT COALESCE (10.0 / COUNT(q.id) * SUM(cee.score), 0) as score
FROM exam e
JOIN part p ON e.id = p.exam_id
JOIN
(
    SELECT * FROM question_group qg WHERE qg.skill = skill
) qg ON p.question_group_id = qg.id
JOIN question q ON q.question_group_id = qg.id
JOIN candidate_exam ce ON ce.exam_id = e.id
LEFT JOIN candidate_exam_essay cee ON cee.candidate_exam_id = ce.id
GROUP BY ce.id, qg.skill
ORDER BY qg.skill
$$
LANGUAGE SQL IMMUTABLE STRICT;

CREATE OR REPLACE FUNCTION update_candidate_exam_essay_score()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.essay_type = 'SPEAKING' THEN
        UPDATE candidate_exam
        SET speaking_score = (SELECT calculate_average_essay_score(NEW.id, NEW.essay_type))
        WHERE candidate_exam.id = NEW.candidate_exam_id;
    ELSE
        UPDATE candidate_exam
        SET writing_score = (SELECT calculate_average_essay_score(NEW.id, NEW.essay_type))
        WHERE candidate_exam.id = NEW.candidate_exam_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_candidate_exam_essay_score_trigger
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
        WHERE candidate_exam.id = NEW.id
            AND NOT EXISTS (
                SELECT 1
                FROM candidate_exam_essay
                WHERE candidate_exam_id = NEW.id
                AND status = 'SUBMITTED'
            );
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
