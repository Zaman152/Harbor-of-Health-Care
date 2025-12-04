# Test n8n Webhook - Extract "output" from Array Response (PowerShell)
# Usage: .\test-webhook.ps1 "Your message here"

param(
    [string]$Message = "Hello, how can you help me?"
)

$webhookUrl = "https://hoh.app.n8n.cloud/webhook/d079e4d9-a3e9-4054-8b50-f0222c75e880"

Write-Host "📤 Sending message to webhook..." -ForegroundColor Cyan
Write-Host "Message: $Message" -ForegroundColor Gray
Write-Host ""

try {
    # 1. Send message to webhook
    $body = @{
        Message = $Message
    } | ConvertTo-Json

    # 2. Wait for response
    $response = Invoke-RestMethod -Uri $webhookUrl -Method Post -Body $body -ContentType "application/json"
    
    Write-Host "📥 Raw response:" -ForegroundColor Cyan
    $response | ConvertTo-Json -Depth 10 | Write-Host
    Write-Host ""

    # 3. Extract "output" field from array [{"output":"text"}]
    $outputText = $null

    if ($response -is [Array]) {
        # Handle array response: [{"output":"text"}]
        if ($response.Count -gt 0) {
            $outputText = $response[0].output
            if (-not $outputText) {
                $outputText = $response[0].Output
            }
        }
    } elseif ($response -is [PSCustomObject] -or $response -is [Hashtable]) {
        # Handle object response: {"output":"text"} or {"response":"text"}
        $outputText = $response.output
        if (-not $outputText) {
            $outputText = $response.Output
        }
        if (-not $outputText) {
            $outputText = $response.response
        }
        if (-not $outputText) {
            $outputText = $response.Response
        }
    } elseif ($response -is [String]) {
        # Handle string response
        $outputText = $response
    }

    # 4. Return/display plain text
    if ($outputText) {
        Write-Host "✅ Extracted Output:" -ForegroundColor Green
        Write-Host ("─" * 50) -ForegroundColor Gray
        Write-Host $outputText -ForegroundColor White
        Write-Host ("─" * 50) -ForegroundColor Gray
        return $outputText
    } else {
        Write-Host "⚠️  No output field found in response" -ForegroundColor Yellow
        $response | ConvertTo-Json -Depth 10 | Write-Host
        return $null
    }

} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    throw
}

