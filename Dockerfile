ARG BUILD_IMAGE=node:20.11-alpine3.18
ARG RUN_IMAGE=gcr.io/distroless/nodejs20-debian12

# Build stage
FROM $BUILD_IMAGE AS build-env
COPY . /app
WORKDIR /app
RUN npm ci && npm run build

# Prepare production dependencies
FROM $BUILD_IMAGE AS deps-env
RUN npm install -g npm
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Create final production stage
FROM $RUN_IMAGE AS run-env
WORKDIR /usr/app
COPY --from=deps-env /node_modules ./node_modules
COPY --from=build-env /app/dist ./dist
COPY package.json ./

ENV NODE_ENV="production"
EXPOSE 3000
CMD ["dist/main.js"]
