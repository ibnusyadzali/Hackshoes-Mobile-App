FROM node:latest

WORKDIR /server/services/users

ENV PORT=4001

COPY package.json package-lock.json /server/services/users

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./


CMD ["npm", "run", "start"]