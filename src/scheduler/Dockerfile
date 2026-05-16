FROM node:24-alpine AS builder

# hadolint ignore=DL3018
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY . ./

RUN npm ci && npm run scheduler:build

WORKDIR /app/scheduler-deps

COPY src/scheduler/package.json src/scheduler/package-lock.json ./

RUN npm ci --omit=dev

FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/scheduler-deps/node_modules ./node_modules

USER node

CMD ["node", "dist/scheduler/scheduler/index.js"]
