FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache openssl

COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

COPY . .

# Dummy URL just for build time — real URL comes from docker-compose at runtime
ENV DATABASE_URL="postgresql://postgres:secret@localhost:5432/demaize?schema=public"
ENV AUTH_SECRET="build-time-secret"
ENV ADMIN_EMAIL="admin@demaize.com"
ENV ADMIN_PASSWORD="admin123"

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

RUN apk add --no-cache openssl

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 3000
CMD ["node", "server.js"]