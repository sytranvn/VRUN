from fastapi import APIRouter

from app.api.routes import login, users, utils, exams, question_groups, questions

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(exams.router, prefix="/exams", tags=["exams"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(question_groups.router, prefix="/question_groups", tags=["question_groups"])
api_router.include_router(questions.router, prefix="/questions", tags=["questions"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
