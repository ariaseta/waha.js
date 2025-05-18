import { WahaClient } from 'waha.js';

// Initialize the client
const client = new WahaClient({
  baseUrl: 'https://wabot-bot-waha.ptnezp.easypanel.host/',
  apiKey: '321',
});

console.log('WAHA.js client initialized:', client);
const sessions =await client.sessions.list();
console.log('Sessions:', sessions);

const message = await client.chatting.sendText({
  session: 'pesanio', // Optional
  chatId: '6281318450706@c.us',
  text: 'Hello from WAHA.js!'
});

console.log(message);


// Add client to window for debugging
(window as any).wahaClient = client;
