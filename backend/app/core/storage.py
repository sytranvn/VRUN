from minio import S3Error

from app.api.deps import get_minio_client


def init_storage():
    client = get_minio_client()
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
