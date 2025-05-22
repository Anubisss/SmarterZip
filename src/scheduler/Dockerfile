FROM node:20.15.0-alpine AS builder

WORKDIR /app

COPY . ./

RUN npm ci && npm run scheduler:build

FROM node:20.15.0-alpine AS runner

WORKDIR /app

COPY --chown=node:node --from=builder /app/package.json .
COPY --chown=node:node --from=builder /app/package-lock.json .
COPY --chown=node:node --from=builder /app/dist ./dist

RUN npm ci --omit=dev

CMD ["npm", "run", "scheduler:prod"]
