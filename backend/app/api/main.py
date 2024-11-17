from fastapi import APIRouter

from app.api.routes import login, utils, admin, me, exams, registered_exams


api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
api_router.include_router(admin.admin_router, prefix="/admin")
api_router.include_router(me.router, prefix="/me", tags=["me"])
api_router.include_router(exams.router, prefix="/exams", tags=["candidate"])
api_router.include_router(registered_exams.router, prefix="/registered_exams",
                          tags=["candidate"])
