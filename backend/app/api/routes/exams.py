import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import Exam, ExamCreate, ExamPublic, ExamsPublic, ExamUpdate, Message

router = APIRouter()


@router.get("/", response_model=ExamsPublic)
def read_exams(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve exams.
    """

    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")

    count_statement = select(func.count()).select_from(Exam)
    count = session.exec(count_statement).one()
    statement = select(Exam).offset(skip).limit(limit)
    exams = session.exec(statement).all()

    return ExamsPublic(data=exams, count=count)  # type: ignore


@router.get("/{id}", response_model=ExamPublic)
def read_item(session: SessionDep, current_user: CurrentUser, id: uuid.UUID) -> Any:
    """
    Get item by ID.
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    item = session.get(Exam, id)
    if not item:
        raise HTTPException(status_code=404, detail="Exam not found")
    return item


@router.post("/", response_model=ExamPublic)
def create_item(
    *, session: SessionDep, current_user: CurrentUser, item_in: ExamCreate
) -> Any:
    """
    Create new item.
    """
    item = Exam.model_validate(item_in)
    session.add(item)
    session.commit()
    session.refresh(item)
    return item


@router.put("/{id}", response_model=ExamPublic)
def update_item(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    item_in: ExamUpdate,
) -> Any:
    """
    Update an item.
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    item = session.get(Exam, id)
    if not item:
        raise HTTPException(status_code=404, detail="Exam not found")
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
    item = session.get(Exam, id)
    if not item:
        raise HTTPException(status_code=404, detail="Exam not found")
    session.delete(item)
    session.commit()
    return Message(message="Exam deleted successfully")
