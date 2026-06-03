# Runs Vite from a virtual drive so paths with "#" in the folder name work on Windows.
$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$DriveLetter = "Z:"

$existing = subst 2>&1 | Select-String "Z:\\"
if (-not $existing) {
  subst $DriveLetter $ProjectRoot
  $createdSubst = $true
} else {
  $createdSubst = $false
}

try {
  Set-Location "${DriveLetter}\"
  if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..."
    npm install
  }
  Write-Host "Starting dev server at http://localhost:5173/"
  npm run dev
} finally {
  if ($createdSubst) {
    subst $DriveLetter /d 2>$null
  }
}
