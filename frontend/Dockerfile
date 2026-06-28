FROM node:26 AS dev

ARG PROJECT_PATH=/React-test/frontend
ENV PROJECT_PATH=$PROJECT_PATH

WORKDIR $PROJECT_PATH

RUN apt update \
    && apt install -y \
        curl \
        tmux \
        vim \
        htop \
        git

RUN npm install -g eslint

CMD ["sleep", "infinity"]

# =========================================
# Stage 1: Build the React.js Application
# =========================================

# Use a lightweight Node.js image for building (customizable via ARG)
FROM node:26-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package-related files first to leverage Docker's caching mechanism
COPY package.json package-lock.json* ./
COPY tsconfig*.json vite.config.* ./

# Install project dependencies using npm ci (ensures a clean, reproducible install)
RUN --mount=type=cache,target=/root/.npm npm ci

# Copy the rest of the application source code into the container
COPY . .

# Build the React.js application (outputs to /app/dist)
RUN npm run build

# =========================================
# Stage 2: Prepare Nginx to Serve Static Files
# =========================================

FROM nginxinc/nginx-unprivileged:1.27-alpine AS prod

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the static build output from the build stage to Nginx's default HTML serving directory
COPY --chown=nginx:nginx --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
