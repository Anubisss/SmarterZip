FROM node:20.15.0-alpine AS builder

WORKDIR /app

COPY . ./

ENV NEXT_TELEMETRY_DISABLED=1

ARG NEXT_PUBLIC_API_URL

RUN npm ci && npm run build

FROM node:20.15.0-alpine AS runner

WORKDIR /app

COPY --chown=node:node --from=builder /app/package.json .
COPY --chown=node:node --from=builder /app/package-lock.json .
COPY --chown=node:node --from=builder /app/.next ./.next

RUN npm ci --omit=dev

EXPOSE 3000

CMD ["npm", "start"]
