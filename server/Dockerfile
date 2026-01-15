# ----------------------------
# Stage 1: Build (The Kitchen)
# ----------------------------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first (to cache dependencies)
COPY package*.json ./

# Install ONLY production dependencies to save space
# 'npm ci' is faster and cleaner than 'npm install'
RUN npm ci --only=production

# ----------------------------
# Stage 2: Production (The Serving Plate)
# ----------------------------
FROM node:18-alpine

WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Create a non-root user for security (Best Practice)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose the port
EXPOSE 8080

# Start command
CMD ["npm", "start"]