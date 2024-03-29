FROM node:20.11.1 as production

WORKDIR /usr/src/app

EXPOSE 8000

RUN npm install && npm cache clean --force

ENV NODE_ENV=production

COPY . .

RUN npm run build

CMD ["node", "dist/index.js"]