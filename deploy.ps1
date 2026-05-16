Write-Host "=== Mizuki Content Manager - Manual Deployment ==="
Write-Host ""

if (-not $env:CLOUDFLARE_API_TOKEN) {
  Write-Error "ERROR: CLOUDFLARE_API_TOKEN is not set"
  exit 1
}

if (-not $env:CLOUDFLARE_ACCOUNT_ID) {
  Write-Error "ERROR: CLOUDFLARE_ACCOUNT_ID is not set"
  exit 1
}

if (-not $env:GH_TOKEN) {
  Write-Error "ERROR: GH_TOKEN is not set"
  exit 1
}

if (-not $env:GH_REPO_OWNER) {
  Write-Error "ERROR: GH_REPO_OWNER is not set"
  exit 1
}

if (-not $env:GH_REPO_NAME) {
  Write-Error "ERROR: GH_REPO_NAME is not set"
  exit 1
}

Write-Host "Installing dependencies..."
npm install

Write-Host ""
Write-Host "Deploying to Cloudflare Workers..."
Write-Host "Environment: production"
Write-Host "Repository: $($env:GH_REPO_OWNER)/$($env:GH_REPO_NAME)"
Write-Host ""

npx wrangler deploy --env production `
  --api-token $env:CLOUDFLARE_API_TOKEN `
  --account-id $env:CLOUDFLARE_ACCOUNT_ID

if ($LASTEXITCODE -eq 0) {
  Write-Host ""
  Write-Host "✅ Deployment successful!" -ForegroundColor Green
} else {
  Write-Host ""
  Write-Host "❌ Deployment failed!" -ForegroundColor Red
  exit 1
}