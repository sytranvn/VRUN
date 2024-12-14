from typing import Any, List, cast
import uuid

from fastapi import APIRouter, HTTPException
from sqlmodel import col, func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import Exam, Part, QuestionGroup
from app.view_models import ExamCreate, ExamPublic, ExamUpdate, ExamsPublic, Message, PartCreate

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
    statement = (
        select(Exam)
        .offset(skip)
        .limit(limit)
        .order_by(Exam.created_time.desc())  # type: ignore
    )
    exams = session.exec(statement).all()

    return ExamsPublic(data=exams, count=count)  # type: ignore


@router.get("/{id}", response_model=ExamPublic)
def read_exam(session: SessionDep, current_user: CurrentUser, id: uuid.UUID) -> Any:
    """
    Get exam by ID.
    """
    exam = session.get(Exam, id)
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    return exam


@router.post("/", response_model=ExamPublic)
def create_exam(
    *, session: SessionDep, exam_in: ExamCreate
) -> Any:
    """
    Create new exam.
    """
    exam = Exam.model_validate(exam_in)
    session.add(exam)
    session.commit()
    session.refresh(exam)
    return exam


@router.put("/{id}", response_model=ExamPublic)
def update_exam(
    *,
    session: SessionDep,
    id: uuid.UUID,
    exam_in: ExamUpdate,
) -> Any:
    """
    Update an exam.
    """
    exam = session.get(Exam, id)
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    if exam_in.question_groups is not None:
        question_groups = session.exec(
            select(QuestionGroup)
            .where(col(QuestionGroup.id).in_(exam_in.question_groups))
        ).all()
        exam.question_groups = cast(List, question_groups)
    update_dict = exam_in.model_dump(exclude_unset=True)
    exam.sqlmodel_update(update_dict)
    session.add(exam)
    session.commit()
    session.refresh(exam)
    return exam


@router.delete("/{id}")
def delete_exam(
    session: SessionDep, id: uuid.UUID
) -> Message:
    """
    Delete an exam.
    """
    exam = session.get(Exam, id)
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    session.delete(exam)
    session.commit()
    return Message(message="Exam deleted successfully")


@router.post("/{id}/question_groups", response_model=ExamPublic)
def add_exam_question_group(
    session: SessionDep,
    id: uuid.UUID,
    part_in: PartCreate
) -> Any:
    exam = session.get(Exam, id)
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    part = Part.model_validate(dict(**part_in.model_dump(), exam_id=exam.id))
    exam.parts.append(part)
    session.commit()
    session.refresh(exam)
    return exam


@router.put("/{id}/question_groups", response_model=ExamPublic)
def update_exam_question_groups(
    session: SessionDep,
    id: uuid.UUID,
    parts_in: List[PartCreate]
) -> Any:
    exam = session.get(Exam, id)
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    parts = [Part.model_validate(dict(**part_in.model_dump(), exam_id=exam.id))
             for part_in in parts_in]
    exam.parts = parts
    session.commit()
    session.refresh(exam)
    return exam


@router.delete("/{id}/question_groups/{question_group_id}", response_model=ExamPublic)
def delete_exam_question_group(
    session: SessionDep,
    id: uuid.UUID,
    question_group_id: uuid.UUID
) -> Any:
    exam = session.get(Exam, id)
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    part = next(
        part for part in exam.parts if part.question_group_id == question_group_id)
    exam.parts.remove(part)
    session.commit()
    session.refresh(exam)
    return exam
