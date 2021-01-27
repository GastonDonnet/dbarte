FROM python:3.8-alpine
ADD . /api
WORKDIR /api

# RUN apk update \
#     && apk add --virtual build-deps gcc python3-dev musl-dev \
#     && apk add freetype-dev fribidi-dev harfbuzz-dev  jpeg-dev zlib-dev libjpeg lcms2-dev mariadb-dev tcl-dev \
#     && pip install Pillow mysqlclient\
#     && apk del build-deps

#RUN apk update && apk add gcc python3-dev musl-dev libffi-dev py-pip jpeg-dev zlib-dev

RUN apk --no-cache add --virtual build-deps \
    build-base \
    python3 \
    python3-dev \
    musl-dev \
    gcc \
    && apk add \
    # wget dependency
    openssl \
    # dev dependencies
    bash \
    git \
    py3-pip \
    sudo \
    # Pillow dependencies
    mariadb-dev \
    libjpeg \
    freetype-dev \
    fribidi-dev \
    harfbuzz-dev \
    jpeg-dev \
    lcms2-dev \
    openjpeg-dev \
    tcl-dev \
    tiff-dev \
    tk-dev \
    zlib-dev \
    && pip install Pillow mysqlclient \
    && apk del build-deps

RUN pip install -r requirements.txt
ENV PORT=8000
EXPOSE 8000
# Runner script here
CMD ["/api/runner.sh"]


