#!/bin/bash
set -eu

# ==================================================================================== #
# VARIABLES
# ==================================================================================== #

# Force all output to be presented in en_US for the duration of this script. This avoids  
# any "setting locale failed" errors while this script is running, before we have 
# installed support for all locales. Do not change this setting!
export LC_ALL=en_US.UTF-8 

# Prompt to get variables
## format: read -p "Enter password for USERNAME: " USERNAME_PASSWORD
read -p "Enter APPLICATION USERNAME: " APP_USERNAME
read -p "Enter DEFAULT TEMPLATE USERNAME: " TEMPLATE_USERNAME


# ==================================================================================== #
# SCRIPT LOGIC
# ==================================================================================== #

# Enable the "universe" repository.
add-apt-repository --yes universe

# Update all software packages.
apt update

# Add the new user (and give them sudo privileges).
useradd --create-home --shell "/bin/bash" --groups sudo "${APP_USERNAME}"

# Force a password to be set for the new user the first time they log in.
passwd --delete "${APP_USERNAME}"
chage --lastday 0 "${APP_USERNAME}"

# Copy the SSH keys from the template-user to the new user.
rsync --archive --chown=${APP_USERNAME}:${APP_USERNAME} /home/${TEMPLATE_USERNAME}/.ssh /home/${APP_USERNAME}

# Configure the firewall to allow SSH, HTTP and HTTPS traffic.
ufw allow 22 #don't need due to private network?
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# Install fail2ban.
apt --yes install fail2ban

# Upgrade all packages. Using the --force-confnew flag means that configuration 
# files will be replaced if newer ones are available.
apt --yes -o Dpkg::Options::="--force-confnew" upgrade

echo "Script complete! Rebooting..."
reboot