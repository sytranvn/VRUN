import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import QuestionGroup, QuestionStatusEnum, Skill
from app.view_models import (
QuestionGroupCreate, QuestionGroupPublic, QuestionGroupsPublic, QuestionGroupUpdate, Message
        )

router = APIRouter()


@router.get("/", response_model=QuestionGroupsPublic)
def read_question_groups(
    session: SessionDep, current_user: CurrentUser,
    skip: int = 0, limit: int = 100,
    skill: Skill | None = None,
    status: QuestionStatusEnum | None = None
) -> Any:
    """
    Retrieve question groups.
    """

    count_statement = select(func.count()).select_from(QuestionGroup)
    if skill:
        count_statement = count_statement.where(QuestionGroup.skill == skill)
    if status:
        count_statement = count_statement.where(QuestionGroup.status == status)

    count = session.exec(count_statement).one()
    statement = select(QuestionGroup).offset(skip).limit(limit)
    question_groups = session.exec(statement).all()

    return QuestionGroupsPublic(data=question_groups, count=count)  # type: ignore


@router.get("/{id}", response_model=QuestionGroupPublic)
def read_question_group(session: SessionDep, current_user: CurrentUser, id: uuid.UUID) -> Any:
    """
    Get question group by ID.
    """
    question_group = session.get(QuestionGroup, id)
    if not question_group:
        raise HTTPException(status_code=404, detail="QuestionGroup not found")
    return question_group


@router.post("/", response_model=QuestionGroupPublic)
def create_question_group(
    *, session: SessionDep, current_user: CurrentUser, question_group_in: QuestionGroupCreate
) -> Any:
    """
    Create new question group.
    """
    question_group = QuestionGroup.model_validate(question_group_in)
    session.add(question_group)
    session.commit()
    session.refresh(question_group)
    return question_group


@router.put("/{id}", response_model=QuestionGroupPublic)
def update_question_group(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    question_group_in: QuestionGroupUpdate,
) -> Any:
    """
    Update an question group.
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    question_group = session.get(QuestionGroup, id)
    if not question_group:
        raise HTTPException(status_code=404, detail="QuestionGroup not found")
    update_dict = question_group_in.model_dump(exclude_unset=True)
    question_group.sqlmodel_update(update_dict)
    session.add(question_group)
    session.commit()
    session.refresh(question_group)
    return question_group


@router.delete("/{id}")
def delete_question_group(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Message:
    """
    Delete an question group.
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    question_group = session.get(QuestionGroup, id)
    if not question_group:
        raise HTTPException(status_code=404, detail="QuestionGroup not found")
    session.delete(question_group)
    session.commit()
    return Message(message="QuestionGroup deleted successfully")

