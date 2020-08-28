
# frontend
FROM node:12.18-alpine as builder

COPY package.json .
COPY package-lock.json .
COPY src src
COPY public public

RUN npm ci
RUN npm run build

# backend
FROM node:12.18-alpine

COPY --from=builder build build

WORKDIR /backend
COPY backend/package.json .
COPY backend/package-lock.json .
COPY backend/src src

RUN npm ci

EXPOSE 8080/tcp
CMD ["npm", "start"]