FROM node:22.2
WORKDIR /app/
COPY ./package.json ./
RUN npm install