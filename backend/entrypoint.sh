#!/usr/bin/env/
if [ ! -z "$PREFECT_API_KEY" ]; then
	prefect cloud login --key "$PREFECT_API_KEY" --workspace "$PREFECT_WORKSPACE" || true
fi

fastapi run --workers 4 app/main.py

