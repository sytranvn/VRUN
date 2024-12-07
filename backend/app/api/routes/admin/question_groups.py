import os
from typing import Any
import uuid

from fastapi import APIRouter, HTTPException, UploadFile
from sqlmodel import func, select

from app.api.deps import CurrentUser, MinioDep, SessionDep
from app.models import QuestionGroup, QuestionStatusEnum, Skill
from app.view_models import (
    Message,
    QuestionGroupCreate,
    QuestionGroupPublic,
    QuestionGroupUpdate,
    QuestionGroupsPublic,
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
def read_question_group(session: SessionDep, minio: MinioDep,  id: uuid.UUID) -> Any:
    """
    Get question group by ID.
    """
    question_group = session.get(QuestionGroup, id)
    if not question_group:
        raise HTTPException(status_code=404, detail="QuestionGroup not found")
    return question_group


@router.post("/", response_model=QuestionGroupPublic)
def create_question_group(
    session: SessionDep,
    minio: MinioDep,
    question_group_in: QuestionGroupCreate,
    file: UploadFile | None
) -> Any:
    """
    Create new question group.
    """
    question_group = QuestionGroup.model_validate(question_group_in)

    if file is not None:
        if file.content_type != "audio/mpeg":
            raise HTTPException(status_code=400, detail=f"Invalid content type, please upload audio file.")
        _, fext = os.path.splitext(file.filename or "")
        if fext != ".mp3":
            raise HTTPException(status_code=400, detail="Invalid file type, please upload mp3 file")
        if file.size is None:
            raise HTTPException(status_code=400, detail="Invalid file size")
        if file.size > 3 * 2**20:
            raise HTTPException(status_code=400, detail="File too large.")

    session.add(question_group)
    session.commit()
    session.refresh(question_group)

    if file is not None:
        _, fext = os.path.splitext(file.filename or "")
        stored_filename = f"{question_group.id}{fext}"
        minio.put_object("vrun", stored_filename, file.file, file.size or -1)

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


@router.post("/{id}/resources", response_model=QuestionGroupPublic)
def create_question_group_resources(
    session: SessionDep,
    minio: MinioDep,
    id: uuid.UUID,
    file: UploadFile,
) -> Any:
    """
    Create new question group.
    """
    question_group = session.get(QuestionGroup, id)
    if question_group is None:
        raise HTTPException(status_code=404, detail="Not found")
    
    if file.content_type != "audio/mpeg":
        raise HTTPException(status_code=400, detail=f"Invalid content type, please upload audio file.")
    _, fext = os.path.splitext(file.filename or "")
    if fext != ".mp3":
        raise HTTPException(status_code=400, detail="Invalid file type, please upload mp3 file")
    if file.size is None:
        raise HTTPException(status_code=400, detail="Invalid file size")
    if file.size > 3 * 2**20:
        raise HTTPException(status_code=400, detail="File too large.")

    stored_filename = f"{id}{fext}"
    minio.put_object("vrun", stored_filename, file.file, file.size or -1)

    question_group.resource = stored_filename
    session.add(question_group)
    session.commit()
    session.refresh(question_group)
    return question_group

