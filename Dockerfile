# Use a base image. This is the starting point.
FROM node:18-alpine

# Set the working directory inside the container.
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies.
# Using this separate step leverages Docker's caching, so it only runs if these files change.
COPY package*.json ./

# Install project dependencies.
RUN npm install

# Copy the rest of your application code.
COPY . .

# Expose the port your application listens on.
EXPOSE 3000

# Define the command to run your application when the container starts.
CMD ["node", "server.js"]