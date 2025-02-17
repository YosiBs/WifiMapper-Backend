# Dockerfile :
# Use Node.js 18 (or another stable version)
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Expose port (must match the one in docker-compose.yml)
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
