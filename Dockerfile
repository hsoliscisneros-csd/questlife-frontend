FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_API_URL=https://questlife-api-production.up.railway.app/api
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app

RUN npm install -g serve@14.2.4

COPY --from=build /app/dist ./dist

ENV PORT=8080
EXPOSE 8080

CMD ["sh", "-c", "serve dist -s -l tcp://0.0.0.0:${PORT}"]
