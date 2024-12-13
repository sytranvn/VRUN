import uuid
from typing import List, Optional
from datetime import datetime, timezone
from enum import StrEnum
from pydantic import EmailStr
from sqlalchemy import event
from sqlmodel import DDL, JSON, Column, Field, ForeignKeyConstraint, Relationship, SQLModel, Enum, UniqueConstraint


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
    __tablename__ = "candidate_exam_answer"  # type: ignore
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
    answer: "Answer" = Relationship()


class EssayStatus(StrEnum):
    SUBMITTED = "SUBMITTED"
    ASSESSED = "ASSESSED"

class EssayType(StrEnum):
    SPEAKING = "SPEAKING"
    WRITING = "WRITING"


class CandidateExamEssayBase(SQLModel):
    candidate_exam_id: uuid.UUID
    status: EssayStatus | None = None
    content: str | None = None
    # link to voice record
    resource: str | None = None
    score: float | None = None
    assessment: str | None = None
    score_info: Optional[dict] = None
    assessment_info: Optional[dict] = None


class CandidateExamEssay(CandidateExamEssayBase, table=True):
    __tablename__ = "candidate_exam_essay"  # type: ignore
    id: uuid.UUID | None = Field(
        nullable=False, default_factory=uuid.uuid4, primary_key=True)

    essay_type: EssayType = Field(default=EssayStatus.SUBMITTED,
                                       sa_column=Column(Enum(EssayType, native_enum=False)))
    candidate_exam_id: uuid.UUID = Field(
        foreign_key="candidate_exam.id", nullable=False)
    question_id: uuid.UUID = Field(nullable=False, foreign_key="question.id")
    status: EssayStatus | None = Field(default=EssayStatus.SUBMITTED,
                                       sa_column=Column(Enum(EssayStatus, native_enum=False)))
    score_info: Optional[dict] = Field(default_factory=dict, sa_column=Column(JSON))
    assessment_info: Optional[dict] = Field(default_factory=dict, sa_column=Column(JSON))
    question: "Question" = Relationship()
    candidate_exam: "CandidateExam" = Relationship(back_populates="essays")

trigger = DDL("""
CREATE OR REPLACE FUNCTION update_candidate_exam_score()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.essay_type = 'SPEAKING' THEN
        UPDATE candidate_exam
        SET speaking_score = (
            SELECT score
            FROM candidate_exam_essay
            WHERE candidate_exam_essay.id = NEW.id
            LIMIT 1
        )
        WHERE candidate_exam.id = NEW.candidate_exam_id;
    ELSE
        UPDATE candidate_exam
        SET writing_score = (
            SELECT score
            FROM candidate_exam_essay
            WHERE candidate_exam_essay.id = NEW.id
            LIMIT 1
        )
        WHERE candidate_exam.id = NEW.candidate_exam_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_candidate_exam_score_trigger
AFTER update of status ON candidate_exam_essay
FOR EACH ROW
EXECUTE PROCEDURE update_candidate_exam_score();
""")


event.listen(
    CandidateExamEssay.__table__,  # type: ignore
    'after_create',
    trigger.execute_if(dialect='postgresql')
)


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
    id: uuid.UUID = Field(default_factory=uuid.uuid4,
                          nullable=False, primary_key=True)
    candidate_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE")
    exam_id: uuid.UUID = Field(
        foreign_key="exam.id", nullable=False, ondelete="CASCADE")
    start_time: datetime = Field(nullable=False)
    end_time: datetime | None = Field(nullable=True)
    status: CandidateExamStatus = Field(default=CandidateExamStatus.SCHEDULED,
                                        sa_column=Column(Enum(CandidateExamStatus, native_enum=False)))
    score: float | None = Field(nullable=True)
    listening_score: float | None = Field(nullable=True)
    reading_score: float | None = Field(nullable=True)
    speaking_score: float | None = Field(nullable=True)
    writing_score: float | None = Field(nullable=True)
    exam: "Exam" = Relationship()
    candidate: "User" = Relationship(back_populates="exams")
    selected_answers: List[CandidateExamAnswer] = Relationship()
    essays: List["CandidateExamEssay"] = Relationship()

    @property
    def question_groups(self):
        return [p.question_group for p in self.exam.parts]



trigger_candidate_exam = DDL("""
CREATE OR REPLACE FUNCTION calculate_candidate_exam_score()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.reading_score IS NOT NULL
       AND NEW.listening_score IS NOT NULL
       AND NEW.writing_score IS NOT NULL
       AND NEW.speaking_score IS NOT NULL
    THEN
        UPDATE candidate_exam
        SET score = (
           NEW.reading_score +
           NEW.listening_score +
           NEW.writing_score +
           NEW.speaking_score
        ) / 4,
        status = 'ASSESSED'
        WHERE candidate_exam.id = NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_candidate_exam_score_trigger
AFTER update OF listening_score, writing_score, reading_score, speaking_score
ON candidate_exam
FOR EACH ROW
EXECUTE PROCEDURE calculate_candidate_exam_score();
""")


event.listen(
    CandidateExam.__table__,  # type: ignore
    'after_create',
    trigger_candidate_exam.execute_if(dialect='postgresql')
)


# Shared properties


class Role(StrEnum):
    CANDIDATE = "CANDIDATE"
    EXAMINER = "EXAMINER"


class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    is_superuser: bool = False
    role: Role | None
    full_name: str | None = Field(default=None, max_length=255)


# Database model, database table inferred from class name
class User(BaseTable, UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    role: Role | None = Field(default=Role.CANDIDATE,
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
    parts: List[Part] = Relationship()


class Skill(StrEnum):
    LISTENING = "LISTENING"
    READING = "READING"
    WRITING = "WRITING"
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
    questions: List["Question"] = Relationship(back_populates="question_group",
                                               cascade_delete=True,
                                               sa_relationship_kwargs={
                                                   "cascade": "delete"
                                               },
                                               )
    parts: List[Part] = Relationship(back_populates="question_group")


class QuestionType(StrEnum):
    MULTI_CHOICE = "MULTI_CHOICE"
    ESSAY = "ESSAY"


class QuestionBase(SQLModel):
    description: str


class Question(BaseTable, QuestionBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4,
                          primary_key=True, unique=True)
    question_group_id: uuid.UUID = Field(
        foreign_key="question_group.id", nullable=False, ondelete="CASCADE", primary_key=True
    )
    question_group: QuestionGroup = Relationship(back_populates="questions")
    answers: List["Answer"] = Relationship(back_populates="question",
                                           sa_relationship_kwargs={
                                               "cascade": "delete"
                                           })


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
