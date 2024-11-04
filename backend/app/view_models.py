import uuid
from typing import Sequence
from .models import UserBase, ExamBase, ExamStatus, QuestionGroupBase, QuestionBase
from pydantic import EmailStr
from sqlmodel import Field, SQLModel

# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)


class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=40)
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on update, all are optional
class UserUpdate(UserBase):
    email: EmailStr | None = Field(default=None, max_length=255)  # type: ignore
    password: str | None = Field(default=None, min_length=8, max_length=40)


class UserUpdateMe(UserBase):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)  # type: ignore


class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)


# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: uuid.UUID


class UsersPublic(SQLModel):
    data: Sequence[UserPublic]
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

class ExamUpdate(ExamBase):
    title: str | None = Field(max_length=255)  # type: ignore
    description: str | None  # type: ignore
    status: ExamStatus

class ExamPublic(ExamBase):
    id: uuid.UUID
    status: ExamStatus

class ExamsPublic(SQLModel):
    data: Sequence[ExamPublic]
    count: int


class QuestionGroupCreate(QuestionGroupBase):
    pass

class QuestionGroupUpdate(QuestionGroupBase):
    id: uuid.UUID

class QuestionGroupPublic(QuestionGroupBase):
    id: uuid.UUID


class QuestionGroupsPublic(SQLModel):
    data: Sequence[QuestionGroupPublic]
    count: int



class QuestionCreate(QuestionBase):
    question_group_id: uuid.UUID


class QuestionUpdate(QuestionBase):
    id: uuid.UUID
    description: str | None  # type: ignore

class QuestionPublic(QuestionBase):
    id: uuid.UUID


class QuestionsPublic(SQLModel):
    data: Sequence[QuestionPublic]
    count: int

