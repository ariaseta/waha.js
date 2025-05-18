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

## Development

### Prerequisites

- [Bun](https://bun.sh/) (>= 1.0.0)
- Node.js (>= 14.0.0)

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/waha.js.git
cd waha.js

# Install dependencies
bun install
```

### Building

```bash
# Build the package
bun run build
```

### Testing

```bash
# Run tests
bun test
```

## Publishing to npm

To publish this package to npm, follow these steps:

1. Make sure you have an npm account and are logged in:

```bash
npm login
```

2. Update the version in `package.json` following [Semantic Versioning](https://semver.org/):

```bash
# For a patch release (bug fixes)
npm version patch

# For a minor release (new features, backward compatible)
npm version minor

# For a major release (breaking changes)
npm version major
```

3. Build the package:

```bash
bun run build
```

4. Publish to npm:

```bash
npm publish
```

For scoped packages (e.g., @yourusername/waha.js), use:

```bash
npm publish --access public
```

### Publishing a Beta Version

To publish a beta version:

```bash
# Update version with beta tag
npm version prerelease --preid=beta

# Publish with beta tag
npm publish --tag beta
```

Users can then install the beta version with:

```bash
npm install waha.js@beta
```

### Package Files

The package includes the following configuration files:

- `.gitignore`: Specifies files that should be ignored by Git
- `.npmignore`: Specifies files that should be excluded when publishing to npm
- `.npmrc`: Contains npm configuration settings for the package

When publishing to npm, only the following files will be included:
- `dist/`: The compiled JavaScript and TypeScript declaration files
- `README.md`: The main documentation file
- `LICENSE`: The license file
- `API.md`: API reference documentation
- `package.json`: Package metadata and dependencies

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

For detailed API documentation, see the [API Reference](./API.md).

## License

MIT
