# n8n Webhook Workflow Guide: Request-Response Pattern

## Overview
This workflow handles chatbot messages by:
1. Receiving the message via webhook
2. Sending it to an external system via cURL
3. Waiting for the external system to call back
4. Returning the response to the original requester

## Workflow Structure

### Step 1: Webhook Node (Initial Request)
- **Node Type**: Webhook
- **Settings**:
  - **HTTP Method**: POST
  - **Path**: `/webhook/chatbot` (or your existing path)
  - **Response Mode**: "When Last Node Finishes"
  - **Response Data**: "All Entries"

### Step 2: Extract Message Data
- **Node Type**: Set
- **Purpose**: Extract the message from the incoming payload
- **Settings**:
  - Add field: `message` = `{{ $json.Message }}` or `{{ $json.body.Message }}`
  - Add field: `requestId` = `{{ $json.headers['x-request-id'] || $now.toMillis() }}`

### Step 3: HTTP Request Node (Send to External System)
- **Node Type**: HTTP Request
- **Settings**:
  - **Method**: POST
  - **URL**: Your external system's endpoint
  - **Body**:
    ```json
    {
      "message": "{{ $json.message }}",
      "callbackUrl": "https://hoh.app.n8n.cloud/webhook/callback/{{ $json.requestId }}"
    }
    ```
  - **Headers**: As required by your external system

### Step 4: Wait for Callback
- **Node Type**: Wait
- **Settings**:
  - **Resume**: "When Called by Webhook"
  - **Wait for**: "Webhook"
  - **Webhook Path**: `callback-{{ $json.requestId }}`
  - **Timeout**: Set a reasonable timeout (e.g., 60 seconds)

### Step 5: Respond to Webhook (Original Request)
- **Node Type**: Respond to Webhook
- **Settings**:
  - **Response Body**: 
    ```json
    {
      "response": "{{ $json.body.response || $json.body.message || $json.body.text || $json.response || $json.message || $json.text }}"
    }
    ```
  - **Response Code**: 200

## Separate Callback Webhook Workflow

You'll need a **second workflow** to handle the callback from your external system:

### Callback Workflow Steps:

1. **Webhook Node (Callback Receiver)**
   - **Node Type**: Webhook
   - **Settings**:
     - **HTTP Method**: POST
     - **Path**: `callback-*` (use wildcard or specific pattern)
     - **Response Mode**: "Last Node"
   
2. **Extract Request ID**
   - **Node Type**: Set
   - Extract the request ID from the webhook path: `{{ $json.params.path.split('-')[1] }}`

3. **Resume Wait Node**
   - **Node Type**: Execute Workflow
   - **Settings**:
     - **Workflow**: Select your main workflow
     - **Resume**: Select the "Wait for Callback" node
     - **Data**: Pass the response data from the callback

## Alternative: Simpler Two-Webhook Approach

If your external system can call back to a different endpoint:

### Workflow 1: Main Handler
1. **Webhook** (receives chatbot message)
2. **HTTP Request** (sends to external system with callback URL)
3. **Wait** (waits for Workflow 2 to trigger it)
4. **Respond to Webhook** (returns response)

### Workflow 2: Callback Handler
1. **Webhook** (receives callback from external system)
2. **Execute Workflow** (resumes Workflow 1 with response data)

## n8n Workflow JSON Configuration

Here's a basic structure you can import:

```json
{
  "name": "Chatbot Request-Response",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "chatbot",
        "responseMode": "lastNode"
      },
      "name": "Webhook - Initial Request",
      "type": "n8n-nodes-base.webhook",
      "position": [250, 300]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "message",
              "value": "={{ $json.body.Message || $json.Message }}",
              "name": "message"
            },
            {
              "id": "requestId",
              "value": "={{ $now.toMillis() }}",
              "name": "requestId"
            }
          ]
        }
      },
      "name": "Extract Message",
      "type": "n8n-nodes-base.set",
      "position": [450, 300]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "=YOUR_EXTERNAL_SYSTEM_URL",
        "bodyParameters": {
          "parameters": [
            {
              "name": "message",
              "value": "={{ $json.message }}"
            },
            {
              "name": "callbackUrl",
              "value": "=https://hoh.app.n8n.cloud/webhook/callback/{{ $json.requestId }}"
            }
          ]
        }
      },
      "name": "Send to External System",
      "type": "n8n-nodes-base.httpRequest",
      "position": [650, 300]
    },
    {
      "parameters": {
        "resume": "webhook"
      },
      "name": "Wait for Callback",
      "type": "n8n-nodes-base.wait",
      "position": [850, 300]
    },
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "callback/:requestId",
        "responseMode": "responseNode"
      },
      "name": "Webhook - Callback",
      "type": "n8n-nodes-base.webhook",
      "position": [1050, 300]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={{ { \"response\": $json.body.response || $json.body.message || $json.body.text } }}"
      },
      "name": "Respond to Webhook",
      "type": "n8n-nodes-base.respondToWebhook",
      "position": [1250, 300]
    }
  ],
  "connections": {
    "Webhook - Initial Request": {
      "main": [[{ "node": "Extract Message", "type": "main", "index": 0 }]]
    },
    "Extract Message": {
      "main": [[{ "node": "Send to External System", "type": "main", "index": 0 }]]
    },
    "Send to External System": {
      "main": [[{ "node": "Wait for Callback", "type": "main", "index": 0 }]]
    },
    "Wait for Callback": {
      "main": [[{ "node": "Respond to Webhook", "type": "main", "index": 0 }]]
    },
    "Webhook - Callback": {
      "main": [[{ "node": "Respond to Webhook", "type": "main", "index": 0 }]]
    }
  }
}
```

## Important Notes

1. **Request ID**: Use a unique request ID to match callbacks to requests
2. **Timeout**: Set a timeout on the Wait node to prevent indefinite waiting
3. **Error Handling**: Add error handling nodes for failed requests
4. **Security**: Validate the callback request to ensure it's from your external system

## Testing

1. Send a test message to your webhook: `https://hoh.app.n8n.cloud/webhook/d079e4d9-a3e9-4054-8b50-f0222c75e880`
2. Check that it sends to your external system
3. Manually trigger the callback webhook with a test response
4. Verify the response is returned to the original request

