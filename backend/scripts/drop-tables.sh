export PGPASSWORD=$POSTGRES_PASSWORD
psql -h $POSTGRES_SERVER -U $POSTGRES_USER -d $POSTGRES_DB -c '
DROP TABLE public.answer CASCADE;

DROP TABLE public.candiate_exam_answer CASCADE;

DROP TABLE public.candiate_exam_essay CASCADE;

DROP TABLE public.candidate_exam CASCADE;

DROP TABLE public."configuration" CASCADE;

DROP TABLE public.exam CASCADE;

DROP TABLE public.part CASCADE;

DROP TABLE public.question CASCADE;

DROP TABLE public.question_group CASCADE;

DROP TABLE public."user" CASCADE;
'
if [ $? -eq 0 ]; then
	echo OK
fi
