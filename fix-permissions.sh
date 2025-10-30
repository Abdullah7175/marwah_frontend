#!/bin/bash
# Fix Next.js cache permissions for PM2

# Get the PM2 process user (usually ubuntu or www-data)
PM2_USER=$(whoami)
PROJECT_DIR="/var/www/marwah_frontend"

echo "Fixing permissions for user: $PM2_USER"
echo "Project directory: $PROJECT_DIR"

# Change ownership of the entire project directory to the PM2 user
sudo chown -R $PM2_USER:$PM2_USER $PROJECT_DIR

# Ensure .next directory exists and has correct permissions
sudo mkdir -p $PROJECT_DIR/.next
sudo mkdir -p $PROJECT_DIR/.next/cache
sudo mkdir -p $PROJECT_DIR/.next/cache/images

# Set proper permissions
sudo chmod -R 755 $PROJECT_DIR
sudo chmod -R 775 $PROJECT_DIR/.next
sudo chmod -R 775 $PROJECT_DIR/.next/cache

# Fix node_modules permissions if needed
if [ -d "$PROJECT_DIR/node_modules" ]; then
    chmod -R 755 $PROJECT_DIR/node_modules
fi

echo "Permissions fixed!"
echo "Restarting PM2 process..."

# Restart PM2 process
pm2 restart marwah-frontend

echo "Done! Check PM2 logs: pm2 logs marwah-frontend"

