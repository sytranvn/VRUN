import uuid
from typing import Any

from fastapi import APIRouter, HTTPException

from app.api.deps import CurrentUser, SessionDep
from app.models import Question, QuestionGroup

from app.view_models import (
    QuestionCreate,
    QuestionPublic,
    QuestionsPublic,
    QuestionUpdate,
    Message
)

router = APIRouter(prefix="/question_groups/{question_group_id}/questions")

router.tags=["admin"]

@router.get("/", response_model=QuestionsPublic)
def read_questions(
    session: SessionDep, current_user: CurrentUser,
    question_group_id: uuid.UUID,
) -> Any:
    """
    Retrieve questions.
    """
    question_group = session.get(QuestionGroup, question_group_id)
    count = len(question_group.questions)

    return QuestionsPublic(data=question_group.questions, count=count)  # type: ignore


@router.get("/{id}", response_model=QuestionPublic)
def read_question(session: SessionDep, current_user: CurrentUser, 
    question_group_id: uuid.UUID,
    id: uuid.UUID) -> Any:
    """
    Get question by ID.
    """
    question = session.get(Question, {"question_group_id": question_group_id, "id": id})
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    return question


@router.post("/", response_model=QuestionPublic)
def create_question(
    *, session: SessionDep, current_user: CurrentUser, question_in: QuestionCreate,
    question_group_id: uuid.UUID,
) -> Any:
    """
    Create new question.
    """
    question_group = session.get(QuestionGroup, question_group_id)
    if question_group is None:
        raise HTTPException(status_code=404, detail="Question not found")
    question = Question.model_validate(question_in)
    question.question_group = question_group
    session.add(question)
    session.commit()
    session.refresh(question)
    return question


@router.put("/{id}", response_model=QuestionPublic)
def update_question(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    question_group_id: uuid.UUID,
    id: uuid.UUID,
    question_in: QuestionUpdate,
) -> Any:
    """
    Update an question.
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    question = session.get(Question, {"question_group_id": question_group_id, "id": id})
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
    session: SessionDep, current_user: CurrentUser, 
    question_group_id: uuid.UUID,
    id: uuid.UUID
) -> Message:
    """
    Delete an question.
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    question = session.get(Question, {"question_group_id": question_group_id, "id": id})
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    session.delete(question)
    session.commit()
    return Message(message="Question deleted successfully")
