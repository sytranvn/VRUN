import os
from typing import Any, List
import uuid

from fastapi import APIRouter, BackgroundTasks, HTTPException, UploadFile
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import SessionTransaction
from sqlmodel import select

from app.api.deps import MinioDep, SessionDep, CurrentUser
from app.models import CandidateExam, CandidateExamAnswer, CandidateExamEssay, CandidateExamStatus, Exam, Part, Question, Skill
from app.services.ai_service import AssessmentResult, assess_speaking_essay, assess_writing_essay, transcribe_file
from app.view_models import (
    AnswerIn,
    ExamFinished,
    ExamReadonly,
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


async def upload_speaking_essay(minio, candidate_exam_id: uuid.UUID, question_id: uuid.UUID, file):
    text = await transcribe_file(file)
    _, fext = os.path.splitext(file.filename or "")
    stored_file_name = f"{candidate_exam_id}/{question_id}{fext}"
    minio.put_object("vrun",
                     stored_file_name,
                     file.file, file.size or -1)
    return text or "", stored_file_name


@router.post("/{id}/essays", response_model=RegisteredExamPublic)
def add_speaking_record(session: SessionDep,
                        current_user: CurrentUser,
                        minio: MinioDep,
                        id: uuid.UUID,
                        file: UploadFile | None,
                        essay_in: EssayIn,
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

    if question.question_group.skill not in (Skill.WRITING, Skill.SPEAKING):
        raise HTTPException(
            status_code=400, detail="Not a writing or speaking question")

    if question.question_group.skill == Skill.SPEAKING:
        if file is None:
            raise HTTPException(
                status_code=400, detail="Speaking essay must be audio")
        if file.content_type != "audio/mpeg":
            raise HTTPException(
                status_code=400, detail="Invalid content type, please upload audio file.")
        _, fext = os.path.splitext(file.filename or "")
        if fext != ".mp3":
            raise HTTPException(
                status_code=400, detail="Invalid file type, please upload mp3 file")
        if file.size is None:
            raise HTTPException(status_code=400, detail="Invalid file size")
        if file.size > 100 * 2**20:
            raise HTTPException(status_code=400, detail="File too large.")

        essay = CandidateExamEssay.model_validate(
            dict(**essay_in.model_dump()))
        session.add(essay)
        content, resource = upload_speaking_essay(
            minio, id, essay_in.question_id, file)
        essay.content = content
        essay.resource = resource
    else:
        essay = CandidateExamEssay.model_validate(essay_in)
        session.add(essay)

    session.refresh(exam)

    return exam


def grade_exam(session: SessionDep, candidate_exam: CandidateExam):
    for essay in candidate_exam.essays:
        # TODO: status between user added essay but not completed processing
        if essay.question.question_group.skill == Skill.SPEAKING:
            result: AssessmentResult = assess_speaking_essay(
                essay.question.description,
                essay.content
            )
        else:
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


@router.post("/{id}/submit", response_model=CandidateExam)
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
    session.commit()
    session.refresh(exam)
    background_tasks.add_task(grade_exam, session, exam)
    return exam
