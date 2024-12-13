from datetime import datetime, timezone
import os
from typing import Any, List
import uuid

from fastapi import APIRouter, BackgroundTasks, HTTPException, UploadFile
from sqlalchemy.exc import IntegrityError
from sqlmodel import Session, select, func

from app.api.deps import MinioDep, SessionDep, CurrentUser, get_minio_client
from app.models import CandidateExam, CandidateExamAnswer, CandidateExamEssay, CandidateExamStatus, EssayStatus, Question, Skill
from app.services.ai_service import AssessmentResult, assess_speaking_essay, assess_writing_essay, transcribe_file
from app.view_models import (
    AnswerIn,
    CandidateExamPublic,
    EssayPublic,
    ExamFinished,
    RegisteredExamPublic,
    RegisteredExamsPublic,
    EssayIn,
)

router = APIRouter()


@router.get("/", response_model=RegisteredExamsPublic)
def read_registered_exams(
    session: SessionDep,
    current_user: CurrentUser,
    status: CandidateExamStatus | None = None,
    skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve exams.
    """

    count_statement = (select(func.count())
                       .select_from(CandidateExam)
                       .where(CandidateExam.candidate_id == current_user.id))
    statement = (select(CandidateExam)
                 .where(CandidateExam.candidate_id == current_user.id)
                 .offset(skip).limit(limit))

    if status:
        count_statement = count_statement.where(CandidateExam.status == status)
        statement = statement.where(CandidateExam.status == status)

    count = session.exec(count_statement).one()
    exams = session.exec(statement).all()

    return RegisteredExamsPublic(data=exams, count=count)  # type: ignore


@router.get("/{id}", response_model=RegisteredExamPublic)
def read_registered_exam(session: SessionDep,
                         current_user: CurrentUser,
                         id: uuid.UUID) -> Any:
    """
    Get exam by ID.
    """
    exam = session.get(CandidateExam, id)
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    return exam


@router.get("/{id}/result", response_model=ExamFinished)
def read_exam_result(session: SessionDep,
                     current_user: CurrentUser,
                     id: uuid.UUID):
    """
    Get exam result
    """
    exam = session.exec(
        select(CandidateExam).where(CandidateExam.id == id)
    ).first()
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    if exam.status != CandidateExamStatus.ASSESSED:
        raise HTTPException(status_code=404, detail="Result not available")
    # PERF: this is slow

    return ExamFinished(**exam.model_dump(), score=score + essay_score)


@router.post("/{id}/answers", response_model=List[AnswerIn])
def add_answers(session: SessionDep,
                current_user: CurrentUser,
                answers_in: List[AnswerIn],
                id: uuid.UUID) -> Any:
    """
    Add an answer.
    """
    exam = session.get(CandidateExam, id)
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    answers = [CandidateExamAnswer(
        candidate_exam_id=exam.id, **a.model_dump()) for a in answers_in]
    try:
        for a in exam.selected_answers:
            session.delete(a)
        session.add_all(answers)
        session.commit()
        session.refresh(exam)
    except IntegrityError:
        raise HTTPException(status_code=400, detail="Invalid answers")
    return exam.selected_answers


async def rate_speaking_essay(essay):
    from app.core.db import engine

    with Session(engine) as session:
        essay = session.get(CandidateExamEssay, essay.id)
        # TODO: minio file to transcribe_file
        file = get_minio_client().get_object("vrun", essay.resource or "")
        text = await transcribe_file(file)
        essay.content = text
        result: AssessmentResult = assess_speaking_essay(
            description=essay.question.question_group.description,
            question=essay.question.description,
            transcribed_speech=essay.content)
        essay.score = result.score.summary
        essay.score_info = result.score.model_dump()

        essay.assessment = result.assessment.summary
        essay.assessment_info = result.assessment.model_dump()
        essay.status = EssayStatus.ASSESSED

        session.add(essay)
        session.commit()


def rate_writing_essay(essay):
    from app.core.db import engine

    with Session(engine) as session:
        essay = session.get(CandidateExamEssay, essay.id)
        result: AssessmentResult = assess_writing_essay(
            description=essay.question.question_group.description,
            question=essay.question.description,
            essay=essay.content)
        essay.score = result.score.summary
        essay.score_info = result.score.model_dump()

        essay.assessment = result.assessment.summary
        essay.assessment_info = result.assessment.model_dump()
        essay.status = EssayStatus.ASSESSED

        session.add(essay)
        session.commit()


@router.post("/{id}/writing_essays", response_model=EssayPublic)
def add_writing_record(session: SessionDep,
                       current_user: CurrentUser,
                       id: uuid.UUID,
                       essay_in: EssayIn,
                       background_tasks: BackgroundTasks):
    exam = session.exec(
        select(CandidateExam)
        .where(CandidateExam.id == id,
               CandidateExam.status == CandidateExamStatus.STARTED)
    ).first()
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    question = session.exec(
        select(Question)
        .where(Question.id == essay_in.question_id)
    ).first()

    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    if question.question_group.skill != Skill.WRITING:
        raise HTTPException(status_code=400, detail="Not a speaking question")
    essay = session.exec(
        select(CandidateExamEssay)
        .where(CandidateExamEssay.question_id == question.id, CandidateExamEssay.candidate_exam_id == id)
    ).first()
    if essay:
        essay.sqlmodel_update(essay.model_dump(), update=essay_in.model_dump())
    else:
        essay = CandidateExamEssay.model_validate(
            dict(candidate_exam_id=id, **essay_in.model_dump()))
        session.add(essay)
    session.commit()
    session.refresh(essay)
    background_tasks.add_task(rate_writing_essay, essay)
    return essay


@router.post("/{id}/speaking_essays", response_model=EssayPublic)
def add_speaking_record(session: SessionDep,
                        current_user: CurrentUser,
                        minio: MinioDep,
                        id: uuid.UUID,
                        question_id: uuid.UUID,
                        file: UploadFile,
                        background_tasks: BackgroundTasks):
    exam = session.exec(
        select(CandidateExam)
        .where(CandidateExam.id == id,
               CandidateExam.status == CandidateExamStatus.STARTED)
    ).first()
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    question = session.exec(
        select(Question)
        .where(Question.id == question_id)
    ).first()

    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    if question.question_group.skill != Skill.SPEAKING:
        raise HTTPException(status_code=400, detail="Not a speaking question")
    allowed_mimes = ("audio/wav", "audio/x-wav")
    if file.content_type not in allowed_mimes:
        raise HTTPException(
            status_code=400, detail=f"Invalid content type, please upload audio file.")
    _, fext = os.path.splitext(file.filename or "")
    allowed_types = (".wav",)
    if fext.lower() not in allowed_types:
        raise HTTPException(
            status_code=400, detail=f"Invalid file type, please upload {allowed_types} file")
    if file.size is None:
        raise HTTPException(status_code=400, detail="Invalid file size")
    if file.size > 100 * 2**20:
        raise HTTPException(status_code=400, detail="File too large.")
    essay = session.exec(
        select(CandidateExamEssay)
        .where(CandidateExamEssay.question_id == question.id, CandidateExamEssay.candidate_exam_id == id)
    ).first()
    if not essay:
        essay = CandidateExamEssay(
            id=uuid.uuid4(), candidate_exam_id=id, question_id=question_id)
    _, fext = os.path.splitext(file.filename or "")
    stored_file_name = f"{id}/{essay.id}{fext}"
    essay.resource = stored_file_name
    session.add(essay)
    session.commit()
    session.refresh(essay)
    minio.put_object("vrun",
                     stored_file_name,
                     file.file, file.size or -1)
    background_tasks.add_task(rate_speaking_essay, essay)

    return essay


@router.post("/{id}/submit", response_model=CandidateExamPublic)
def submit_answer(session: SessionDep,
                  id: uuid.UUID,
                  background_tasks: BackgroundTasks) -> Any:
    """
    Update exam as finished.
    """
    exam: CandidateExam | None = session.exec(
        select(CandidateExam)
        .where(CandidateExam.id == id,
               CandidateExam.status == CandidateExamStatus.STARTED)
    ).first()
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    exam.status = CandidateExamStatus.FINISHED
    exam.end_time = datetime.now(tz=timezone.utc)
    session.commit()
    session.refresh(exam)
    return exam
