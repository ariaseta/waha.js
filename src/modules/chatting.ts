import { WahaBaseClient } from '../client';
import {
  ChatRequest,
  MessageButtonReply,
  MessageContactVcardRequest,
  MessageFileRequest,
  MessageForwardRequest,
  MessageImageRequest,
  MessageLinkCustomPreviewRequest,
  MessageLocationRequest,
  MessagePollRequest,
  MessageReactionRequest,
  MessageStarRequest,
  MessageTextRequest,
  MessageVideoRequest,
  MessageVoiceRequest,
  SendButtonsRequest,
  SendSeenRequest,
} from '../types';

/**
 * Chatting module for WAHA API
 */
export class ChattingModule {
  private client: WahaBaseClient;

  /**
   * Create a new Chatting module
   * @param client Base client
   */
  constructor(client: WahaBaseClient) {
    this.client = client;
  }

  /**
   * Send a text message
   * @param data Message data
   * @returns Sent message
   */
  async sendText(data: MessageTextRequest): Promise<any> {
    return this.client['post']('/api/sendText', {
      session: (this.client as any).formatSession(data.session),
      ...data,
    });
  }

  /**
   * Send an image
   * @param data Image data
   * @returns Sent message
   */
  async sendImage(data: MessageImageRequest): Promise<any> {
    return this.client['post']('/api/sendImage', {
      session: (this.client as any).formatSession(data.session),
      ...data,
    });
  }

  /**
   * Send a file
   * @param data File data
   * @returns Sent message
   */
  async sendFile(data: MessageFileRequest): Promise<any> {
    return this.client['post']('/api/sendFile', {
      session: (this.client as any).formatSession(data.session),
      ...data,
    });
  }

  /**
   * Send a voice message
   * @param data Voice data
   * @returns Sent message
   */
  async sendVoice(data: MessageVoiceRequest): Promise<any> {
    return this.client['post']('/api/sendVoice', {
      session: (this.client as any).formatSession(data.session),
      ...data,
    });
  }

  /**
   * Send a video
   * @param data Video data
   * @returns Sent message
   */
  async sendVideo(data: MessageVideoRequest): Promise<any> {
    return this.client['post']('/api/sendVideo', {
      session: (this.client as any).formatSession(data.session),
      ...data,
    });
  }

  /**
   * Send a text message with a custom link preview
   * @param data Link preview data
   * @returns Sent message
   */
  async sendLinkWithCustomPreview(data: MessageLinkCustomPreviewRequest): Promise<any> {
    return this.client['post']('/api/send/link-custom-preview', {
      session: (this.client as any).formatSession(data.session),
      ...data,
    });
  }

  /**
   * Send buttons (interactive message)
   * @param data Button data
   * @returns Sent message
   */
  async sendButtons(data: SendButtonsRequest): Promise<any> {
    return this.client['post']('/api/sendButtons', {
      session: (this.client as any).formatSession(data.session),
      ...data,
    });
  }

  /**
   * Forward a message
   * @param data Forward data
   * @returns Forwarded message
   */
  async forwardMessage(data: MessageForwardRequest): Promise<any> {
    return this.client['post']('/api/forwardMessage', {
      session: (this.client as any).formatSession(data.session),
      ...data,
    });
  }

  /**
   * Mark messages as seen
   * @param data Chat data
   * @returns Result
   */
  async sendSeen(data: SendSeenRequest): Promise<any> {
    return this.client['post']('/api/sendSeen', {
      session: (this.client as any).formatSession(data.session),
      ...data,
    });
  }

  /**
   * Start typing in a chat
   * @param data Chat data
   * @returns Result
   */
  async startTyping(data: ChatRequest): Promise<void> {
    await this.client['post']('/api/startTyping', {
      session: (this.client as any).formatSession(data.session),
      ...data,
    });
  }

  /**
   * Stop typing in a chat
   * @param data Chat data
   * @returns Result
   */
  async stopTyping(data: ChatRequest): Promise<void> {
    await this.client['post']('/api/stopTyping', {
      session: (this.client as any).formatSession(data.session),
      ...data,
    });
  }

  /**
   * React to a message with an emoji
   * @param data Reaction data
   * @returns Result
   */
  async setReaction(data: MessageReactionRequest): Promise<any> {
    return this.client['put']('/api/reaction', {
      session: (this.client as any).formatSession(data.session),
      ...data,
    });
  }

  /**
   * Star or unstar a message
   * @param data Star data
   * @returns Result
   */
  async setStar(data: MessageStarRequest): Promise<void> {
    await this.client['put']('/api/star', {
      session: (this.client as any).formatSession(data.session),
      ...data,
    });
  }

  /**
   * Send a poll with options
   * @param data Poll data
   * @returns Sent message
   */
  async sendPoll(data: MessagePollRequest): Promise<any> {
    return this.client['post']('/api/sendPoll', {
      session: (this.client as any).formatSession(data.session),
      ...data,
    });
  }

  /**
   * Send a location
   * @param data Location data
   * @returns Sent message
   */
  async sendLocation(data: MessageLocationRequest): Promise<any> {
    return this.client['post']('/api/sendLocation', {
      session: (this.client as any).formatSession(data.session),
      ...data,
    });
  }

  /**
   * Send a contact card
   * @param data Contact data
   * @returns Sent message
   */
  async sendContactVcard(data: MessageContactVcardRequest): Promise<any> {
    return this.client['post']('/api/sendContactVcard', {
      session: (this.client as any).formatSession(data.session),
      ...data,
    });
  }

  /**
   * Reply to a button message
   * @param data Button reply data
   * @returns Result
   */
  async sendButtonsReply(data: MessageButtonReply): Promise<any> {
    return this.client['post']('/api/send/buttons/reply', {
      session: (this.client as any).formatSession(data.session),
      ...data,
    });
  }
}
