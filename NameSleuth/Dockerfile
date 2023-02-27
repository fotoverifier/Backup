FROM ubuntu:20.04
ARG port

COPY . /app/

WORKDIR /app
RUN apt update && apt install -y python3 python3-pip
RUN pip3 install -r requirements.txt
ENV PORT $port

CMD ["python3","-u","server.py"]
