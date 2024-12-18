FROM python:3.11

ENV PYTHONUNBUFFERED=1

WORKDIR /app/

RUN pip install -U pdm
# disable update check
ENV PDM_CHECK_UPDATE=false
# copy files
COPY pyproject.toml pdm.lock README.md /app/
# Place executables in the environment at the front of the path
# Ref: https://docs.astral.sh/uv/guides/integration/docker/#using-the-environment
ENV PATH="/app/.venv/bin:$PATH"
RUN pdm install --check --prod --no-editable

#ENV PYTHONPATH=/app

COPY ./scripts /app/scripts

COPY ./pyproject.toml ./pdm.lock ./alembic.ini ./entrypoint.sh /app/

COPY ./app /app/app
ADD ./entrypoint.sh /app/entrypoint.sh

RUN chmod +x /app/entrypoint.sh

ENV PYTHONPATH=/app

COPY ./app/tests/files/real.mp3 ./app/tests/files/real.mp3

CMD ["bash", "/app/entrypoint.sh"]


