from fastapi import APIRouter

from app.api.routes import login, utils, admin, me


api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
api_router.include_router(admin.admin_router, prefix="/admin")
api_router.include_router(me.router, prefix="/me", tags=["me"])
