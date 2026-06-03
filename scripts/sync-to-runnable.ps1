$src = $PSScriptRoot + "\.."
$dest = "C:\Users\sachh\Desktop\CVC\chitra-vichitra-events"
robocopy $src $dest /E /XD node_modules dist .git /NFL /NDL /NJH /NJS
Write-Host "Synced to $dest"
Write-Host "Run: cd `"$dest`"; npm run dev"
