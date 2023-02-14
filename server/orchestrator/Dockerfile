FROM node:latest

WORKDIR /server/orchestrator

ENV PORT=4000

COPY package.json package-lock.json /server/orchestrator

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./


CMD ["npm", "run", "start"]