from typing import Any, List, cast
import uuid

from fastapi import APIRouter, HTTPException
from sqlmodel import col, func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import Exam, QuestionGroup
from app.view_models import (
    ExamReadonly,
    ExamsReadonly,
)

router = APIRouter()


@router.get("/", response_model=ExamsReadonly)
def read_exams(
    session: SessionDep, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve exams.
    """

    count_statement = select(func.count()).select_from(Exam)
    count = session.exec(count_statement).one()
    statement = select(Exam).offset(skip).limit(limit)
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

