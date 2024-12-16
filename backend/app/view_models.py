from datetime import datetime, timedelta, timezone
from typing import Annotated, List, Union
import uuid
from html.parser import HTMLParser

from pydantic import BaseModel, EmailStr, SerializationInfo, field_serializer, field_validator, model_serializer, model_validator
from sqlmodel import Field, SQLModel


from .models import (
    AnswerBase,
    CandidateExam,
    CandidateExamStatus,
    EssayType,
    ExamBase,
    ExamStatus,
    QuestionBase,
    QuestionGroupBase,
    QuestionStatusEnum,
    UserBase,
    Skill
)

# Properties to receive via API on creation
context = None


class SafeHTMLParser(HTMLParser):
    def handle_starttag(self,
                        tag: str,
                        attrs: list[tuple[str, str | None]]) -> None:
        super().handle_starttag(tag, attrs)
        if tag == "script":
            raise ValueError("Invalid content")


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


class UserUpdateMe(SQLModel):
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
    start_time: datetime | None = Field(default_factory=lambda: datetime.now(
        tz=timezone.utc).replace(second=0, microsecond=0))

    @field_validator('start_time')
    @classmethod
    def validate_date(cls, v: datetime):
        if v < datetime.now(tz=timezone.utc):
            raise AssertionError("Start time must be in future")
        v.replace(second=0, microsecond=0)
        return v


class ExamUpdate(SQLModel):
    title: str | None = Field(max_length=255)  # type: ignore
    description: str | None  # type: ignore
    status: ExamStatus | None


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


class QuestionGroupSubmit(SQLModel):
    id: uuid.UUID
    questions: List["QuestionSubmit"]
    essays: List["EssaySubmit"]


class QuestionSubmit(SQLModel):
    id: uuid.UUID
    answer: uuid.UUID


class EssaySubmit(SQLModel):
    content: str | None
    resource: str | None

    @model_validator(mode='after')
    def check_content_or_resource(self):
        if not self.content and not self.resource:
            raise ValueError("Either content or resource is required")
        return self


class ExamStarted(ExamBase):
    id: uuid.UUID
    parts: List["PartStarted"]


class PartStarted(SQLModel):
    order: int
    question_group: "QuestionGroupStarted"


class QuestionGroupStarted(SQLModel):
    id: uuid.UUID
    questions: List["QuestionStarted"]


class QuestionStarted(SQLModel):
    id: uuid.UUID
    description: str
    answers: List["AnswerReadonly"]


class CandidateExamEssayResult(SQLModel):
    id: uuid.UUID
    question_id: uuid.UUID
    content: str | None
    essay_type: EssayType
    # link to voice record
    resource: str | None
    score: float | None
    assessment: str | None

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


class ExamFinished(SQLModel):
    id: uuid.UUID
    score: float
    listening_score: float
    reading_score: float
    speaking_score: float
    writing_score: float
    selected_answers: List["AnswerIn"]
    essays: List["CandidateExamEssayResult"]


class PartReadonly(SQLModel):
    order: int
    question_group: "QuestionGroupReadonly"


class RegisteredExamPublic(SQLModel):
    id: uuid.UUID
    status: CandidateExamStatus
    start_time: datetime
    end_time: datetime | None
    exam: "ExamPublic"


class RegisteredExamsPublic(SQLModel):
    data: List[RegisteredExamPublic]
    count: int


class ExamsPublic(SQLModel):
    data: List[ExamPublic]
    count: int


class ExamsReadonly(SQLModel):
    data: List[ExamReadonly]
    count: int


class QuestionGroupCreate(QuestionGroupBase):
    @field_validator('description')
    @classmethod
    def safe_html(cls, v: str):
        parser = SafeHTMLParser()
        parser.feed(v)
        return v


class QuestionGroupUpdate(QuestionGroupBase):
    status: QuestionStatusEnum | None


class QuestionGroupPublic(QuestionGroupBase):
    id: uuid.UUID
    questions: List["QuestionPublic"]
    status: QuestionStatusEnum | None

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

    @field_validator('description')
    @classmethod
    def safe_html(cls, v: str):
        parser = SafeHTMLParser()
        parser.feed(v)
        return v


class QuestionUpdate(QuestionBase):
    description: str | None  # type: ignore
    answers: List["AnswerUpdate"] | None = None


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
    id: uuid.UUID | None = None
    description: str | None = None  # type: ignore
    is_correct_answer: bool


class AnswerIn(SQLModel):
    question_id: uuid.UUID
    answer_id: uuid.UUID


class EssayIn(SQLModel):
    question_id: uuid.UUID
    content: str | None

    @field_validator('content')
    @classmethod
    def safe_html(cls, v: str):
        if v:
            parser = SafeHTMLParser()
            parser.feed(v)
        return v


class EssayPublic(SQLModel):
    id: uuid.UUID
    question_id: uuid.UUID
    content: str | None
    resource: str | None

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


class CandidateExamPublic(SQLModel):
    id: uuid.UUID
    candidate_id: uuid.UUID
    exam_id: uuid.UUID
    start_time: datetime
    end_time: datetime
    status: CandidateExamStatus
    score: float | None
    listening_score: float | None
    reading_score: float | None
    speaking_score: float | None
    writing_score: float | None
    # selected_answers: List[AnswerIn]
    # essays: List["EssayIn"]
