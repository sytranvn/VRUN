import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from fastapi.exceptions import ValidationException

from app.api.deps import SessionDep
from app.models import Answer, Question, QuestionGroup

from app.view_models import (
    AnswerCreate,
    QuestionCreate,
    QuestionPublic,
    QuestionsPublic,
    QuestionUpdate,
    Message
)

router = APIRouter()


@router.get("/", response_model=QuestionsPublic)
def read_questions(
    session: SessionDep,
    question_group_id: uuid.UUID,
) -> Any:
    """
    Retrieve questions.
    """
    question_group = session.get(QuestionGroup, question_group_id)
    count = len(question_group.questions)

    return QuestionsPublic(data=question_group.questions, count=count)  # type: ignore


@router.get("/{id}", response_model=QuestionPublic)
def read_question(
    session: SessionDep,
    question_group_id: uuid.UUID,
    id: uuid.UUID
) -> Any:
    """
    Get question by ID.
    """
    question = session.get(Question, {"question_group_id": question_group_id, "id": id})
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    return question


@router.post("/", response_model=QuestionPublic)
def create_question(
    *, session: SessionDep, question_in: QuestionCreate,
    question_group_id: uuid.UUID,
) -> Any:
    """
    Create new question.
    """
    question_group = session.get(QuestionGroup, question_group_id)
    if question_group is None:
        raise HTTPException(status_code=404, detail="Question group not found")
    answers = [AnswerCreate.model_validate(ans) for ans in question_in.answers]
    if sum(ans.is_correct_answer for ans in answers) > 1:
        raise ValidationException(errors=["Can't have multiple correct answers"])
    del question_in.answers
    question = Question.model_validate({**question_in.model_dump(), "question_group_id": question_group.id})
    session.add(question)
    session.commit()
    session.refresh(question)
    for ans in answers:
        ans = Answer.model_validate({**ans.model_dump(), "question_id": question.id})
        question.answers.append(ans)
    session.commit()
    return question


@router.put("/{id}", response_model=QuestionPublic)
def update_question(
    *,
    session: SessionDep,
    question_group_id: uuid.UUID,
    id: uuid.UUID,
    question_in: QuestionUpdate,
) -> Any:
    """
    Update an question.
    """
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
    session: SessionDep,
    question_group_id: uuid.UUID,
    id: uuid.UUID
) -> Message:
    """
    Delete an question.
    """
    question = session.get(Question, {"question_group_id": question_group_id, "id": id})
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    session.delete(question)
    session.commit()
    return Message(message="Question deleted successfully")
