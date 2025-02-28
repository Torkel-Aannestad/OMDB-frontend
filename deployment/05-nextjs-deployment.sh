#!/bin/bash

# ==================================================================================== #
# VARIABLES
# ==================================================================================== #

REPO_URL="https://github.com/Torkel-Aannestad/omdb-frontend"
APP_DIR=$HOME/omdb-app


# ==================================================================================== #
# SCRIPT LOGIC
# ==================================================================================== #


# bash in debug mode. Set +x to turn off
set -x

# Clone the Git repository
if [ -d "$APP_DIR" ]; then
  echo "Directory $APP_DIR already exists. Pulling latest changes..."
  cd $APP_DIR && git pull
else
  echo "Cloning repository from $REPO_URL..."
  git clone $REPO_URL $APP_DIR
  cd $APP_DIR
fi

# Build and run the Docker containers from the APP_DIR
cd $APP_DIR
sudo docker compose up --build -d

# Check if Docker Compose started correctly
if ! sudo docker compose ps | grep "Up"; then
  echo "Docker containers failed to start. Check logs with 'docker compose logs'."
  exit 1
fi

echo ""
echo "Next.js App is now running" 
echo ""
