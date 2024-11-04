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
def read_item(session: SessionDep, current_user: CurrentUser, id: uuid.UUID) -> Any:
    """
    Get item by ID.
    """
    item = session.get(Question, id)
    if not item:
        raise HTTPException(status_code=404, detail="Question not found")
    return item


@router.post("/", response_model=QuestionPublic)
def create_item(
    *, session: SessionDep, current_user: CurrentUser, item_in: QuestionCreate
) -> Any:
    """
    Create new item.
    """
    item = Question.model_validate(item_in)
    session.add(item)
    session.commit()
    session.refresh(item)
    return item


@router.put("/{id}", response_model=QuestionPublic)
def update_item(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    item_in: QuestionUpdate,
) -> Any:
    """
    Update an item.
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    item = session.get(Question, id)
    if not item:
        raise HTTPException(status_code=404, detail="Question not found")
    update_dict = item_in.model_dump(exclude_unset=True)
    item.sqlmodel_update(update_dict)
    session.add(item)
    session.commit()
    session.refresh(item)
    return item


@router.delete("/{id}")
def delete_item(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Message:
    """
    Delete an item.
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    item = session.get(Question, id)
    if not item:
        raise HTTPException(status_code=404, detail="Question not found")
    session.delete(item)
    session.commit()
    return Message(message="Question deleted successfully")
