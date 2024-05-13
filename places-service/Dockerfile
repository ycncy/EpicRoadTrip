FROM python:3.10-slim-buster AS base

WORKDIR /places-service

RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    build-essential \
    python3-tk \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .