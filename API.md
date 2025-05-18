# WAHA.js API Reference

## Client Initialization

```typescript
import { WahaClient } from 'waha.js';

const client = new WahaClient({
  baseUrl: 'https://your-waha-instance.com',
  apiKey: 'your-api-key', // Optional
  defaultSession: 'default' // Optional, defaults to 'default'
});
```

## Auth Module

### Get QR Code

```typescript
const qrCode = await client.auth.getQR({
  session: 'default', // Optional, defaults to client's defaultSession
  format: 'image' // 'image' or 'raw'
});
```

### Request Authentication Code

```typescript
await client.auth.requestCode('default', {
  phoneNumber: '1234567890',
  method: 'sms' // 'sms' or 'call'
});
```

## Sessions Module

### List Sessions

```typescript
const sessions = await client.sessions.list(true); // true to include stopped sessions
```

### Create Session

```typescript
const session = await client.sessions.create({
  name: 'my-session',
  config: {
    // Optional configuration
  },
  start: true // Start the session immediately
});
```

### Get Session Info

```typescript
const sessionInfo = await client.sessions.get('my-session');
```

### Update Session

```typescript
const updatedSession = await client.sessions.update('my-session', {
  config: {
    // Updated configuration
  }
});
```

### Delete Session

```typescript
await client.sessions.delete('my-session');
```

### Get Account Info

```typescript
const accountInfo = await client.sessions.getMe('my-session');
```

### Start Session

```typescript
const startedSession = await client.sessions.start('my-session');
```

### Stop Session

```typescript
const stoppedSession = await client.sessions.stop('my-session');
```

### Logout Session

```typescript
const loggedOutSession = await client.sessions.logout('my-session');
```

### Restart Session

```typescript
const restartedSession = await client.sessions.restart('my-session');
```

## Chatting Module

### Send Text Message

```typescript
const message = await client.chatting.sendText({
  session: 'default', // Optional
  chatId: '1234567890@c.us',
  text: 'Hello from WAHA.js!',
  quotedMessageId: 'message-id', // Optional
  mentions: ['1234567890@c.us'] // Optional
});
```

### Send Image

```typescript
const message = await client.chatting.sendImage({
  session: 'default', // Optional
  chatId: '1234567890@c.us',
  text: 'Check out this image!', // Optional
  url: 'https://example.com/image.jpg', // Either url, base64, or file
  // base64: 'base64-encoded-image',
  // file: '/path/to/image.jpg',
  filename: 'image.jpg', // Optional
  quotedMessageId: 'message-id', // Optional
  mentions: ['1234567890@c.us'] // Optional
});
```

### Send File

```typescript
const message = await client.chatting.sendFile({
  session: 'default', // Optional
  chatId: '1234567890@c.us',
  url: 'https://example.com/file.pdf', // Either url, base64, or file
  // base64: 'base64-encoded-file',
  // file: '/path/to/file.pdf',
  filename: 'document.pdf', // Optional
  quotedMessageId: 'message-id' // Optional
});
```

### Send Voice Message

```typescript
const message = await client.chatting.sendVoice({
  session: 'default', // Optional
  chatId: '1234567890@c.us',
  url: 'https://example.com/audio.mp3', // Either url, base64, or file
  // base64: 'base64-encoded-audio',
  // file: '/path/to/audio.mp3',
  quotedMessageId: 'message-id' // Optional
});
```

### Send Video

```typescript
const message = await client.chatting.sendVideo({
  session: 'default', // Optional
  chatId: '1234567890@c.us',
  url: 'https://example.com/video.mp4', // Either url, base64, or file
  // base64: 'base64-encoded-video',
  // file: '/path/to/video.mp4',
  filename: 'video.mp4', // Optional
  caption: 'Check out this video!', // Optional
  quotedMessageId: 'message-id', // Optional
  mentions: ['1234567890@c.us'] // Optional
});
```

### Send Buttons

```typescript
const message = await client.chatting.sendButtons({
  session: 'default', // Optional
  chatId: '1234567890@c.us',
  text: 'Please select an option:',
  footer: 'Powered by WAHA.js', // Optional
  buttons: [
    { id: 'btn1', text: 'Option 1' },
    { id: 'btn2', text: 'Option 2' },
    { id: 'btn3', text: 'Option 3' }
  ],
  quotedMessageId: 'message-id' // Optional
});
```

### Send Poll

```typescript
const message = await client.chatting.sendPoll({
  session: 'default', // Optional
  chatId: '1234567890@c.us',
  name: 'What is your favorite color?',
  options: ['Red', 'Green', 'Blue', 'Yellow'],
  multipleAnswers: false, // Optional
  quotedMessageId: 'message-id' // Optional
});
```

## Chats Module

### Get Chats

```typescript
const chats = await client.chats.getChats('default', {
  sortBy: 'conversationTimestamp', // Optional: 'conversationTimestamp', 'id', or 'name'
  sortOrder: 'desc', // Optional: 'desc' or 'asc'
  limit: 20, // Optional
  offset: 0 // Optional
});
```

### Get Chats Overview

```typescript
const chatsOverview = await client.chats.getChatsOverview('default', {
  limit: 20, // Optional
  offset: 0 // Optional
});
```

### Get Chat Messages

```typescript
const messages = await client.chats.getChatMessages('default', '1234567890@c.us', {
  downloadMedia: true, // Optional
  limit: 20, // Optional
  offset: 0, // Optional
  'filter.timestamp.lte': Date.now(), // Optional
  'filter.timestamp.gte': Date.now() - 86400000, // Optional
  'filter.fromMe': true, // Optional
  'filter.ack': 'READ' // Optional: 'ERROR', 'PENDING', 'SERVER', 'DEVICE', 'READ', 'PLAYED'
});
```

## Profile Module

### Get My Profile

```typescript
const profile = await client.profile.getMyProfile('default');
```

### Set Profile Name

```typescript
const result = await client.profile.setProfileName('default', {
  name: 'New Name'
});
```

### Set Profile Status

```typescript
const result = await client.profile.setProfileStatus('default', {
  status: 'Hello, I am using WAHA.js!'
});
```

## Groups Module

### Create Group

```typescript
const group = await client.groups.create(
  'default',
  'My New Group',
  ['1234567890@c.us', '0987654321@c.us']
);
```

### Get All Groups

```typescript
const groups = await client.groups.getAll('default');
```

### Add Participants

```typescript
await client.groups.addParticipants(
  'default',
  '123456789-987654321@g.us',
  ['1234567890@c.us', '0987654321@c.us']
);
```

## Presence Module

### Set Presence

```typescript
await client.presence.setPresence('default', {
  status: 'composing', // 'available', 'unavailable', 'composing', 'recording', 'paused'
  chatId: '1234567890@c.us' // Required for composing, recording, paused
});
```

### Get Presence

```typescript
const presence = await client.presence.getPresence('default', '1234567890@c.us');
```
