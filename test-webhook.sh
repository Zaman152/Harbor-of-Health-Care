#!/bin/bash
# Test n8n Webhook - Extract "output" from Array Response
# Usage: ./test-webhook.sh "Your message here"

WEBHOOK_URL="https://hoh.app.n8n.cloud/webhook/d079e4d9-a3e9-4054-8b50-f0222c75e880"
MESSAGE="${1:-Hello, how can you help me?}"

echo "📤 Sending message to webhook..."
echo "Message: $MESSAGE"
echo ""

# 1. Send message to webhook and wait for response
RESPONSE=$(curl -s -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d "{\"Message\": \"$MESSAGE\"}")

echo "📥 Raw response:"
echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
echo ""

# 2. Extract "output" field from array [{"output":"text"}]
# Using jq (if available)
if command -v jq &> /dev/null; then
  OUTPUT=$(echo "$RESPONSE" | jq -r 'if type == "array" then .[0].output // .[0].Output // empty else .output // .Output // .response // .Response // empty end')
  
  if [ -n "$OUTPUT" ] && [ "$OUTPUT" != "null" ]; then
    echo "✅ Extracted Output:"
    echo "──────────────────────────────────────────────────"
    echo "$OUTPUT"
    echo "──────────────────────────────────────────────────"
  else
    echo "⚠️  No output field found in response"
    echo "$RESPONSE"
  fi
else
  # Fallback using grep/sed (less reliable)
  echo "⚠️  jq not found. Install jq for better parsing: brew install jq (Mac) or apt-get install jq (Linux)"
  echo "Attempting basic extraction..."
  OUTPUT=$(echo "$RESPONSE" | grep -o '"output":"[^"]*"' | sed 's/"output":"\([^"]*\)"/\1/')
  if [ -n "$OUTPUT" ]; then
    echo "✅ Extracted Output:"
    echo "$OUTPUT"
  else
    echo "Could not extract output. Please install jq for reliable parsing."
  fi
fi

