from sqlmodel import Session, create_engine, select

from app import crud
from app.core.config import settings
from app.models import Answer, Exam, ExamStatus, Part, Question, QuestionGroup, Role, Skill, User
from app.view_models import ExamCreate, UserCreate

engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))


# make sure all SQLModel models are imported (app.models) before initializing DB
# otherwise, SQLModel might fail to initialize relationships properly
# for more details: https://github.com/fastapi/full-stack-fastapi-template/issues/28


def init_db(session: Session) -> None:
    # Tables should be created with Alembic migrations
    # But if you don't want to use migrations, create
    # the tables un-commenting the next lines
    from sqlmodel import SQLModel

    # This works because the models are already imported and registered from app.models
    SQLModel.metadata.create_all(engine)

    user = session.exec(
        select(User).where(User.email == settings.FIRST_SUPERUSER)
    ).first()
    if not user:
        user_in = UserCreate(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
            role=Role.EXAMINER
        )
        user = crud.create_user(session=session, user_create=user_in)
        if settings.ENVIRONMENT == "local":
            exam = Exam(
                title="Enlish testing",
                description="This is a sample exam"
            )
            session.add(exam)
            session.commit()
            session.refresh(exam)

            question_group = QuestionGroup(
                description="Listening",
                resource=None,
                skill=Skill.LISTENING,
                duration=60,
            )
            session.add(question_group)
            session.commit()
            session.refresh(question_group)

            questions = [
                Question(
                    description=f"This is question {i}", question_group_id=question_group.id)
                for i in range(5)
            ]

            question_group.questions = questions
            session.commit()
            session.refresh(question_group)
            for question in questions:
                question.answers = [
                    Answer(description=f"Option {i}",
                           question_id=question.id,
                           is_correct_answer=i == 3) for i in range(4)]

            exam.parts.append(
                Part(question_group_id=question_group.id,
                     order=0,
                     exam_id=exam.id))
            exam.status = ExamStatus.ACTIVE
            session.commit()
            session.refresh(exam)
