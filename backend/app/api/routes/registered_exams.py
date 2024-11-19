from typing import Any
import uuid

from fastapi import APIRouter, HTTPException

from app.api.deps import SessionDep, CurrentUser
from app.models import CandidateExam, Exam
from app.view_models import (
    ExamReadonly,
    ExamsReadonly,
    RegisteredExams,
)

router = APIRouter()


@router.get("/", response_model=RegisteredExams)
def read_exams(
    session: SessionDep,
    current_user: CurrentUser,
) -> Any:
    """
    Retrieve exams.
    """
    return RegisteredExams(data=current_user.exams, count=len(current_user.exams))  # type: ignore


@router.get("/{id}", response_model=RegisteredExams)
def read_exam(session: SessionDep,
              current_user: CurrentUser,
              id: uuid.UUID) -> Any:
    """
    Get exam by ID.
    """
    exam = session.get(CandidateExam, id)
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    return exam


@router.post("/{id}/answer", response_model=ExamReadonly)
def add_answer(session: SessionDep,
               current_user: CurrentUser,
               id: uuid.UUID) -> Any:
    """
    Add an answer.
    """
    exam = session.get(Exam, id)
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    return exam


@router.post("/{id}/submit", response_model=ExamReadonly)
def submit_answer(session: SessionDep,
                  current_user: CurrentUser,
                  id: uuid.UUID) -> Any:
    """
    Submit questions' answers of a skill.
    """
    exam = session.get(Exam, id)
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    return exam
