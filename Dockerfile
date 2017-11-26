FROM node:8.5.0-alpine

WORKDIR /src

COPY package.json .
COPY yarn.lock .
RUN npm i -g yarn && yarn install

COPY . .

EXPOSE 8080
CMD [ "yarn", "start" ]
