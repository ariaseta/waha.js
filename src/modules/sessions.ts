import { WahaBaseClient } from '../client';
import {
  MeInfo,
  SessionCreateRequest,
  SessionDTO,
  SessionInfo,
  SessionUpdateRequest,
} from '../types';

/**
 * Sessions module for WAHA API
 */
export class SessionsModule {
  private client: WahaBaseClient;

  /**
   * Create a new Sessions module
   * @param client Base client
   */
  constructor(client: WahaBaseClient) {
    this.client = client;
  }

  /**
   * List all sessions
   * @param all Include stopped sessions
   * @returns List of sessions
   */
  async list(all: boolean = false): Promise<SessionInfo[]> {
    return this.client['get']<SessionInfo[]>('/api/sessions', { all });
  }

  /**
   * Create a new session
   * @param data Session creation data
   * @returns Created session
   */
  async create(data: SessionCreateRequest): Promise<SessionDTO> {
    return this.client['post']<SessionDTO>('/api/sessions', data);
  }

  /**
   * Get session information
   * @param session Session name
   * @returns Session information
   */
  async get(session: string): Promise<SessionInfo> {
    const formattedSession = (this.client as any).formatSession(session);
    return this.client['get']<SessionInfo>(`/api/sessions/${formattedSession}`);
  }

  /**
   * Update a session
   * @param session Session name
   * @param data Update data
   * @returns Updated session
   */
  async update(session: string, data: SessionUpdateRequest): Promise<SessionDTO> {
    const formattedSession = (this.client as any).formatSession(session);
    return this.client['put']<SessionDTO>(`/api/sessions/${formattedSession}`, data);
  }

  /**
   * Delete a session
   * @param session Session name
   */
  async delete(session: string): Promise<void> {
    const formattedSession = (this.client as any).formatSession(session);
    await this.client['delete'](`/api/sessions/${formattedSession}`);
  }

  /**
   * Get information about the authenticated account
   * @param session Session name
   * @returns Account information
   */
  async getMe(session?: string): Promise<MeInfo> {
    const formattedSession = (this.client as any).formatSession(session);
    return this.client['get']<MeInfo>(`/api/sessions/${formattedSession}/me`);
  }

  /**
   * Start a session
   * @param session Session name
   * @returns Started session
   */
  async start(session?: string): Promise<SessionDTO> {
    const formattedSession = (this.client as any).formatSession(session);
    return this.client['post']<SessionDTO>(`/api/sessions/${formattedSession}/start`);
  }

  /**
   * Stop a session
   * @param session Session name
   * @returns Stopped session
   */
  async stop(session?: string): Promise<SessionDTO> {
    const formattedSession = (this.client as any).formatSession(session);
    return this.client['post']<SessionDTO>(`/api/sessions/${formattedSession}/stop`);
  }

  /**
   * Logout from a session
   * @param session Session name
   * @returns Session after logout
   */
  async logout(session?: string): Promise<SessionDTO> {
    const formattedSession = (this.client as any).formatSession(session);
    return this.client['post']<SessionDTO>(`/api/sessions/${formattedSession}/logout`);
  }

  /**
   * Restart a session
   * @param session Session name
   * @returns Restarted session
   */
  async restart(session?: string): Promise<SessionDTO> {
    const formattedSession = (this.client as any).formatSession(session);
    return this.client['post']<SessionDTO>(`/api/sessions/${formattedSession}/restart`);
  }
}
