from fastapi import APIRouter, Depends

from app.api.deps import (
    get_current_active_superuser,
)
from fastapi import APIRouter

from . import exams, question_groups, questions, users

admin_router = APIRouter(
    dependencies=[Depends(get_current_active_superuser)],
)
admin_router.include_router(exams.router, prefix="/exams", tags=["exams"])
admin_router.include_router(users.router, prefix="/users", tags=["users"])
admin_router.include_router(question_groups.router, prefix="/question_groups", tags=["question_groups"])
admin_router.include_router(questions.router, prefix="/questions", tags=["question_groups"])
