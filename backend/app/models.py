import uuid
from typing import List
from datetime import datetime, timezone
from enum import StrEnum
from pydantic import EmailStr
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


class AnswerStatus(StrEnum):
    DRAFT = "DRAFT"
    SUBMITED = "SUBMITED"


class ExamStatus(StrEnum):
    DRAFT = "DRAFT"
    ACTIVE = "ACTIVE"


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
    answer: "Answer" = Relationship()


class CandidateExamEssay(SQLModel, table=True):
    __tablename__ = "candiate_exam_essay"  # type: ignore
    id: uuid.UUID | None = Field(nullable=False, default_factory=uuid.uuid4, primary_key=True)
    candidate_exam_id: uuid.UUID = Field(foreign_key="candidate_exam.id", nullable=False)
    question_id: uuid.UUID = Field(nullable=False, foreign_key="question.id")
    status: AnswerStatus | None = Field(default=AnswerStatus.DRAFT,
                                        sa_column=Column(Enum(AnswerStatus, native_enum=False)))
    content: str | None = Field(nullable=True)
    # link to voice record
    resource: str | None = Field(nullable=True)
    score: float | None = Field(nullable=True)
    assessment: str | None = Field(nullable=True)

    question: "Question" = Relationship()
    candidate_exam: "CandidateExam" = Relationship(back_populates="essays")


class CandidateExamStatus(StrEnum):
    SCHEDULED = "SCHEDULED"
    STARTED = "STARTED"
    FINISHED = "FINISHED"
    ASSESSED = "ASSESSED"
    CANCELED = "CANCELED"


class CandidateExam(BaseTable, SQLModel, table=True):
    __tablename__ = "candidate_exam"  # type: ignore
    __tableargs__ = (
        UniqueConstraint("candidate_id", "exam_id"),
    )
    id: uuid.UUID = Field(default_factory=uuid.uuid4, nullable=False, primary_key=True)
    candidate_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE")
    exam_id: uuid.UUID = Field(
        foreign_key="exam.id", nullable=False, ondelete="CASCADE")
    start_time: datetime = Field(nullable=False)
    end_time: datetime | None = Field(nullable=True)
    status: CandidateExamStatus = Field(default=CandidateExamStatus.SCHEDULED,
                                        sa_column=Column(Enum(CandidateExamStatus, native_enum=False)))
    exam: "Exam" = Relationship()
    candidate: "User" = Relationship(back_populates="exams")
    selected_answers: List[CandidateExamAnswer] = Relationship()
    essays: List["CandidateExamEssay"] = Relationship()

    @property
    def question_groups(self):
        return [p.question_group for p in self.exam.parts]

# Shared properties


class Role(StrEnum):
    CANDIDATE = "CANDIDATE"
    EXAMINER = "EXAMINER"


class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    is_superuser: bool = False
    role: Role = Field(default=Role.CANDIDATE)
    full_name: str | None = Field(default=None, max_length=255)


# Database model, database table inferred from class name
class User(BaseTable, UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    role: Role = Field(default=Role.CANDIDATE,
                       sa_column=Column(Enum(Role, native_enum=False)))

    hashed_password: str
    exams: List["CandidateExam"] = Relationship()


class Part(BaseTable, SQLModel, table=True):
    __tableargs__ = (
        UniqueConstraint("exam_id", "order"),
    )
    question_group_id: uuid.UUID = Field(
        foreign_key="question_group.id", nullable=False, ondelete="CASCADE", primary_key=True
    )
    exam_id: uuid.UUID = Field(
        foreign_key="exam.id", nullable=False, ondelete="CASCADE", primary_key=True
    )
    order: int
    question_group: "QuestionGroup" = Relationship()
    exam: "Exam" = Relationship(back_populates="parts")





class ExamBase(SQLModel):
    title: str = Field(max_length=255)
    description: str


class Exam(BaseTable, ExamBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    status: ExamStatus = Field(default=ExamStatus.DRAFT.value,
                               sa_column=Column(Enum(ExamStatus, native_enum=False)))
    parts: List[Part ]= Relationship()


class Skill(StrEnum):
    LISTENING = "LISTENING"
    READING = "READING"
    WRITING = "WRITING "
    SPEAKING = "SPEAKING"


class QuestionStatusEnum(StrEnum):
    DRAFT = "DRAFT"
    ACTIVE = "ACTIVE"


class QuestionGroupBase(SQLModel):
    description: str
    resource: str | None
    skill: Skill
    duration: int


class QuestionGroup(BaseTable, QuestionGroupBase, table=True):
    __tablename__ = "question_group"  # type: ignore
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    skill: Skill = Field(default=Skill.LISTENING,
                         sa_column=Column(Enum(Skill, native_enum=False)))
    status: QuestionStatusEnum = Field(default=QuestionStatusEnum.DRAFT,
                                       sa_column=Column(
                                           Enum(QuestionStatusEnum,
                                                native_enum=False)))
    questions: List["Question"] = Relationship(back_populates="question_group")
    # exams: List["Exam"] = Relationship(back_populates="question_groups", link_model=Part)
    part: Part = Relationship(back_populates="question_group")


class QuestionType(StrEnum):
    MULTI_CHOICE = "MULTI_CHOICE"
    ESSAY = "ESSAY"


class QuestionBase(SQLModel):
    description: str


class Question(BaseTable, QuestionBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, unique=True)
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



class Configuration(BaseTable, SQLModel, table=True):
    key: str = Field(min_length=2, max_length=30, primary_key=True)
    value: str
    val_type: str
    active: bool = Field(default=True)
