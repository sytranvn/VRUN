import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import QuestionGroup
from app.view_models import (
QuestionGroupCreate, QuestionGroupPublic, QuestionGroupsPublic, QuestionGroupUpdate, Message
        )

router = APIRouter()


@router.get("/", response_model=QuestionGroupsPublic)
def read_question_groups(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve question_groups.
    """

    count_statement = select(func.count()).select_from(QuestionGroup)
    count = session.exec(count_statement).one()
    statement = select(QuestionGroup).offset(skip).limit(limit)
    question_groups = session.exec(statement).all()

    return QuestionGroupsPublic(data=question_groups, count=count)  # type: ignore


@router.get("/{id}", response_model=QuestionGroupPublic)
def read_item(session: SessionDep, current_user: CurrentUser, id: uuid.UUID) -> Any:
    """
    Get item by ID.
    """
    item = session.get(QuestionGroup, id)
    if not item:
        raise HTTPException(status_code=404, detail="QuestionGroup not found")
    return item


@router.post("/", response_model=QuestionGroupPublic)
def create_item(
    *, session: SessionDep, current_user: CurrentUser, item_in: QuestionGroupCreate
) -> Any:
    """
    Create new item.
    """
    item = QuestionGroup.model_validate(item_in)
    session.add(item)
    session.commit()
    session.refresh(item)
    return item


@router.put("/{id}", response_model=QuestionGroupPublic)
def update_item(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    item_in: QuestionGroupUpdate,
) -> Any:
    """
    Update an item.
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    item = session.get(QuestionGroup, id)
    if not item:
        raise HTTPException(status_code=404, detail="QuestionGroup not found")
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
    item = session.get(QuestionGroup, id)
    if not item:
        raise HTTPException(status_code=404, detail="QuestionGroup not found")
    session.delete(item)
    session.commit()
    return Message(message="QuestionGroup deleted successfully")
