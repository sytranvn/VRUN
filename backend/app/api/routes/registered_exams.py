import os
from typing import Any
import uuid

from fastapi import APIRouter, BackgroundTasks, HTTPException, UploadFile, status
from sqlmodel import Session, select

from app.api.deps import MinioDep, SessionDep, CurrentUser, get_db, get_minio_client
from app.models import CandidateExam, CandidateExamEssay, CandidateExamStatus, Exam, Part, Question, Skill
from app.services.ai_service import AssessmentResult
from app.view_models import (
    ExamFinished,
    ExamReadonly,
    ExamSubmit,
    RegisteredExamPublic,
    RegisteredExamsPublic,
    EssayIn,
)

router = APIRouter()


@router.get("/", response_model=RegisteredExamsPublic)
def read_registered_exams(
    session: SessionDep,
    current_user: CurrentUser,
) -> Any:
    """
    Retrieve exams.
    """
    return RegisteredExamsPublic(data=current_user.exams, count=len(current_user.exams))  # type: ignore


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
    score = sum(ans.answer.is_correct_answer for ans in exam.selected_answers)
    essay_score = sum(essay.score or 0 for essay in exam.essays)

    return ExamFinished(**exam.model_dump(), score=score + essay_score)


@router.post("/{id}/answers", response_model=RegisteredExamPublic)
def add_answer(session: SessionDep,
               current_user: CurrentUser,
               id: uuid.UUID) -> Any:
    """
    Add an answer.
    """
    exam = session.get(CandidateExam, id)
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    return exam


def speech_to_text(file):
    pass


def upload_speaking_essay(candidate_exam_id: uuid.UUID, question_id: uuid.UUID, file):
    from app.core.db import engine
    minio = get_minio_client()
    with Session(engine) as session:
        text = speech_to_text(file)
        essay = session.exec(
            select(CandidateExamEssay)
            .where(CandidateExamEssay.candidate_exam_id == candidate_exam_id,
                   CandidateExamEssay.question_id == question_id)
        ).first()
        _, fext = os.path.splitext(file.filename or "")
        stored_file_name = f"{candidate_exam_id}/{question_id}/{essay.id}{fext}"
        minio.put_object(f"vrun",
                         stored_file_name,
                         file.file, file.size or -1)
        essay.content = text
        essay.resource = stored_file_name
        session.commit()


@router.post("/{id}/essays", response_model=RegisteredExamPublic)
def add_speaking_record(session: SessionDep,
                        current_user: CurrentUser,
                        minio: MinioDep,
                        id: uuid.UUID,
                        essay_in: EssayIn,
                        file: UploadFile | None,
                        background_tasks: BackgroundTasks):

    exam = session.exec(
        select(CandidateExam)
        .where(CandidateExam.id == id,
               CandidateExam.status == CandidateExamStatus.STARTED)
    ).first()
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    question = session.get(Question, essay_in.question_id)

    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    if question.question_group.skill == Skill.SPEAKING:
        if file is None:
            raise HTTPException(status_code=400, detail="Speaking essay must be audio")
        if file.content_type != "audio/mpeg":
            raise HTTPException(status_code=400, detail="Invalid content type, please upload audio file.")
        _, fext = os.path.splitext(file.filename or "")
        if fext != ".mp3":
            raise HTTPException(status_code=400, detail="Invalid file type, please upload mp3 file")
        if file.size is None:
            raise HTTPException(status_code=400, detail="Invalid file size")
        if file.size > 3 * 2**20:
            raise HTTPException(status_code=400, detail="File too large.")

        essay = CandidateExamEssay.model_validate(dict(**essay_in.model_dump()))
        session.add(essay)
        background_tasks.add_task(upload_speaking_essay, id, essay_in.question_id, file)
    else:
        essay = CandidateExamEssay.model_validate(essay_in)
        session.add(essay)
        
    session.refresh(exam)

    return exam


def grade_exam(session: SessionDep, candidate_exam: CandidateExam):
    from app.services.ai_service import assess_writing_essay

    # get essays
    for essay in candidate_exam.essays:
        if essay.question.question_group.skill == Skill.SPEAKING:
            # TODO: convert speech to text and store to content
            pass

        result: AssessmentResult = assess_writing_essay(
            essay.question.description,
            essay.content
        )
        essay.score = result.score.summary
        essay.assetsment = str(result.assessment)

    # final score

    session.commit()
    candidate_exam.status = CandidateExamStatus.FINISHED
    # update status


@router.post("/{id}/submit", response_model=ExamReadonly)
def submit_answer(session: SessionDep,
                  current_user: CurrentUser,
                  id: uuid.UUID,
                  exam_in: ExamSubmit,
                  background_tasks: BackgroundTasks) -> Any:
    """
    Submit questions' answers of a skill.
    """
    exam: CandidateExam | None = session.exec(
        select(CandidateExam).where(CandidateExam.id == id)
    ).first()
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    parts = session.exec(
        select(Part).where(
            Part.question_group_id.in_([p.id for p in exam_in.question_groups]),  # type: ignore
            Part.exam_id == exam.id
        )
    ).all()
    exam.exam.parts = [Part(**part.model_dump()) for part in parts]
    session.commit()
    session.refresh(exam)
    background_tasks.add_task(grade_exam, session, exam)
    return exam
