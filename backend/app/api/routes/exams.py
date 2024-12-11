from typing import Any, List
import uuid

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import CandidateExam, CandidateExamStatus, Exam, ExamStatus
from app.view_models import (
    CandidateExamRegister,
    ExamReadonly,
    ExamsReadonly,
    RegisteredExamPublic
)

router = APIRouter()


@router.get("/", response_model=ExamsReadonly)
def read_available_exams(
    session: SessionDep,
    skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve exams.
    """

    count_statement = select(func.count())\
        .select_from(Exam)\
        .where(Exam.status == ExamStatus.ACTIVE)
    count = session.exec(count_statement).one()
    statement = select(Exam).where(Exam.status == ExamStatus.ACTIVE)\
        .offset(skip).limit(limit)
    exams = session.exec(statement).all()

    return ExamsReadonly(data=exams, count=count)  # type: ignore


@router.get("/{id}", response_model=ExamReadonly)
def read_available_exam(session: SessionDep, id: uuid.UUID) -> Any:
    """
    Get exam by ID.
    """
    exam = session.get(Exam, id)
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    return exam


@router.post("/{id}/register", response_model=RegisteredExamPublic)
def register_exam(
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    register_in: CandidateExamRegister
) -> Any:
    """
    Register for an exam.
    """
    exam = session.exec(
        select(Exam)
        .where(Exam.id == id, Exam.status == ExamStatus.ACTIVE)
    ).one()
    if exam is None:
        raise HTTPException(status_code=404, detail="Not found")
    exists = next((True
                   for ue in current_user.exams
                   if ue.exam_id == exam.id
                   and ue.status in (CandidateExamStatus.SCHEDULED,
                                     CandidateExamStatus.STARTED)),
                  False)
    if exists:
        raise HTTPException(status_code=400, detail="You have registered this exam.")
    registered_exam = CandidateExam(
            candidate_id=current_user.id,
            exam_id=exam.id,
            **register_in.model_dump()
        )
    session.add(registered_exam)
    session.commit()
    session.refresh(current_user)
    return registered_exam
