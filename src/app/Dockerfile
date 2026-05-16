FROM node:20.15.0-alpine AS builder

WORKDIR /app

COPY . ./

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm ci && npm run build

FROM node:20.15.0-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --chown=node:node --from=builder /app/.next/standalone ./
COPY --chown=node:node --from=builder /app/.next/static ./.next/static

USER node

EXPOSE 3000

CMD ["node", "server.js"]
