# Use specific Node version (not 'latest')
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (layer caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY src/ ./src/

# Run as non-root user
USER node

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "src/index.js"]