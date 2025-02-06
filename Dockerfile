# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port for the Express app
EXPOSE 4000

# Expose port for the worker (if needed)
EXPOSE 4001

# Start the application (default command)
CMD ["npm", "start"]
