import { WahaClient } from '../src';

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

// Example: Send a text message
async function sendTextMessage() {
  try {
    const response = await client.chatting.sendText({
      session: 'default',
      chatId: '1234567890@c.us',
      text: 'Hello from WAHA.js!',
    });
    console.log('Message sent:', response);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

// Example: Get all chats
async function getAllChats() {
  try {
    const chats = await client.chats.getChats('default');
    console.log('Chats:', chats);
  } catch (error) {
    console.error('Error getting chats:', error);
  }
}

// Example: Create a new group
async function createGroup() {
  try {
    const group = await client.groups.create(
      'default',
      'My Test Group',
      ['1234567890@c.us', '0987654321@c.us']
    );
    console.log('Group created:', group);
  } catch (error) {
    console.error('Error creating group:', error);
  }
}

// Example: Set profile status
async function setProfileStatus() {
  try {
    const result = await client.profile.setProfileStatus('default', {
      status: 'Hello, I am using WAHA.js!',
    });
    console.log('Profile status updated:', result);
  } catch (error) {
    console.error('Error updating profile status:', error);
  }
}

// Example: Set presence (typing)
async function startTyping() {
  try {
    await client.presence.setPresence('default', {
      status: 'composing',
      chatId: '1234567890@c.us',
    });
    console.log('Started typing');
    
    // Stop typing after 3 seconds
    setTimeout(async () => {
      await client.presence.setPresence('default', {
        status: 'paused',
        chatId: '1234567890@c.us',
      });
      console.log('Stopped typing');
    }, 3000);
  } catch (error) {
    console.error('Error setting presence:', error);
  }
}

// Run examples
async function runExamples() {
  // Uncomment the examples you want to run
  // await getQRCode();
  // await sendTextMessage();
  // await getAllChats();
  // await createGroup();
  // await setProfileStatus();
  // await startTyping();
}

runExamples().catch(console.error);
