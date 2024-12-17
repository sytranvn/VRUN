from sqlmodel import Session, create_engine, select
import logging
from app import crud
from app.core.config import settings
from app.core.seed import insert_seed_data
from app.models import Role, User
from app.view_models import UserCreate

engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))


# make sure all SQLModel models are imported (app.models) before initializing DB
# otherwise, SQLModel might fail to initialize relationships properly
# for more details: https://github.com/fastapi/full-stack-fastapi-template/issues/28

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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
        logger.info(f"Created first user {user.email}")
        if settings.ENVIRONMENT == "local":
            for i in range(1, 21):
                insert_seed_data(session, i)
