# WAHA.js

A TypeScript SDK for WAHA (WhatsApp HTTP API) that makes it easy to integrate with a WAHA instance.

## Installation

```bash
# Using npm
npm install waha.js

# Using yarn
yarn add waha.js

# Using bun
bun add waha.js
```

## Usage

```typescript
import { WahaClient } from 'waha.js';

// Initialize the client
const client = new WahaClient({
  baseUrl: 'https://your-waha-instance.com',
  apiKey: 'your-api-key', // Optional
});

// Example: Send a text message
async function sendMessage() {
  try {
    const response = await client.chatting.sendText({
      session: 'default',
      chatId: '1234567890@c.us',
      text: 'Hello from WAHA.js!'
    });
    console.log('Message sent:', response);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

// Example: Get QR code for authentication
async function getQRCode() {
  try {
    const qrCode = await client.auth.getQR({
      session: 'default',
      format: 'image'
    });
    console.log('QR Code:', qrCode);
  } catch (error) {
    console.error('Error getting QR code:', error);
  }
}
```

## Features

- Full TypeScript support with comprehensive type definitions
- Covers all WAHA API endpoints
- Promise-based API
- Error handling
- Session management
- Authentication
- Messaging
- Group management
- Profile management
- Real-time event handling via WebSockets
- And more...

## API Documentation

### Client Initialization

```typescript
const client = new WahaClient({
  baseUrl: 'https://your-waha-instance.com', // Required
  apiKey: 'your-api-key', // Optional
  defaultSession: 'default' // Optional, defaults to 'default'
});
```

### Available Modules

- `auth`: Authentication operations
- `sessions`: Session management
- `chatting`: Sending messages
- `chats`: Chat operations
- `groups`: Group operations
- `profile`: Profile management
- `presence`: Presence operations
- `websocket`: Real-time event handling via WebSockets

For detailed API documentation, see the [API Reference](./API.md).

## License

MIT

## Development and Publishing

For information on developing and publishing this package, please see the [Development Guide](./DEVELOPMENT.md).
