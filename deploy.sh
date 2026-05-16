#!/bin/bash

echo "=== Mizuki Content Manager - Manual Deployment ==="
echo ""

if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
  echo "ERROR: CLOUDFLARE_API_TOKEN is not set"
  exit 1
fi

if [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
  echo "ERROR: CLOUDFLARE_ACCOUNT_ID is not set"
  exit 1
fi

if [ -z "$GH_TOKEN" ]; then
  echo "ERROR: GH_TOKEN is not set"
  exit 1
fi

if [ -z "$GH_REPO_OWNER" ]; then
  echo "ERROR: GH_REPO_OWNER is not set"
  exit 1
fi

if [ -z "$GH_REPO_NAME" ]; then
  echo "ERROR: GH_REPO_NAME is not set"
  exit 1
fi

echo "Installing dependencies..."
npm install

echo ""
echo "Deploying to Cloudflare Workers..."
echo "Environment: production"
echo "Repository: $GH_REPO_OWNER/$GH_REPO_NAME"
echo ""

npx wrangler deploy --env production \
  --api-token "$CLOUDFLARE_API_TOKEN" \
  --account-id "$CLOUDFLARE_ACCOUNT_ID"

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Deployment successful!"
else
  echo ""
  echo "❌ Deployment failed!"
  exit 1
fi