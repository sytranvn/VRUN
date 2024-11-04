import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import Question

from app.view_models import (
 QuestionCreate, QuestionPublic, QuestionsPublic, QuestionUpdate, Message
        )

router = APIRouter()


@router.get("/", response_model=QuestionsPublic)
def read_questions(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve questions.
    """

    count_statement = select(func.count()).select_from(Question)
    count = session.exec(count_statement).one()
    statement = select(Question).offset(skip).limit(limit)
    questions = session.exec(statement).all()

    return QuestionsPublic(data=questions, count=count)  # type: ignore


@router.get("/{id}", response_model=QuestionPublic)
def read_question(session: SessionDep, current_user: CurrentUser, id: uuid.UUID) -> Any:
    """
    Get question by ID.
    """
    question = session.get(Question, id)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    return question


@router.post("/", response_model=QuestionPublic)
def create_question(
    *, session: SessionDep, current_user: CurrentUser, question_in: QuestionCreate
) -> Any:
    """
    Create new question.
    """
    question = Question.model_validate(question_in)
    session.add(question)
    session.commit()
    session.refresh(question)
    return question


@router.put("/{id}", response_model=QuestionPublic)
def update_question(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    question_in: QuestionUpdate,
) -> Any:
    """
    Update an question.
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    question = session.get(Question, id)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    update_dict = question_in.model_dump(exclude_unset=True)
    question.sqlmodel_update(update_dict)
    session.add(question)
    session.commit()
    session.refresh(question)
    return question


@router.delete("/{id}")
def delete_question(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Message:
    """
    Delete an question.
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    question = session.get(Question, id)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    session.delete(question)
    session.commit()
    return Message(message="Question deleted successfully")
