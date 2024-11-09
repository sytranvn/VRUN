from typing import Any
import uuid

from fastapi import APIRouter, HTTPException

from app.api.deps import SessionDep, CurrentUser
from app.models import Exam
from app.view_models import (
    ExamReadonly,
    ExamsReadonly,
)

router = APIRouter()


@router.get("/", response_model=ExamsReadonly)
def read_exams(
    session: SessionDep,
    current_user: CurrentUser,
) -> Any:
    """
    Retrieve exams.
    """
    return ExamsReadonly(data=current_user.exams, count=len(current_user.exams))  # type: ignore


@router.get("/{id}", response_model=ExamReadonly)
def read_exam(session: SessionDep, id: uuid.UUID) -> Any:
    """
    Get exam by ID.
    """
    exam = session.get(Exam, id)
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    return exam


@router.post("/{id}/answer", response_model=ExamReadonly)
def add_answer(session: SessionDep, id: uuid.UUID) -> Any:
    """
    Add an answer.
    """
    exam = session.get(Exam, id)
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    return exam

@router.post("/{id}/submit", response_model=ExamReadonly)
def submit_answer(session: SessionDep, id: uuid.UUID) -> Any:
    """
    Submit questions' answers of a skill.
    """
    exam = session.get(Exam, id)
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    return exam

