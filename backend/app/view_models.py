from typing import List
import uuid

from pydantic import EmailStr
from sqlmodel import Field, SQLModel

from .models import (
    AnswerBase,
    CandidateExamStatus,
    ExamBase,
    ExamStatus,
    Part,
    QuestionBase,
    QuestionGroupBase,
    QuestionStatusEnum,
    UserBase,
)

# Properties to receive via API on creation


class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)


class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=40)
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on update, all are optional
class UserUpdate(UserBase):
    email: EmailStr | None = Field(  # type: ignore
        default=None, max_length=255)
    password: str | None = Field(default=None, min_length=8, max_length=40)


class UserUpdateMe(UserBase):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(  # type: ignore
        default=None, max_length=255)


class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)


# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: uuid.UUID


class UsersPublic(SQLModel):
    data: List[UserPublic]
    count: int

# Generic message


class Message(SQLModel):
    message: str


# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: str | None = None


class NewPassword(SQLModel):
    token: str
    new_password: str = Field(min_length=8, max_length=40)


class ExamCreate(ExamBase):
    pass


class ExamUpdate(SQLModel):
    title: str | None = Field(max_length=255)  # type: ignore
    description: str | None  # type: ignore
    status: ExamStatus | None
    question_groups: List[uuid.UUID]


class ExamPublic(ExamBase):
    id: uuid.UUID
    status: ExamStatus
    question_groups: List["QuestionGroupPublic"]

class ExamQuestionGroupCreate(SQLModel):
    question_group_id: uuid.UUID
    order: int


class ExamReadonly(ExamBase):
    id: uuid.UUID
    # TODO: this part only visible when take exam
    question_groups: List["QuestionGroupReadonly"]

class RegisteredExam(ExamBase):
    id: uuid.UUID
    # TODO: this part only visible when take exam
    question_groups: List["QuestionGroupReadonly"]
    status: CandidateExamStatus


class ExamsPublic(SQLModel):
    data: List[ExamPublic]
    count: int


class ExamsReadonly(SQLModel):
    data: List[ExamReadonly]
    count: int


class QuestionGroupCreate(QuestionGroupBase):
    pass


class QuestionGroupUpdate(QuestionGroupBase):
    id: uuid.UUID
    status: QuestionStatusEnum | None


class QuestionGroupPublic(QuestionGroupBase):
    id: uuid.UUID
    questions: List["QuestionPublic"]


class QuestionGroupReadonly(QuestionGroupBase):
    id: uuid.UUID
    questions: List["QuestionReadonly"]


class QuestionGroupsPublic(SQLModel):
    data: List[QuestionGroupPublic]
    count: int


class QuestionCreate(QuestionBase):
    answers: List["AnswerCreate"]


class QuestionUpdate(QuestionBase):
    id: uuid.UUID | None
    description: str | None  # type: ignore


class QuestionPublic(QuestionBase):
    id: uuid.UUID
    answers: List["AnswerPublic"]


class QuestionReadonly(QuestionBase):
    id: uuid.UUID
    answers: List["AnswerReadonly"]


class QuestionsPublic(SQLModel):
    data: List[QuestionPublic]
    count: int


class AnswerPublic(AnswerBase):
    id: uuid.UUID
    is_correct_answer: bool


class AnswerReadonly(AnswerBase):
    id: uuid.UUID


class AnswerCreate(AnswerBase):
    is_correct_answer: bool


class AnswerUpdate(AnswerBase):
    id: uuid.UUID
    description: str | None  # type: ignore
    is_correct_answer: bool
