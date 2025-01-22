FROM node:20-alpine AS builder

WORKDIR /app

COPY . ./

RUN npm ci
RUN npm run scheduler:build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD ["npm", "run", "scheduler:prod"]
