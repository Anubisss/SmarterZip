FROM node:20-alpine AS builder

WORKDIR /app

COPY . ./

ENV NEXT_TELEMETRY_DISABLED=1

ARG NEXT_PUBLIC_API_URL

RUN npm ci && npm run build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next

EXPOSE 3000

CMD ["npm", "start"]
