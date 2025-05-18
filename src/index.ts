import { WahaBaseClient } from './client';
import { AuthModule } from './modules/auth';
import { ChattingModule } from './modules/chatting';
import { ChatsModule } from './modules/chats';
import { GroupsModule } from './modules/groups';
import { PresenceModule } from './modules/presence';
import { ProfileModule } from './modules/profile';
import { SessionsModule } from './modules/sessions';
import { WebSocketModule } from './modules/websocket';
import { WahaClientConfig } from './types';

/**
 * Main WAHA client that provides access to all API modules
 */
export class WahaClient extends WahaBaseClient {
  /**
   * Auth module for authentication operations
   */
  public readonly auth: AuthModule;

  /**
   * Sessions module for session management
   */
  public readonly sessions: SessionsModule;

  /**
   * Chatting module for sending messages
   */
  public readonly chatting: ChattingModule;

  /**
   * Chats module for chat operations
   */
  public readonly chats: ChatsModule;

  /**
   * Groups module for group operations
   */
  public readonly groups: GroupsModule;

  /**
   * Profile module for profile management
   */
  public readonly profile: ProfileModule;

  /**
   * Presence module for presence operations
   */
  public readonly presence: PresenceModule;

  /**
   * WebSocket module for real-time events
   */
  public readonly websocket: WebSocketModule;

  /**
   * Create a new WAHA client
   * @param config Client configuration
   */
  constructor(config: WahaClientConfig) {
    super(config);

    // Initialize modules
    this.auth = new AuthModule(this);
    this.sessions = new SessionsModule(this);
    this.chatting = new ChattingModule(this);
    this.chats = new ChatsModule(this);
    this.groups = new GroupsModule(this);
    this.profile = new ProfileModule(this);
    this.presence = new PresenceModule(this);
    this.websocket = new WebSocketModule(this);
  }
}

// Export types
export * from './types';

// Export modules
export { AuthModule } from './modules/auth';
export { SessionsModule } from './modules/sessions';
export { ChattingModule } from './modules/chatting';
export { ChatsModule } from './modules/chats';
export { GroupsModule } from './modules/groups';
export { ProfileModule } from './modules/profile';
export { PresenceModule } from './modules/presence';
export { WebSocketModule } from './modules/websocket';
