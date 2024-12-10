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


SELECT  cron.schedule('delete-job-run-details', '0 12 * * *', $$DELETE FROM cron.job_run_details WHERE end_time < now() - interval '7 days'$$);
