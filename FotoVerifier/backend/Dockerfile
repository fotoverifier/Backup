FROM python:3.7

RUN printf "Acquire::http::Pipeline-Depth 0;\nAcquire::http::No-Cache true;\nAcquire::BrokenProxy true;" > /etc/apt/apt.conf.d/99fixbadproxy

RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y

WORKDIR /app
COPY ./api /app/

RUN mkdir -p output
RUN mkdir -p upload

RUN pip install -r requirements.txt

CMD python app.py
