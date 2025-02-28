#!/bin/bash

# Script Vars
REPO_URL="https://github.com/Torkel-Aannestad/omdb-frontend"
APP_DIR=~/omdb-app
SWAP_SIZE="1G"  # Swap size of 1GB


# Prompt to enter a password for the PostgreSQL moviemaze user (rather than hard-coding
# a password in this script).
read -p "Enter password for moviemaze DB user: " DB_PASSWORD
read -p "Enter mailtrap user: " MAILTRAP_USERNAME
read -p "Enter password for mailtrap user: " MAILTRAP_PASSWORD

# Force all output to be presented in en_US for the duration of this script. This avoids  
# any "setting locale failed" errors while this script is running, before we have 
# installed support for all locales. Do not change this setting!
export LC_ALL=en_US.UTF-8 


# Add a DSN and mailtrap to the system-wide environment variables in the /etc/environment file.
echo "MOVIE_MAZE_DB_DSN='postgres://moviemaze:${DB_PASSWORD}@localhost/moviemaze'" >> /etc/environment
echo "MAILTRAP_USERNAME='${MAILTRAP_USERNAME}'" >> /etc/environment
echo "MAILTRAP_PASSWORD='${MAILTRAP_PASSWORD}'" >> /etc/environment


# ==================================================================================== #
# SCRIPT LOGIC
# ==================================================================================== #


# Enable the "universe" repository.
add-apt-repository --yes universe

# Update all software packages.
apt update

# Add Swap Space
echo "Adding swap space..."
sudo fallocate -l $SWAP_SIZE /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make swap permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Install Docker
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" -y
sudo apt update
sudo apt install docker-ce -y

# Install Docker Compose
sudo rm -f /usr/local/bin/docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Wait for the file to be fully downloaded before proceeding
if [ ! -f /usr/local/bin/docker-compose ]; then
  echo "Docker Compose download failed. Exiting."
  exit 1
fi

sudo chmod +x /usr/local/bin/docker-compose

# Ensure Docker Compose is executable and in path
sudo ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose

# Verify Docker Compose installation
docker-compose --version
if [ $? -ne 0 ]; then
  echo "Docker Compose installation failed. Exiting."
  exit 1
fi

# Ensure Docker starts on boot and start Docker service
sudo systemctl enable docker
sudo systemctl start docker

# Clone the Git repository
if [ -d "$APP_DIR" ]; then
  echo "Directory $APP_DIR already exists. Pulling latest changes..."
  cd $APP_DIR && git pull
else
  echo "Cloning repository from $REPO_URL..."
  git clone $REPO_URL $APP_DIR
  cd $APP_DIR
fi


# Build and run the Docker containers from the app directory (~/omdb-app)
cd $APP_DIR
sudo docker-compose up --build -d

# Check if Docker Compose started correctly
if ! sudo docker-compose ps | grep "Up"; then
  echo "Docker containers failed to start. Check logs with 'docker-compose logs'."
  exit 1
fi

# Output final message
echo "Deployment complete. Your Next.js app are now running. 

