#!/bin/bash

# --- 1. Argument Check ---
if [ -z "$1" ]; then
  echo " Error: You must provide a version tag (e.g., 0.0.2) as the first argument."
  echo "Usage: $0 <version>"
  exit 1
fi

# --- 2. Define Variables ---
# The first argument passed to the script is stored in $1
VERSION=$1
IMAGE_NAME="akashcapro/codex-gateway-service"
FULL_TAG="$IMAGE_NAME:$VERSION"

echo "==========================================="
echo "  Starting Docker Build and Push"
echo "   Image Tag: $FULL_TAG"
echo "==========================================="

# --- 3. Build the Docker Image ---
echo "⚙️  Building Docker image: $FULL_TAG"
# The '.' at the end means build using the Dockerfile in the current directory
docker build -t "$FULL_TAG" .

# Check if the build was successful
if [ $? -ne 0 ]; then
  echo "Docker build failed."
  exit 1
fi

# --- 4. Push the Docker Image ---
echo "Pushing Docker image: $FULL_TAG"
docker push "$FULL_TAG"

# Check if the push was successful
if [ $? -ne 0 ]; then
  echo " Docker push failed."
  exit 1
fi

# --- 5. Completion ---
echo "✅ Successfully built and pushed $FULL_TAG"
echo "==========================================="