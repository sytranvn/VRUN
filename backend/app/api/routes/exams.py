from typing import Any
import uuid

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import Exam, ExamStatus
from app.view_models import (
    ExamReadonly,
    ExamsReadonly,
    RegisteredExam
)

router = APIRouter()


@router.get("/", response_model=ExamsReadonly)
def read_exams(
    session: SessionDep,
    current_user: CurrentUser,
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
def read_exam(session: SessionDep, id: uuid.UUID) -> Any:
    """
    Get exam by ID.
    """
    exam = session.get(Exam, id)
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    return exam

@router.post("/{id}/register", response_model=RegisteredExam)
def register_exam(session: SessionDep, current_user: CurrentUser, id: uuid.UUID) -> Any:
    """
    Register for an exam.
    """
    exam = session.exec(
        select(Exam)
        .where(Exam.id == id, Exam.status == ExamStatus.ACTIVE)
    ).one()
    if exam is None:
        raise HTTPException(status_code=404, detail="Not found")
    current_user.exams.append(exam)
    session.commit()
    session.refresh(current_user.exams)
    return current_user.exams

