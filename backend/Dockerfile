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

COPY ./pyproject.toml ./pdm.lock ./alembic.ini /app/

COPY ./app /app/app

CMD ["fastapi", "run", "--workers", "4", "app/main.py"]
