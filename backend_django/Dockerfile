FROM python:3.8-alpine
WORKDIR /api
COPY ./requirements.txt ./
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
    libevent-dev \
    && pip install Pillow==8.1.0 mysqlclient==2.0.3 \
    && apk del build-deps

RUN pip install -r requirements.txt
COPY . .
ENV PORT=8000
EXPOSE 8000
# Runner script here
CMD ["bash", "/api/runner.sh"]


