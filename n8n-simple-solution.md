# Simple n8n Solution: Wait for Webhook Response

## The Problem
Your chatbot sends a message → n8n forwards it via cURL → External system processes it → External system calls back → n8n returns response to chatbot.

## Solution: Single Workflow with Wait Node

### Workflow Structure

```
[Webhook] → [Extract Data] → [HTTP Request] → [Wait] → [Respond to Webhook]
                                                              ↑
                                                              |
[Callback Webhook] → [Resume Wait] ──────────────────────────┘
```

## Step-by-Step Setup

### MAIN WORKFLOW (Your existing chatbot webhook)

#### Node 1: Webhook (Initial Request)
- **Type**: Webhook
- **Settings**:
  - Method: `POST`
  - Path: `d079e4d9-a3e9-4054-8b50-f0222c75e880` (your existing path)
  - Response Mode: `Last Node`
  - Response Data: `All Entries`

#### Node 2: Set (Extract & Prepare)
- **Type**: Set
- **Fields to Add**:
  - `message`: `={{ $json.body.Message || $json.Message }}`
  - `requestId`: `={{ $now.toMillis() }}`
  - `originalWebhookId`: `={{ $execution.id }}`

#### Node 3: HTTP Request (Send to External System)
- **Type**: HTTP Request
- **Settings**:
  - Method: `POST`
  - URL: `YOUR_EXTERNAL_SYSTEM_URL`
  - Body (JSON):
    ```json
    {
      "message": "{{ $json.message }}",
      "callbackUrl": "https://hoh.app.n8n.cloud/webhook/callback/{{ $json.requestId }}"
    }
    ```

#### Node 4: Wait (Wait for Callback)
- **Type**: Wait
- **Settings**:
  - Resume: `When Called by Webhook`
  - Wait for: `Webhook`
  - Webhook Path: `callback-{{ $json.requestId }}`
  - Timeout: `60` seconds (adjust as needed)

#### Node 5: Respond to Webhook (Return Response)
- **Type**: Respond to Webhook
- **Settings**:
  - Response Body (JSON):
    ```json
    {
      "response": "{{ $json.body.response || $json.body.message || $json.body.text || $json.response || $json.message || $json.text }}"
    }
    ```
  - Response Code: `200`

### CALLBACK WORKFLOW (New - Handles External System Response)

#### Node 1: Webhook (Receive Callback)
- **Type**: Webhook
- **Settings**:
  - Method: `POST`
  - Path: `callback-*` (wildcard to catch all callback-{requestId} paths)
  - Response Mode: `Last Node`

#### Node 2: Set (Extract Request ID)
- **Type**: Set
- **Fields**:
  - `requestId`: `={{ $json.params.path.replace('callback-', '') }}`
  - `response`: `={{ $json.body.response || $json.body.message || $json.body.text || $json.response || $json.message || $json.text }}`

#### Node 3: Execute Workflow (Resume Main Workflow)
- **Type**: Execute Workflow
- **Settings**:
  - **Mode**: `Resume`
  - **Workflow**: Select your MAIN WORKFLOW
  - **Resume From**: Select the "Wait" node (Node 4)
  - **Data**: 
    ```json
    {
      "body": {
        "response": "{{ $json.response }}"
      }
    }
    ```

## Important Configuration Notes

1. **Wait Node Webhook URL**: 
   - When you configure the Wait node, n8n will generate a unique webhook URL
   - This URL will be: `https://hoh.app.n8n.cloud/webhook/callback-{requestId}`
   - Your external system should call this URL with the response

2. **Request ID Matching**:
   - The `requestId` must match between the main workflow and callback
   - Use the same format in both workflows

3. **Response Format**:
   - The callback webhook should send the response in the body
   - Format: `{ "response": "your message here" }` or `{ "message": "..." }`

## Testing Steps

1. **Test the Main Workflow**:
   ```bash
   curl -X POST https://hoh.app.n8n.cloud/webhook/d079e4d9-a3e9-4054-8b50-f0222c75e880 \
     -H "Content-Type: application/json" \
     -d '{"Message": "Hello"}'
   ```
   - This should trigger the workflow and hit the Wait node

2. **Check the Wait Node**:
   - In n8n, check the Wait node execution
   - It should show the webhook URL to call: `callback-{requestId}`

3. **Manually Trigger Callback**:
   ```bash
   curl -X POST https://hoh.app.n8n.cloud/webhook/callback-{requestId} \
     -H "Content-Type: application/json" \
     -d '{"response": "This is a test response"}'
   ```

4. **Verify Response**:
   - The original request should complete and return the response

## Alternative: If External System Calls Same Webhook

If your external system MUST call back to the same webhook URL, you'll need to:

1. Store the request ID and execution ID in a database/cache
2. When callback arrives, look up the execution ID
3. Resume that specific execution

This requires additional nodes (like a database node) and is more complex.

## Troubleshooting

- **Wait node not resuming**: Check that the callback webhook path matches exactly
- **Response not returning**: Verify the "Respond to Webhook" node is connected after the Wait node
- **Timeout errors**: Increase the timeout in the Wait node settings
- **Response format issues**: Check the response body structure matches what you're extracting

