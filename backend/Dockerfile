# syntax = docker/dockerfile:experimental
FROM python:3.8.3-alpine

# set work directory
WORKDIR /usr/src/backend

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev libffi-dev zlib-dev jpeg-dev

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt
# RUN --mount=type=cache,target=/root/.cache/pip pip install -r requirements.txt

# copy entrypoint.sh
COPY ./entrypoint.sh .
# COPY ./create_user.sh .


# copy project
COPY . .

# run entrypoint.she ntrypoint
ENTRYPOINT ["/usr/src/backend/entrypoint.sh"]
# ENTRYPOINT ["/usr/src/app/create_user.sh"]

