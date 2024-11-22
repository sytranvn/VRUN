from fastapi import APIRouter, Depends

from app.api.deps import (
    get_current_active_superuser,
)

from . import exams, question_groups, questions, users, answers

admin_router = APIRouter(
    dependencies=[Depends(get_current_active_superuser)],
    tags=["admin"]
)
admin_router.include_router(exams.router, prefix="/exams")
admin_router.include_router(users.router, prefix="/users")
questions.router.include_router(
    answers.router,
    prefix="/{question_id}/answers"
)
question_groups.router.include_router(
    questions.router,
    prefix="/{question_group_id}/questions"
)
admin_router.include_router(
    question_groups.router,
    prefix="/question_groups"
)
