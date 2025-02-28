#!/bin/bash
set -eu

# ==================================================================================== #
# VARIABLES
# ==================================================================================== #

# Force all output to be presented in en_US for the duration of this script. This avoids  
# any "setting locale failed" errors while this script is running, before we have 
# installed support for all locales. Do not change this setting!
export LC_ALL=en_US.UTF-8 

# Name of the relevant application username
USERNAME=SomeAppUserName

# POSTGRESQL
DB_NAME: someDBName
DB_USERNAME: someDBUsername
DB_DSN_VARIABLE_NAME:  egDATABASE_NAME_DB_DSN
read -p "Enter DB_PASSWORD: " DB_PASSWORD

#Mailer
read -p "Enter MAILTRAP_USERNAME: " MAILTRAP_USERNAME
read -p "Enter MAILTRAP_PASSWORD: " MAILTRAP_PASSWORD


# ==================================================================================== #
# SCRIPT LOGIC
# ==================================================================================== #

# Enable the "universe" repository.
add-apt-repository --yes universe

# Update all software packages.
apt update

#POSTGRESQL
# Install the goose db migration CLI tool. https://pressly.github.io/goose/installation/
curl -fsSL \
    https://raw.githubusercontent.com/pressly/goose/master/install.sh |\
    sh

# Install PostgreSQL.
apt --yes install postgresql

# Set up the moviemaze DB and create a user account with the password entered earlier.
sudo -i -u postgres psql -c "CREATE DATABASE ${DB_NAME}"
sudo -i -u postgres psql -d ${DB_USERNAME} -c "CREATE EXTENSION IF NOT EXISTS citext"
sudo -i -u postgres psql -d ${DB_USERNAME} -c "CREATE ROLE ${DB_USERNAME} WITH LOGIN PASSWORD '${DB_PASSWORD}'"

# Add a DSN and mailtrap to the system-wide environment variables in the /etc/environment file.
echo "${DB_DSN_VARIABLE_NAME}='postgres://${DB_USERNAME}:${DB_PASSWORD}@localhost/${DB_NAME}'" >> /etc/environment

# MAILER
echo "MAILTRAP_USERNAME='${MAILTRAP_USERNAME}'" >> /etc/environment
echo "MAILTRAP_PASSWORD='${MAILTRAP_PASSWORD}'" >> /etc/environment

# Install Caddy (see https://caddyserver.com/docs/install#debian-ubuntu-raspbian).
# apt install -y debian-keyring debian-archive-keyring apt-transport-https
# curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
# curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
# apt update
# apt --yes install caddy

# Upgrade all packages. Using the --force-confnew flag means that configuration 
# files will be replaced if newer ones are available.
apt --yes -o Dpkg::Options::="--force-confnew" upgrade

echo "Script complete! Rebooting..."
reboot