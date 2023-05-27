FROM node:18.16.0-bullseye

ENV PROJECT_ROOT /home/universe_frontend

RUN mkdir -p $PROJECT_ROOT
WORKDIR $PROJECT_ROOT

COPY package*.json $PROJECT_ROOT
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]