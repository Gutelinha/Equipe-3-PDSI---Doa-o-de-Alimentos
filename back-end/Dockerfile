# Development Stage
FROM node:20-alpine AS development

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Build Stage
FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies with clean cache
RUN npm install

COPY . .

# Build the application
RUN npm run build

# Production Stage
FROM node:18-alpine AS production

# Create non-root user
USER node

WORKDIR /usr/src/app

# Copy only necessary files from build stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./

# Expose application port
EXPOSE 3000

# Start the server using production build
CMD [ "node", "dist/main.js" ]