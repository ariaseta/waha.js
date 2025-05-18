import { WahaClient } from 'waha.js';

// Initialize the client
const client = new WahaClient({
  baseUrl: 'https://your-waha-instance.com',
  apiKey: 'your-api-key',
  defaultSession: 'default',
});

console.log('WAHA.js client initialized:', client);

// Add client to window for debugging
(window as any).wahaClient = client;
