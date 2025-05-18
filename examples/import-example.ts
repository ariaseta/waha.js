import { WahaClient } from 'waha.js';

// Initialize the client
const client = new WahaClient({
  baseUrl: 'https://your-waha-instance.com',
  apiKey: 'your-api-key', // Optional
  defaultSession: 'default', // Optional
});

// Example: Get QR code for authentication
async function getQRCode() {
  try {
    const qrCode = await client.auth.getQR({
      session: 'default',
      format: 'image',
    });
    console.log('QR Code:', qrCode);
  } catch (error) {
    console.error('Error getting QR code:', error);
  }
}

// Run examples
async function runExamples() {
  await getQRCode();
}

runExamples().catch(console.error);
