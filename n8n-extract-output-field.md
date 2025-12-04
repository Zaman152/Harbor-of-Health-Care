# n8n: Extract "output" Field from Array Response

## Problem
Your webhook receives a response like: `[{"output":"Hi there!..."}]`
You need to extract just the text: `"Hi there!..."` and pass it to Respond to Webhook.

## Solution Options

### Option 1: Function Node (Recommended)

#### Setup:
1. Add a **Function** node after the node that receives the array response
2. Place it before the **Respond to Webhook** node

#### Code:
```javascript
// Extract the "output" field from the first object in the array
const responseArray = $input.item.json;

// Check if it's an array and has at least one element
if (Array.isArray(responseArray) && responseArray.length > 0) {
  // Get the first object
  const firstItem = responseArray[0];
  
  // Extract the "output" field
  const outputText = firstItem?.output || firstItem?.Output || '';
  
  // Return just the text string
  return {
    json: {
      response: outputText
    }
  };
} else if (typeof responseArray === 'object' && responseArray !== null) {
  // Handle case where response is already an object (not array)
  const outputText = responseArray?.output || responseArray?.Output || '';
  return {
    json: {
      response: outputText
    }
  };
} else {
  // Fallback if structure is unexpected
  return {
    json: {
      response: String(responseArray || 'No response received')
    }
  };
}
```

#### Alternative Shorter Version:
```javascript
// Simple one-liner approach
const data = $input.item.json;
const output = Array.isArray(data) ? (data[0]?.output || data[0]?.Output || '') : (data?.output || data?.Output || '');

return {
  json: {
    response: output
  }
};
```

### Option 2: Set Node (No Code Required)

#### Setup:
1. Add a **Set** node after receiving the response
2. Configure it as follows:

#### Settings:
- **Keep Only Set Fields**: Unchecked (or checked if you want to remove other fields)
- **Fields to Add**:
  - **Name**: `response`
  - **Value**: `={{ Array.isArray($json) ? $json[0].output : $json.output }}`

#### Expression Breakdown:
- `$json` = the incoming data
- `Array.isArray($json)` = checks if it's an array
- `$json[0].output` = gets the "output" field from first array element
- `$json.output` = fallback if it's not an array

### Option 3: Code Node (If you need more control)

#### Setup:
1. Add a **Code** node
2. Use this code:

```javascript
// Get the input data
const inputData = $input.all();

// Process each item
const results = inputData.map(item => {
  const data = item.json;
  
  // Handle array response
  let outputText = '';
  
  if (Array.isArray(data)) {
    // Get first element's output field
    outputText = data[0]?.output || data[0]?.Output || '';
  } else if (data && typeof data === 'object') {
    // Handle object response
    outputText = data.output || data.Output || '';
  } else {
    // Fallback
    outputText = String(data || '');
  }
  
  return {
    json: {
      response: outputText
    }
  };
});

return results;
```

## Complete Workflow Example

```
[Webhook] → [HTTP Request/Other Node] → [Function/Set Node] → [Respond to Webhook]
```

### Respond to Webhook Configuration

After extracting the text, configure **Respond to Webhook**:

- **Response Body**:
  ```json
  {
    "response": "{{ $json.response }}"
  }
  ```

Or if you want just the plain text (no JSON wrapper):

- **Response Body**: `={{ $json.response }}`
- **Response Code**: `200`
- **Response Headers**: 
  - `Content-Type`: `text/plain` (if returning plain text)

## Testing

### Test Input:
```json
[{"output":"Hi there! How can I help you today?"}]
```

### Expected Output:
```json
{
  "response": "Hi there! How can I help you today?"
}
```

Or plain text:
```
Hi there! How can I help you today?
```

## Handling Edge Cases

### If response might have multiple objects:
```javascript
const data = $input.item.json;
let outputText = '';

if (Array.isArray(data)) {
  // Get output from first object, or concatenate all
  outputText = data.map(item => item?.output || item?.Output || '').filter(Boolean).join(' ');
} else {
  outputText = data?.output || data?.Output || '';
}

return {
  json: {
    response: outputText
  }
};
```

### If response structure varies:
```javascript
const data = $input.item.json;

// Try multiple possible structures
const outputText = 
  (Array.isArray(data) && data[0]?.output) ||
  (Array.isArray(data) && data[0]?.Output) ||
  (data?.output) ||
  (data?.Output) ||
  (data?.body?.output) ||
  (data?.response) ||
  String(data || 'No response');

return {
  json: {
    response: outputText
  }
};
```

## Recommended Setup

**For your use case, I recommend Option 1 (Function Node)** with this code:

```javascript
const data = $input.item.json;
const output = Array.isArray(data) ? (data[0]?.output || '') : (data?.output || '');

return {
  json: {
    response: output
  }
};
```

This is:
- ✅ Simple and readable
- ✅ Handles array responses
- ✅ Extracts just the text
- ✅ Works with Respond to Webhook

## Integration with Your Chatbot

After the Function/Set node extracts the text, your **Respond to Webhook** node will return:

```json
{
  "response": "Hi there! How can I help you today?"
}
```

Your React ChatWidget is already configured to read `data.response`, so this will work perfectly!

