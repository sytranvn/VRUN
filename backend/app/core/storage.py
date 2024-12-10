from minio import Minio, S3Error
from .config import settings

def init_storage():
    client = Minio(
        settings.MINIO_ENDPOINT,
        access_key=settings.MINIO_KEY,
        secret_key=settings.MINIO_SECRET,
        secure=settings.ENVIRONMENT != "local"
    )
    if not client.bucket_exists("vrun"):
        try:
            client.make_bucket("vrun")
        except S3Error as e:
            if e.code == 'BucketAlreadyOwnedByYou':
                # when start multiple workers, we can call make multiple calls at the same time
                pass
            else:
                raise
        client.fput_object("vrun", "dummy.mp3", "app/tests/files/real.mp3")
