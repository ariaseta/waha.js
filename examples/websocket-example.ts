import { WahaClient } from '../src';

// Initialize the client
const client = new WahaClient({
  baseUrl: 'https://your-waha-instance.com',
  apiKey: 'your-api-key', // Optional
});

// Example: Connect to WebSocket and listen for events
async function connectWebSocket() {
  try {
    // Connect to WebSocket with options
    await client.websocket.connect({
      session: '*', // Listen to all sessions
      events: ['message', 'session.status'], // Listen to specific events
    }, {
      autoReconnect: true,
      reconnectInterval: 5000,
      maxReconnectAttempts: 10,
      pingInterval: 30000,
    });

    console.log('WebSocket connected!');

    // Listen for all messages
    client.websocket.on('message', (data) => {
      console.log('Received event:', data.event);
      console.log('Event data:', data);
    });

    // Listen for specific events
    client.websocket.on('message', (data) => {
      console.log(`Received message from ${data.payload.from}: ${data.payload.body}`);
    });

    client.websocket.on('session.status', (data) => {
      console.log(`Session ${data.session} status changed to: ${data.payload.status}`);
    });

    // Handle connection events
    client.websocket.on('open', () => {
      console.log('WebSocket connection opened');
    });

    client.websocket.on('close', (event) => {
      console.log('WebSocket connection closed:', event);
    });

    client.websocket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    client.websocket.on('reconnecting', (attempt) => {
      console.log(`Attempting to reconnect (${attempt})...`);
    });

    client.websocket.on('reconnected', () => {
      console.log('Successfully reconnected!');
    });

    client.websocket.on('reconnect_failed', () => {
      console.error('Failed to reconnect after maximum attempts');
    });

    // Keep the process running
    process.on('SIGINT', () => {
      console.log('Closing WebSocket connection...');
      client.websocket.close();
      process.exit(0);
    });

  } catch (error) {
    console.error('Error connecting to WebSocket:', error);
  }
}

// Run the example
connectWebSocket().catch(console.error);
