import { WahaBaseClient } from '../client';
import {
  ChatPictureResponse,
  ChatSummary,
  EditMessageRequest,
  PinMessageRequest,
  ReadChatMessagesResponse,
} from '../types';

/**
 * Chats module for WAHA API
 */
export class ChatsModule {
  private client: WahaBaseClient;

  /**
   * Create a new Chats module
   * @param client Base client
   */
  constructor(client: WahaBaseClient) {
    this.client = client;
  }

  /**
   * Get chats
   * @param session Session name
   * @param options Query options
   * @returns List of chats
   */
  async getChats(
    session?: string,
    options: {
      sortBy?: 'conversationTimestamp' | 'id' | 'name';
      sortOrder?: 'desc' | 'asc';
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<any[]> {
    const formattedSession = (this.client as any).formatSession(session);
    return this.client['get'](`/api/${formattedSession}/chats`, options);
  }

  /**
   * Get chats overview
   * @param session Session name
   * @param options Query options
   * @returns List of chat summaries
   */
  async getChatsOverview(
    session?: string,
    options: {
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<ChatSummary[]> {
    const formattedSession = (this.client as any).formatSession(session);
    return this.client['get']<ChatSummary[]>(
      `/api/${formattedSession}/chats/overview`,
      options
    );
  }

  /**
   * Delete a chat
   * @param session Session name
   * @param chatId Chat ID
   */
  async deleteChat(session: string | undefined, chatId: string): Promise<void> {
    const formattedSession = (this.client as any).formatSession(session);
    await this.client['delete'](`/api/${formattedSession}/chats/${chatId}`);
  }

  /**
   * Get chat picture
   * @param session Session name
   * @param chatId Chat ID
   * @param refresh Refresh the picture from the server
   * @returns Chat picture URL
   */
  async getChatPicture(
    session: string | undefined,
    chatId: string,
    refresh: boolean = false
  ): Promise<ChatPictureResponse> {
    const formattedSession = (this.client as any).formatSession(session);
    return this.client['get']<ChatPictureResponse>(
      `/api/${formattedSession}/chats/${chatId}/picture`,
      { refresh }
    );
  }

  /**
   * Get messages in a chat
   * @param session Session name
   * @param chatId Chat ID
   * @param options Query options
   * @returns List of messages
   */
  async getChatMessages(
    session: string | undefined,
    chatId: string,
    options: {
      downloadMedia?: boolean;
      limit?: number;
      offset?: number;
      'filter.timestamp.lte'?: number;
      'filter.timestamp.gte'?: number;
      'filter.fromMe'?: boolean;
      'filter.ack'?: 'ERROR' | 'PENDING' | 'SERVER' | 'DEVICE' | 'READ' | 'PLAYED';
    } = {}
  ): Promise<any[]> {
    const formattedSession = (this.client as any).formatSession(session);
    return this.client['get']<any[]>(
      `/api/${formattedSession}/chats/${chatId}/messages`,
      {
        downloadMedia: true,
        limit: 10,
        ...options,
      }
    );
  }

  /**
   * Clear all messages from a chat
   * @param session Session name
   * @param chatId Chat ID
   */
  async clearMessages(session: string | undefined, chatId: string): Promise<void> {
    const formattedSession = (this.client as any).formatSession(session);
    await this.client['delete'](`/api/${formattedSession}/chats/${chatId}/messages`);
  }

  /**
   * Read unread messages in a chat
   * @param session Session name
   * @param chatId Chat ID
   * @param options Query options
   * @returns Result
   */
  async readChatMessages(
    session: string | undefined,
    chatId: string,
    options: {
      messages?: number;
      days?: number;
    } = {}
  ): Promise<ReadChatMessagesResponse> {
    const formattedSession = (this.client as any).formatSession(session);
    return this.client['post']<ReadChatMessagesResponse>(
      `/api/${formattedSession}/chats/${chatId}/messages/read`,
      {},
      { params: options }
    );
  }

  /**
   * Get a specific message by ID
   * @param session Session name
   * @param chatId Chat ID
   * @param messageId Message ID
   * @param downloadMedia Download media for the message
   * @returns Message
   */
  async getChatMessage(
    session: string | undefined,
    chatId: string,
    messageId: string,
    downloadMedia: boolean = true
  ): Promise<any> {
    const formattedSession = (this.client as any).formatSession(session);
    return this.client['get'](
      `/api/${formattedSession}/chats/${chatId}/messages/${messageId}`,
      { downloadMedia }
    );
  }

  /**
   * Delete a message from a chat
   * @param session Session name
   * @param chatId Chat ID
   * @param messageId Message ID
   */
  async deleteMessage(
    session: string | undefined,
    chatId: string,
    messageId: string
  ): Promise<void> {
    const formattedSession = (this.client as any).formatSession(session);
    await this.client['delete'](
      `/api/${formattedSession}/chats/${chatId}/messages/${messageId}`
    );
  }

  /**
   * Edit a message in a chat
   * @param session Session name
   * @param chatId Chat ID
   * @param messageId Message ID
   * @param data Edit data
   */
  async editMessage(
    session: string | undefined,
    chatId: string,
    messageId: string,
    data: EditMessageRequest
  ): Promise<void> {
    const formattedSession = (this.client as any).formatSession(session);
    await this.client['put'](
      `/api/${formattedSession}/chats/${chatId}/messages/${messageId}`,
      data
    );
  }

  /**
   * Pin a message in a chat
   * @param session Session name
   * @param chatId Chat ID
   * @param messageId Message ID
   * @param data Pin data
   */
  async pinMessage(
    session: string | undefined,
    chatId: string,
    messageId: string,
    data: PinMessageRequest
  ): Promise<void> {
    const formattedSession = (this.client as any).formatSession(session);
    await this.client['post'](
      `/api/${formattedSession}/chats/${chatId}/messages/${messageId}/pin`,
      data
    );
  }

  /**
   * Unpin a message in a chat
   * @param session Session name
   * @param chatId Chat ID
   * @param messageId Message ID
   */
  async unpinMessage(
    session: string | undefined,
    chatId: string,
    messageId: string
  ): Promise<void> {
    const formattedSession = (this.client as any).formatSession(session);
    await this.client['post'](
      `/api/${formattedSession}/chats/${chatId}/messages/${messageId}/unpin`
    );
  }

  /**
   * Archive a chat
   * @param session Session name
   * @param chatId Chat ID
   * @returns Result
   */
  async archiveChat(session: string | undefined, chatId: string): Promise<any> {
    const formattedSession = (this.client as any).formatSession(session);
    return this.client['post'](
      `/api/${formattedSession}/chats/${chatId}/archive`
    );
  }

  /**
   * Unarchive a chat
   * @param session Session name
   * @param chatId Chat ID
   * @returns Result
   */
  async unarchiveChat(session: string | undefined, chatId: string): Promise<any> {
    const formattedSession = (this.client as any).formatSession(session);
    return this.client['post'](
      `/api/${formattedSession}/chats/${chatId}/unarchive`
    );
  }

  /**
   * Mark a chat as unread
   * @param session Session name
   * @param chatId Chat ID
   * @returns Result
   */
  async markChatUnread(session: string | undefined, chatId: string): Promise<any> {
    const formattedSession = (this.client as any).formatSession(session);
    return this.client['post'](
      `/api/${formattedSession}/chats/${chatId}/unread`
    );
  }
}
