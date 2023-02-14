FROM node:latest

WORKDIR /server/services/app

ENV PORT=4002
ENV JWT_KEY=enigma

COPY package.json package-lock.json /server/services/app

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./


CMD ["npm", "run", "start"]