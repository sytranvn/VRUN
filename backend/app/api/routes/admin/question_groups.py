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

    count_statement = (
        select(func.count())
        .select_from(QuestionGroup)
    )
    filters = []
    if skill:
        filters.append(QuestionGroup.skill == skill)
    if status:
        filters.append(QuestionGroup.status == status)

    count_statement = count_statement.where(*filters)
    count = session.exec(count_statement).one()

    statement = select(QuestionGroup).where(*filters).offset(skip).limit(limit).order_by(QuestionGroup.created_time.desc())  # type: ignore
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
    session: SessionDep, current_user: CurrentUser, question_group_in: QuestionGroupCreate
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
    if len(question_group.parts) > 0:
        raise HTTPException(status_code=401, detail=f"Question group is used by {len(question_group.parts)} exams")
    # for q in question_group.questions:
    #     session.delete(q)
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

