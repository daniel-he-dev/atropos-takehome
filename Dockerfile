# Use Node.js as the base image
FROM node:18

# Set the working directory for the server
WORKDIR /app

# Copy server package.json and install server dependencies
COPY package*.json ./
RUN npm install

# Copy frontend package.json and install frontend dependencies
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install


# Set the working directory back to the server
WORKDIR /app
COPY . .

# Build the frontend React app
WORKDIR /app/frontend
RUN npm run build

# Expose the backend port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]