FROM node:16

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN npx tsc

CMD [ "node", "bin/www" ]
