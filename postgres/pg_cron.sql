\connect vrun

CREATE EXTENSION IF NOT EXISTS pg_cron;

SELECT cron.schedule(
'start_scheduled_exam',
'* * * * *',
$$
	UPDATE candidate_exam SET
	status = 'STARTED'
	, end_time = start_time + (interval '1 minute' * exam.duration)
	FROM
	(
		SELECT 
		e.id, COALESCE(SUM(qg.duration), 0) as duration
		FROM exam e 
		JOIN part p 
		ON e.id  = p.exam_id 
		JOIN question_group qg 
		ON p.question_group_id = qg.id 
		GROUP BY e.id
	) exam
	WHERE start_time <= now() AND status = 'SCHEDULED' AND exam.id = candidate_exam.exam_id
$$
);

SELECT cron.schedule(
'end_started_exam',
'* * * * *',
$$
	UPDATE candidate_exam SET
	status = 'FINISHED'
	WHERE end_time IS NOT NULL AND end_time <= now() AND status = 'STARTED'
$$
);


SELECT cron.schedule(
'score_exam',
'*/2 * * * *',
$$

update candidate_exam ce
set listening_score = res2.listening_score,
reading_score  = res2.reading_score
from (
	select id,
	coalesce (max(score) filter (where skill = 'LISTENING'), 0) as "listening_score", 
	coalesce (max(score) filter (where skill = 'READING'), 0) as "reading_score"
	from (
	select ce.id, qg.skill,  coalesce (10.0 / count(q.id) * count(cea.answer_id), 0) as score
	from 
	exam e 
	join part p 
	on e.id = p.exam_id 
	join 
	(select * from question_group
	where skill  in ('LISTENING', 'READING')
	) qg
	on p.question_group_id  = qg.id 
	join question q 
	on q.question_group_id  = qg.id 
	join answer a on q.id = a.question_id  and a.is_correct_answer  = true
	join candidate_exam ce 
	on ce.exam_id = e.id and ce.status  = 'FINISHED'
	and ce.listening_score is null and ce.reading_score is null  
	left join candiate_exam_answer cea
	on cea.answer_id  = a.id
	group by ce.id, qg.skill 
	order  by qg.skill
	) res
	group by res.id
) res2

where ce.id = res2.id AND ce.status = 'FINISHED'

returning *;
$$
);


SELECT  cron.schedule('delete-job-run-details', '0 12 * * *', $$DELETE FROM cron.job_run_details WHERE end_time < now() - interval '7 days'$$);
