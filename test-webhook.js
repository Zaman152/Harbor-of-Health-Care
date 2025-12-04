// Test n8n Webhook - Extract "output" from Array Response
// Run with: node test-webhook.js

const fetch = require('node-fetch'); // For Node.js < 18
// For Node.js 18+, you can use native fetch

async function sendMessageToWebhook(message) {
  const webhookUrl = 'https://hoh.app.n8n.cloud/webhook/d079e4d9-a3e9-4054-8b50-f0222c75e880';
  
  try {
    // 1. Send message to webhook
    console.log('Sending message to webhook...');
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Message: message,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 2. Wait for response
    const data = await response.json();
    console.log('Raw response:', JSON.stringify(data, null, 2));

    // 3. Extract "output" field from array [{"output":"text"}]
    let outputText = '';
    
    if (Array.isArray(data)) {
      // Handle array response: [{"output":"text"}]
      outputText = data[0]?.output || data[0]?.Output || '';
    } else if (data && typeof data === 'object') {
      // Handle object response: {"output":"text"} or {"response":"text"}
      outputText = data.output || data.Output || data.response || data.Response || '';
    } else if (typeof data === 'string') {
      // Handle string response
      outputText = data;
    }

    // 4. Return/display plain text
    if (outputText) {
      console.log('\n✅ Extracted Output:');
      console.log(outputText);
      return outputText;
    } else {
      console.log('\n⚠️  No output field found in response');
      console.log('Full response:', JSON.stringify(data, null, 2));
      return null;
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  }
}

// Example usage
if (require.main === module) {
  const message = process.argv[2] || 'Hello, how can you help me?';
  sendMessageToWebhook(message)
    .then(output => {
      if (output) {
        process.exit(0);
      } else {
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('Failed:', error);
      process.exit(1);
    });
}

module.exports = { sendMessageToWebhook };

