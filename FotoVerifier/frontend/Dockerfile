FROM nginx

RUN apt-get update
RUN apt-get install nodejs npm -y
COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /app
COPY foto-verifier .
RUN npm ci
RUN npm run build
