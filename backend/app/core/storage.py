from minio import Minio
from .config import settings

def init_storage():
    client = Minio(
        settings.MINIO_ENDPOINT,
        access_key=settings.MINIO_KEY,
        secret_key=settings.MINIO_SECRET,
        secure=settings.ENVIRONMENT != "local"
    )
    if not client.bucket_exists("vrun"):
        client.make_bucket("vrun")
        client.set_bucket_policy("vrun", "download")
