/**
 * WAHA.js SDK Types
 */

// Client configuration
export interface WahaClientConfig {
  baseUrl: string;
  apiKey?: string;
  defaultSession?: string;
}

// Common types
export type SessionName = string;

// Auth types
export type QRFormat = 'image' | 'raw';

export interface GetQRParams {
  session?: SessionName;
  format: QRFormat;
}

export interface QRCodeValue {
  code: string;
}

export interface Base64File {
  mimetype: string;
  data: string;
}

export type QRResponse = Base64File | QRCodeValue;

export interface RequestCodeRequest {
  phoneNumber: string;
  method?: 'sms' | 'call';
}

// Session types
export enum SessionStatus {
  STARTING = 'STARTING',
  SCAN_QR_CODE = 'SCAN_QR_CODE',
  WORKING = 'WORKING',
  FAILED = 'FAILED',
  STOPPED = 'STOPPED',
}

export interface SessionInfo {
  id: string;
  status: SessionStatus;
  name: string;
  config?: Record<string, any>;
}

export interface SessionDTO {
  id: string;
  name: string;
  status: SessionStatus;
}

export interface SessionCreateRequest {
  name: string;
  config?: Record<string, any>;
  start?: boolean;
}

export interface SessionUpdateRequest {
  config?: Record<string, any>;
  status?: SessionStatus;
}

export interface MeInfo {
  id: string;
  pushName: string;
}

// Chatting types
export interface MessageTextRequest {
  session?: SessionName;
  chatId: string;
  text: string;
  quotedMessageId?: string;
  mentions?: string[];
}

export interface MessageImageRequest {
  session?: SessionName;
  chatId: string;
  text?: string;
  url?: string;
  base64?: string;
  file?: string;
  filename?: string;
  quotedMessageId?: string;
  mentions?: string[];
}

export interface MessageFileRequest {
  session?: SessionName;
  chatId: string;
  url?: string;
  base64?: string;
  file?: string;
  filename?: string;
  quotedMessageId?: string;
}

export interface MessageVoiceRequest {
  session?: SessionName;
  chatId: string;
  url?: string;
  base64?: string;
  file?: string;
  quotedMessageId?: string;
}

export interface MessageVideoRequest {
  session?: SessionName;
  chatId: string;
  url?: string;
  base64?: string;
  file?: string;
  filename?: string;
  caption?: string;
  quotedMessageId?: string;
  mentions?: string[];
}

export interface MessageLinkCustomPreviewRequest {
  session?: SessionName;
  chatId: string;
  url: string;
  title: string;
  description?: string;
  text?: string;
  thumbnailUrl?: string;
  quotedMessageId?: string;
}

export interface SendButtonsRequest {
  session?: SessionName;
  chatId: string;
  text: string;
  footer?: string;
  buttons: Array<{
    id: string;
    text: string;
  }>;
  quotedMessageId?: string;
}

export interface MessageForwardRequest {
  session?: SessionName;
  chatId: string;
  messageId: string;
}

export interface SendSeenRequest {
  session?: SessionName;
  chatId: string;
}

export interface ChatRequest {
  session?: SessionName;
  chatId: string;
}

export interface MessageReactionRequest {
  session?: SessionName;
  chatId: string;
  messageId: string;
  reaction: string;
}

export interface MessageStarRequest {
  session?: SessionName;
  chatId: string;
  messageId: string;
  star: boolean;
}

export interface MessagePollRequest {
  session?: SessionName;
  chatId: string;
  name: string;
  options: string[];
  multipleAnswers?: boolean;
  quotedMessageId?: string;
}

export interface MessageLocationRequest {
  session?: SessionName;
  chatId: string;
  latitude: number;
  longitude: number;
  title?: string;
  address?: string;
  quotedMessageId?: string;
}

export interface MessageContactVcardRequest {
  session?: SessionName;
  chatId: string;
  contactId: string;
  name?: string;
  quotedMessageId?: string;
}

export interface MessageButtonReply {
  session?: SessionName;
  chatId: string;
  messageId: string;
  buttonId: string;
}

// Chats types
export interface ChatSummary {
  id: string;
  name: string;
  timestamp: number;
  lastMessage?: {
    id: string;
    fromMe: boolean;
    timestamp: number;
    body: string;
  };
  picture?: {
    url: string;
  };
  unreadCount: number;
}

export interface ChatPictureResponse {
  url: string;
}

export interface ReadChatMessagesResponse {
  success: boolean;
  count: number;
}

export interface EditMessageRequest {
  text: string;
}

export interface PinMessageRequest {
  action: 'pin' | 'unpin';
}

// Profile types
export interface MyProfile {
  id: string;
  name: string;
  pushName: string;
  phone?: string;
  status?: string;
  pictureUrl?: string;
}

export interface ProfileNameRequest {
  name: string;
}

export interface ProfileStatusRequest {
  status: string;
}

export interface ProfilePictureRequest {
  url?: string;
  base64?: string;
  file?: string;
}

export interface Result {
  success: boolean;
  message?: string;
}

// Presence types
export enum PresenceStatus {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
  COMPOSING = 'composing',
  RECORDING = 'recording',
  PAUSED = 'paused',
}

export interface WAHASessionPresence {
  status: PresenceStatus;
  chatId?: string;
}

export interface WAHAChatPresences {
  id: string;
  presences: Record<string, {
    lastKnownPresence: PresenceStatus;
    lastSeen?: number;
  }>;
}
