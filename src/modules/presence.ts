import { WahaBaseClient } from '../client';
import { WAHAChatPresences, WAHASessionPresence } from '../types';

/**
 * Presence module for WAHA API
 */
export class PresenceModule {
  private client: WahaBaseClient;

  /**
   * Create a new Presence module
   * @param client Base client
   */
  constructor(client: WahaBaseClient) {
    this.client = client;
  }

  /**
   * Set session presence
   * @param session Session name
   * @param data Presence data
   */
  async setPresence(session: string | undefined, data: WAHASessionPresence): Promise<void> {
    const formattedSession = (this.client as any).formatSession(session);
    await this.client['post'](`/api/${formattedSession}/presence`, data);
  }

  /**
   * Get all subscribed presence information
   * @param session Session name
   * @returns List of chat presences
   */
  async getAllPresences(session?: string): Promise<WAHAChatPresences[]> {
    const formattedSession = (this.client as any).formatSession(session);
    return this.client['get']<WAHAChatPresences[]>(`/api/${formattedSession}/presence`);
  }

  /**
   * Get the presence for a specific chat
   * @param session Session name
   * @param chatId Chat ID
   * @returns Chat presence
   */
  async getPresence(session: string | undefined, chatId: string): Promise<WAHAChatPresences> {
    const formattedSession = (this.client as any).formatSession(session);
    return this.client['get']<WAHAChatPresences>(`/api/${formattedSession}/presence/${chatId}`);
  }

  /**
   * Subscribe to presence events for a chat
   * @param session Session name
   * @param chatId Chat ID
   */
  async subscribePresence(session: string | undefined, chatId: string): Promise<void> {
    const formattedSession = (this.client as any).formatSession(session);
    await this.client['post'](`/api/${formattedSession}/presence/${chatId}/subscribe`);
  }
}
