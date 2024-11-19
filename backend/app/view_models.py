from datetime import datetime, timedelta, timezone
from typing import List
import uuid

from pydantic import BaseModel, EmailStr, SerializationInfo, field_serializer, field_validator, validator
from pydantic.fields import computed_field
from sqlmodel import Field, SQLModel


from .models import (
    AnswerBase,
    CandidateExam,
    CandidateExamStatus,
    ExamBase,
    ExamStatus,
    Part,
    QuestionBase,
    QuestionGroupBase,
    QuestionStatusEnum,
    UserBase,
    Skill
)

# Properties to receive via API on creation
context = None


def get_context():
    from app.api.deps import get_minio_client
    return {
        "minio": get_minio_client(),
        "bucket": "vrun"
    }


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


class CandidateExamRegister(BaseModel):
    start_time: datetime

    @field_validator('start_time')
    @classmethod
    def validate_date(cls, v):
        if v < datetime.now(tz=timezone.utc):
            raise AssertionError("Start time must be in future")
        return v


class ExamUpdate(SQLModel):
    title: str | None = Field(max_length=255)  # type: ignore
    description: str | None  # type: ignore
    status: ExamStatus | None
    question_groups: List[uuid.UUID]


class ExamPublic(ExamBase):
    id: uuid.UUID
    status: ExamStatus
    parts: List["PartPublic"]


class PartCreate(SQLModel):
    question_group_id: uuid.UUID
    order: int


class PartPublic(SQLModel):
    order: int
    question_group: "QuestionGroupPublic"

class ExamQuestionGroupCreate(SQLModel):
    question_group_id: uuid.UUID
    order: int


class ExamReadonly(ExamBase):
    id: uuid.UUID
    # TODO: this part only visible when take exam
    parts: List["PartReadonly"]


class ExamStarted(ExamBase):
    id: uuid.UUID
    # parts: List["PartStarted"]

class ExamFinished(ExamBase):
    id: uuid.UUID
    # parts: List["PartFinished"]


class PartReadonly(SQLModel):
    order: int
    question_group: "QuestionGroupReadonly"


class RegisteredExam(SQLModel):
    id: uuid.UUID
    # TODO: this part only visible when take exam
    # question_groups: List["QuestionGroupReadonly"]
    status: CandidateExamStatus
    exam: "ExamReadonly"


class RegisteredExams(SQLModel):
    data: List[RegisteredExam]
    count: int


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

    @field_serializer('resource')
    def presign_url(self, v: str, _info: SerializationInfo):
        if not v:
            return v
        global context
        if context is None:
            context = get_context()
        minio = context["minio"]
        mybucket = context["bucket"]
        return minio.get_presigned_url(
            "GET",
            mybucket,
            v,
            expires=timedelta(days=1)
        )


class QuestionGroupReadonly(QuestionGroupBase):
    duration: int
    skill: Skill

    @field_serializer('resource')
    @classmethod
    def hidden(cls, v):
        return None


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
