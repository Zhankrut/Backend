# Use official Node.js LTS image
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose port (match Express app's port, usually 3000)
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
