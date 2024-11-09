import uuid
from typing import Any, List

from fastapi import APIRouter, HTTPException
from fastapi.exceptions import ValidationException

from app.api.deps import SessionDep
from app.models import Answer, Question

from app.view_models import (
    AnswerCreate,
    AnswerPublic,
    AnswerUpdate,
    Message
)

router = APIRouter()


@router.get("/", response_model=List[AnswerPublic])
def read_answers(
    session: SessionDep,
    question_group_id: uuid.UUID,
    question_id: uuid.UUID,
) -> Any:
    """
    Retrieve questions.
    """
    question = session.get(
        Question, {"question_group_id": question_group_id, "id": question_id})
    if not question:
        raise HTTPException(status_code=404, detail="Not found")

    return question.answers


@router.get("/{id}", response_model=AnswerPublic)
def read_answer(
    session: SessionDep,
    question_group_id: uuid.UUID,
    question_id: uuid.UUID,
    id: uuid.UUID
) -> Any:
    """
    Get answer by ID.
    """
    answer = session.get(Answer, {"question_id": question_id, "id": id})
    if not answer or answer.question.question_group_id != question_group_id:
        raise HTTPException(status_code=404, detail="Answer not found")
    return answer


@router.post("/", response_model=AnswerPublic)
def create_answer(
    *, session: SessionDep, answer_in: AnswerCreate,
    question_group_id: uuid.UUID,
    question_id: uuid.UUID,
) -> Any:
    """
    Create new answer.
    """
    question = session.get(
        Question, {"question_group_id": question_group_id, "id": question_id})
    if question is None:
        raise HTTPException(status_code=404, detail="Answer group not found")

    answer = Answer.model_validate(
        {**answer_in.model_dump(), "question_id": question.id})
    question.answers.append(answer)
    if sum(ans.is_correct_answer for ans in question.answers) > 1:
        raise ValidationException(["Can't have multiple correct answers."])
    session.commit()
    session.refresh(answer)
    return answer


@router.put("/{id}", response_model=AnswerPublic)
def update_answer(
    *,
    session: SessionDep,
    question_group_id: uuid.UUID,
    question_id: uuid.UUID,
    id: uuid.UUID,
    answer_in: AnswerUpdate,
) -> Any:
    """
    Update an answer.
    """
    answer = session.get(Answer, {"question_id": question_id, "id": id})
    if answer is None or answer.question.question_group_id != question_group_id:
        raise HTTPException(status_code=404, detail="Answer not found")
    update_dict = answer_in.model_dump(exclude_unset=True)
    if answer.is_correct_answer:
        prev_correct_answer = next(
            (ans for ans in answer.question.answers if ans.is_correct_answer), None)
        if prev_correct_answer and prev_correct_answer.id != answer.id:
            raise ValidationException(["Can't have multiple correct answers."])
    answer.sqlmodel_update(update_dict)
    session.add(answer)
    session.commit()
    session.refresh(answer)
    return answer


@router.delete("/{id}")
def delete_answer(
    session: SessionDep,
    question_group_id: uuid.UUID,
    question_id: uuid.UUID,
    id: uuid.UUID
) -> Message:
    """
    Delete an answer.
    """
    answer = session.get(Answer, {"question_id": question_id, "id": id})
    if not answer or answer.question.question_group_id != question_group_id:
        raise HTTPException(status_code=404, detail="Answer not found")
    session.delete(answer)
    session.commit()
    return Message(message="Answer deleted successfully")
