ARG NODE_VERSION=18.18.0

# Alpine image
FROM node:${NODE_VERSION}-alpine AS alpine
RUN apk update
RUN apk add --no-cache libc6-compat

# Setup pnpm and turbo on the alpine base
FROM alpine AS base
RUN npm install turbo --global
RUN corepack enable && corepack prepare yarn@4.3.1

# Prune projects
FROM base AS pruner

WORKDIR /app
COPY . .
RUN turbo prune --scope=admission-web --scope=@admission/utils --docker

# Build the project
FROM base AS builder

WORKDIR /app

# Copy lockfile and package.json's of isolated subworkspace
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
COPY --from=pruner /app/out/json/ .

# First install the dependencies (as they change less often)
RUN yarn config set nodeLinker node-modules
RUN yarn install

# Copy source code of isolated subworkspace
COPY --from=pruner /app/out/full/ .

ENV NEXT_PUBLIC_API_URL=https://admission-api.fictadvisor.com

RUN turbo build --filter=admission-web
#RUN yarn workspaces focus --all --production

# Final image
FROM alpine AS runner
ARG PROJECT

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

WORKDIR /app
COPY --from=builder --chown=nextjs:nodejs /app/admission-web/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/admission-web/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/admission-web/package.json ./package.json

CMD ["yarn", "start"]
