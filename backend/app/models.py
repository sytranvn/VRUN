import uuid
from typing import List
from datetime import datetime, timezone
from enum import StrEnum
from pydantic import EmailStr
from sqlalchemy.exc import SQLAlchemyError
from sqlmodel import Column, Field, ForeignKeyConstraint, Relationship, SQLModel, Enum, UniqueConstraint


class BaseTable:
    created_time: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc))
    updated_time: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        nullable=False,
        sa_column_kwargs={
            "onupdate": lambda: datetime.now(timezone.utc),
        },
    )


# Shared properties
class Role(StrEnum):
    CANDIDATE = "CANDIDATE"
    EXAMINER = "EXAMINER"


class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    is_superuser: bool = False
    role: Role = Field(default=Role.CANDIDATE.value,  sa_column=Column(Enum(Role, native_enum=False)))
    full_name: str | None = Field(default=None, max_length=255)


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


# Database model, database table inferred from class name
class User(BaseTable, UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str
    candidate_exams: list["CandidateExam"] = Relationship(back_populates="candidate")


# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: uuid.UUID


class UsersPublic(SQLModel):
    data: list[UserPublic]
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


# NOTE: Add new model here

class ExamStatus(StrEnum):
    DRAFT   = "DRAFT"
    SUBMITTED = "SUBMITTED"
    DELETED = "DELETED"



class CandidateExamStatus(StrEnum):
    REGISTERED = "REGISTERED"
    SCHEDULED  = "SCHEDULED"
    STARTED    = "STARTED"
    ENDED      = "ENDED"


# NOTE: WIP, do not use
class CandidateExam(BaseTable, SQLModel, table=True):
    __tablename__ = "candidate_exam"  # type: ignore
    candidate_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE", primary_key=True
    )
    exam_id: uuid.UUID = Field(
        foreign_key="exam.id", nullable=False, ondelete="CASCADE", primary_key=True
    )
    start_time: datetime
    duration: int  = Field(default=120)  # minutes
    start_time: datetime
    duration: int  = Field(default=120)  # minutes
    status: CandidateExamStatus = Field(default=CandidateExamStatus.REGISTERED,
                                        sa_column=Column(Enum(CandidateExamStatus, native_enum=False)))
    candiate: User = Relationship(back_populates="exam_candidates")
    exam: "Exam" = Relationship(back_populates="candidate_exams")

class Exam(BaseTable, SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str = Field(max_length=255)
    description: str

    status: ExamStatus = Field(default=ExamStatus.DRAFT,
                               sa_column=Column(Enum(ExamStatus, native_enum=False)))
    exam_candidates: list[CandidateExam] = Relationship(back_populates="exam")
    skills: list["ExamSkill"] = Relationship(back_populates="exam")

class Skill(StrEnum):
    LISTENING = "LISTENING"
    READING = "READING"
    WRITING = "WRITING "
    SPEAKING = "SPEAKING"


class ExamSkill(BaseTable, SQLModel, table=True):
    __tablename__ = "exam_skill"  # type: ignore
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    skill: Skill = Field(sa_column=Column(Enum(Skill, native_enum=False, length=20)))
    number_of_parts: int
    duration: int
    exam_id: uuid.UUID = Field(
        foreign_key="exam.id", nullable=False, ondelete="CASCADE"
    )
    exam: Exam = Relationship(back_populates="skills")
    parts: List["Part"] = Relationship(back_populates="exam_skill")


class Part(BaseTable, SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    titile: str = Field(max_length=255)
    description: str
    duration: int
    exam_skill_id: uuid.UUID = Field(
        nullable=False, foreign_key="exam_skill.id"
    )
    exam_skill: ExamSkill = Relationship(back_populates="parts")
    question_group_id: uuid.UUID = Field(
        foreign_key="question_group.id", nullable=False, ondelete="CASCADE"
    )
    question_group: "QuestionGroup" = Relationship()



class QuestionGroup(BaseTable, SQLModel, table=True):
    __tablename__ = "question_group"  # type: ignore
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    resource: str
    description: str
    questions: List["Question"]= Relationship(back_populates="question_group")
    part: Part | None = Relationship(back_populates="question_group")

class Question(BaseTable, SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    description: str
    question_group_id : uuid.UUID = Field(
        foreign_key="question_group.id", nullable=False, ondelete="CASCADE"
    )
    question_group: QuestionGroup = Relationship(back_populates="questions")
    answers: List["Answer"] = Relationship(back_populates="question")


class Answer(BaseTable, SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    description: str
    question_id: uuid.UUID = Field(
        foreign_key="question.id", nullable=False, ondelete="CASCADE", primary_key=True
    )
    is_correct_answer: bool = Field(default=False)
    question: Question = Relationship(back_populates="answers")

# NOTE: WIP, do not use
class CandidateExamAnswer(SQLModel, table=True):
    __tablename__ = "candiate_exam_answer"  # type: ignore
    __table_args__ = (
        ForeignKeyConstraint(
            ['candidate_id', 'exam_id'],
            ['candidate_exam.candidate_id', 'candidate_exam.exam_id'],
        ),
    )
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    candidate_id: uuid.UUID
    exam_id: uuid.UUID
    candidate_exam: CandidateExam = Relationship(back_populates="answers")

    part_id: uuid.UUID = Field(
        foreign_key="part.id", nullable=False, ondelete="CASCADE"
    )
    part: Part | None = Relationship(back_populates="candidate_answers")
    question_group_id: uuid.UUID = Field(
        foreign_key="question_group.id", nullable=False, ondelete="CASCADE"
    )
    question_group: QuestionGroup | None = Relationship(back_populates="candidate_answers")
    question_id: uuid.UUID = Field(
        foreign_key="question.id", nullable=False, ondelete="CASCADE"
    )
    question: Question | None = Relationship(back_populates="candidate_answer")


class Configuration(BaseTable, SQLModel, table=True):
    key: str = Field(min_length=2, max_length=30, primary_key=True)
    value: str
    val_type: str
    active: bool = Field(default=True)
