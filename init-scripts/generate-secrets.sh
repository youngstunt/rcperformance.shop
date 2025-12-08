#!/bin/bash

# Generate secure secrets for rcperformance.shop deployment
# Usage: ./init-scripts/generate-secrets.sh

set -e

ENV_FILE=".env"
ENV_EXAMPLE=".env.example"

# Check if we're in the right directory
if [[ ! -f "$ENV_EXAMPLE" ]]; then
    echo "Error: $ENV_EXAMPLE not found. Run this script from the rcperformance.shop directory."
    exit 1
fi

# Warn if .env already exists
if [[ -f "$ENV_FILE" ]]; then
    read -p ".env already exists. Overwrite? (y/N): " confirm
    if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
        echo "Aborted."
        exit 0
    fi
fi

# Generate cryptographically secure random strings
generate_secret() {
    openssl rand -base64 32 | tr -d '/+=' | head -c 32
}

generate_password() {
    openssl rand -base64 24 | tr -d '/+=' | head -c 24
}

# Generate secrets
POSTGRES_PASSWORD=$(generate_password)
API_KEY=$(generate_secret)
JWT_SECRET=$(generate_secret)

# Create .env file
cat > "$ENV_FILE" << EOF
# PostgreSQL Configuration
POSTGRES_USER=rcperformance_user
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
POSTGRES_DB=rcperformance
POSTGRES_PORT=5432

# API Authentication (for microservices)
API_KEY=${API_KEY}
JWT_SECRET=${JWT_SECRET}

# Service Ports
API_PORT=3001
EOF

chmod 600 "$ENV_FILE"

echo "Generated $ENV_FILE with secure secrets"
echo "File permissions set to 600 (owner read/write only)"
