# Quick Reference: Extract "output" from n8n Webhook Response

## Response Format
Your webhook returns: `[{"output":"Hi there! Welcome to Harbor of Health Home Care..."}]`

## Quick Solutions

### 1. Node.js (ES Modules - Node 18+)
```javascript
const response = await fetch('https://hoh.app.n8n.cloud/webhook/d079e4d9-a3e9-4054-8b50-f0222c75e880', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ Message: 'Hello' })
});
const data = await response.json();
const output = Array.isArray(data) ? data[0]?.output : data?.output;
console.log(output); // Plain text output
```

### 2. Bash (with jq)
```bash
curl -s -X POST "https://hoh.app.n8n.cloud/webhook/d079e4d9-a3e9-4054-8b50-f0222c75e880" \
  -H "Content-Type: application/json" \
  -d '{"Message":"Hello"}' | jq -r 'if type == "array" then .[0].output else .output end'
```

### 3. PowerShell
```powershell
$response = Invoke-RestMethod -Uri "https://hoh.app.n8n.cloud/webhook/d079e4d9-a3e9-4054-8b50-f0222c75e880" `
  -Method Post -Body '{"Message":"Hello"}' -ContentType "application/json"
$output = if ($response -is [Array]) { $response[0].output } else { $response.output }
Write-Host $output
```

### 4. Python
```python
import requests
import json

response = requests.post(
    'https://hoh.app.n8n.cloud/webhook/d079e4d9-a3e9-4054-8b50-f0222c75e880',
    json={'Message': 'Hello'}
)
data = response.json()
output = data[0]['output'] if isinstance(data, list) else data.get('output', '')
print(output)
```

## Files Created

- `test-webhook.js` - Node.js CommonJS version
- `test-webhook.mjs` - Node.js ES Modules version (Node 18+)
- `test-webhook.sh` - Bash script
- `test-webhook.ps1` - PowerShell script

## Usage Examples

### Node.js
```bash
node test-webhook.mjs "Hello, how can you help me?"
```

### Bash
```bash
chmod +x test-webhook.sh
./test-webhook.sh "Hello, how can you help me?"
```

### PowerShell
```powershell
.\test-webhook.ps1 "Hello, how can you help me?"
```

## ChatWidget Update

The ChatWidget has been updated to properly handle the array format `[{"output":"..."}]` automatically. No changes needed in your React code - it will extract the text correctly!

