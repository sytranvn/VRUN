import uuid
from typing import List, Literal, Sequence
from datetime import datetime, timezone
from enum import StrEnum
from pydantic import EmailStr
from sqlmodel import Column, Field, ForeignKey, ForeignKeyConstraint, Relationship, SQLModel, Enum, UniqueConstraint


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


class AnswerStatus(StrEnum):
    DRAFT = "DRAFT"
    SUBMITED = "SUBMITED"


class CandidateExamAnswer(SQLModel, table=True):
    __tablename__ = "candiate_exam_answer"  # type: ignore
    __table_args__ = (
        ForeignKeyConstraint(
            ['question_id', 'answer_id'],
            ['answer.question_id', 'answer.id'],
            ondelete="CASCADE"
        ),
    )
    candidate_exam_id: uuid.UUID = Field(
        nullable=False, primary_key=True, foreign_key="candidate_exam.id", ondelete="CASCADE")
    question_id: uuid.UUID = Field(nullable=False, primary_key=True)
    answer_id: uuid.UUID = Field(nullable=False, primary_key=True)
    status: AnswerStatus = Field(
        default=AnswerStatus.DRAFT,
        sa_column=Column(Enum(AnswerStatus, native_enum=False))
    )


class CandidateExamStatus(StrEnum):
    SCHEDULED = "SCHEDULED"
    STARTED = "STARTED"
    FINISHED = "FINISHED"
    CANCELED = "CANCELED"


class CandidateExam(BaseTable, SQLModel, table=True):
    __tablename__ = "candidate_exam"  # type: ignore
    id: uuid.UUID = Field(nullable=False, primary_key=True)
    candidate_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE")
    exam_id: uuid.UUID = Field(
        foreign_key="exam.id", nullable=False, ondelete="CASCADE")
    start_time: datetime
    duration: int = Field(default=120)  # minutes
    start_time: datetime
    duration: int = Field(default=120)  # minutes
    status: CandidateExamStatus = Field(default=CandidateExamStatus.SCHEDULED,
                                        sa_column=Column(Enum(CandidateExamStatus, native_enum=False)))

# Shared properties


class Role(StrEnum):
    CANDIDATE = "CANDIDATE"
    EXAMINER = "EXAMINER"


class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    is_superuser: bool = False
    role: Role = Field(default=Role.CANDIDATE,
                       sa_column=Column(Enum(Role, native_enum=False)))
    full_name: str | None = Field(default=None, max_length=255)


# Database model, database table inferred from class name
class User(BaseTable, UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str
    exams: List["Exam"] = Relationship(link_model=CandidateExam)


class Part(BaseTable, SQLModel, table=True):
    question_group_id: uuid.UUID = Field(
        foreign_key="question_group.id", nullable=False, ondelete="CASCADE", primary_key=True
    )
    exam_id: uuid.UUID = Field(
        foreign_key="exam.id", nullable=False, ondelete="CASCADE", primary_key=True
    )


class ExamStatus(StrEnum):
    DRAFT = "DRAFT"
    SUBMITTED = "SUBMITTED"


class ExamBase(SQLModel):
    title: str = Field(max_length=255)
    description: str


class Exam(BaseTable, ExamBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    status: ExamStatus = Field(default=ExamStatus.DRAFT.value,
                               sa_column=Column(Enum(ExamStatus, native_enum=False)))
    exam_candidates: List[User] = Relationship(
        back_populates="exams", link_model=CandidateExam)
    question_groups: List["QuestionGroup"] = Relationship(
        back_populates="exams", link_model=Part)


class Skill(StrEnum):
    LISTENING = "LISTENING"
    READING = "READING"
    WRITING = "WRITING "
    SPEAKING = "SPEAKING"


class QuestionStatusEnum(StrEnum):
    DRAFT = "DRAFT"
    ACTIVE = "ACTIVE"


class QuestionGroupBase(SQLModel):
    resource: str
    description: str
    skill: Skill
    duration: int


class QuestionGroup(BaseTable, QuestionGroupBase, table=True):
    __tablename__ = "question_group"  # type: ignore
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    skill: Skill = Field(default=Skill.LISTENING,
                         sa_column=Column(Enum(Skill, native_enum=False)))
    status: QuestionStatusEnum = Field(default=QuestionStatusEnum.DRAFT,
                                       sa_column=Column(Enum(QuestionStatusEnum, native_enum=False)))
    questions: List["Question"] = Relationship(back_populates="question_group")
    exams: List["Exam"] = Relationship(
        back_populates="question_groups", link_model=Part)


class QuestionType(StrEnum):
    MULTI_CHOICE = "MULTI_CHOICE"
    ESSAY = "ESSAY"


class QuestionBase(SQLModel):
    description: str


class Question(BaseTable, QuestionBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    question_group_id: uuid.UUID = Field(
        foreign_key="question_group.id", nullable=False, ondelete="CASCADE", primary_key=True
    )
    question_group: QuestionGroup = Relationship(back_populates="questions")
    answers: List["Answer"] = Relationship(back_populates="question")


class AnswerBase(SQLModel):
    description: str


class Answer(BaseTable, AnswerBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    question_id: uuid.UUID = Field(
        foreign_key="question.id", nullable=False, ondelete="CASCADE", primary_key=True
    )
    is_correct_answer: bool = Field(default=False)
    question: Question = Relationship(back_populates="answers")


class EssaySkill(StrEnum):
    WRITING = Skill.WRITING.value
    SPEAKING = Skill.SPEAKING.value


class CandidateExamEssay(SQLModel, table=True):
    __tablename__ = "candiate_exam_essay"  # type: ignore
    candidate_exam_id: uuid.UUID = Field(
        nullable=False, primary_key=True, foreign_key="candidate_exam.id", ondelete="CASCADE")
    question_id: uuid.UUID = Field(
        nullable=False, primary_key=True, foreign_key="question.id")
    skill: EssaySkill = Field(
        default=EssaySkill.WRITING,
        sa_column=Column(Enum(EssaySkill, native_enum=False)),
    )
    status: AnswerStatus = Field(default=AnswerStatus.DRAFT,
                                 sa_column=Column(Enum(AnswerStatus, native_enum=False)))
    content: str = Field(nullable=True)
    # link to voice record
    resource: str = Field(nullable=True)
    score: float = Field(nullable=True)


class Configuration(BaseTable, SQLModel, table=True):
    key: str = Field(min_length=2, max_length=30, primary_key=True)
    value: str
    val_type: str
    active: bool = Field(default=True)
