// n8n Function Node - Extract "output" from Array Response
// Copy this code into your Function node in n8n

const data = $input.item.json;

// Extract "output" field from array [{"output":"text"}]
const outputText = Array.isArray(data) 
  ? (data[0]?.output || data[0]?.Output || '') 
  : (data?.output || data?.Output || '');

// Return as object with "response" field for Respond to Webhook
return {
  json: {
    response: outputText
  }
};

