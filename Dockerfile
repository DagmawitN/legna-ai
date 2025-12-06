# Stage 1: Build for Development (single stage for simplicity in dev)
FROM node:22-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
# This helps speed up rebuilds if dependencies haven't changed
COPY package.json package-lock.json ./

# Install dependencies (including dev dependencies for 'npm run dev')
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port Next.js dev server will run on
EXPOSE 3000

# Command to start the Next.js development server
# Next.js development server usually listens on 0.0.0.0 by default
# which makes it accessible from outside the container.
CMD ["npm", "run", "dev"]
