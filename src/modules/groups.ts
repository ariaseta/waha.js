import { WahaBaseClient } from '../client';

/**
 * Groups module for WAHA API
 */
export class GroupsModule {
  private client: WahaBaseClient;

  /**
   * Create a new Groups module
   * @param client Base client
   */
  constructor(client: WahaBaseClient) {
    this.client = client;
  }

  /**
   * Create a group
   * @param session Session name
   * @param name Group name
   * @param participants Array of participant IDs
   * @returns Created group
   */
  async create(
    session: string | undefined,
    name: string,
    participants: string[]
  ): Promise<any> {
    const formattedSession = (this.client as any).formatSession(session);
    return this.client['post'](`/api/${formattedSession}/groups`, {
      name,
      participants,
    });
  }

  /**
   * Get all groups
   * @param session Session name
   * @returns List of groups
   */
  async getAll(session?: string): Promise<any[]> {
    const formattedSession = (this.client as any).formatSession(session);
    return this.client['get']<any[]>(`/api/${formattedSession}/groups`);
  }

  /**
   * Get group info
   * @param session Session name
   * @param id Group ID
   * @returns Group information
   */
  async getInfo(session: string | undefined, id: string): Promise<any> {
    const formattedSession = (this.client as any).formatSession(session);
    return this.client['get'](`/api/${formattedSession}/groups/${id}`);
  }

  /**
   * Update group subject (name)
   * @param session Session name
   * @param id Group ID
   * @param subject New group subject
   */
  async updateSubject(
    session: string | undefined,
    id: string,
    subject: string
  ): Promise<void> {
    const formattedSession = (this.client as any).formatSession(session);
    await this.client['put'](`/api/${formattedSession}/groups/${id}/subject`, {
      subject,
    });
  }

  /**
   * Update group description
   * @param session Session name
   * @param id Group ID
   * @param description New group description
   */
  async updateDescription(
    session: string | undefined,
    id: string,
    description: string
  ): Promise<void> {
    const formattedSession = (this.client as any).formatSession(session);
    await this.client['put'](`/api/${formattedSession}/groups/${id}/description`, {
      description,
    });
  }

  /**
   * Get group invite code
   * @param session Session name
   * @param id Group ID
   * @returns Invite code
   */
  async getInviteCode(session: string | undefined, id: string): Promise<string> {
    const formattedSession = (this.client as any).formatSession(session);
    const response = await this.client['get'](`/api/${formattedSession}/groups/${id}/invite-code`);
    return response.code;
  }

  /**
   * Revoke group invite code
   * @param session Session name
   * @param id Group ID
   * @returns New invite code
   */
  async revokeInviteCode(session: string | undefined, id: string): Promise<string> {
    const formattedSession = (this.client as any).formatSession(session);
    const response = await this.client['post'](`/api/${formattedSession}/groups/${id}/invite-code`);
    return response.code;
  }

  /**
   * Leave a group
   * @param session Session name
   * @param id Group ID
   */
  async leave(session: string | undefined, id: string): Promise<void> {
    const formattedSession = (this.client as any).formatSession(session);
    await this.client['post'](`/api/${formattedSession}/groups/${id}/leave`);
  }

  /**
   * Add participants to a group
   * @param session Session name
   * @param id Group ID
   * @param participants Array of participant IDs
   */
  async addParticipants(
    session: string | undefined,
    id: string,
    participants: string[]
  ): Promise<void> {
    const formattedSession = (this.client as any).formatSession(session);
    await this.client['post'](`/api/${formattedSession}/groups/${id}/participants/add`, {
      participants,
    });
  }

  /**
   * Remove participants from a group
   * @param session Session name
   * @param id Group ID
   * @param participants Array of participant IDs
   */
  async removeParticipants(
    session: string | undefined,
    id: string,
    participants: string[]
  ): Promise<void> {
    const formattedSession = (this.client as any).formatSession(session);
    await this.client['post'](`/api/${formattedSession}/groups/${id}/participants/remove`, {
      participants,
    });
  }

  /**
   * Promote participants to admin
   * @param session Session name
   * @param id Group ID
   * @param participants Array of participant IDs
   */
  async promoteToAdmin(
    session: string | undefined,
    id: string,
    participants: string[]
  ): Promise<void> {
    const formattedSession = (this.client as any).formatSession(session);
    await this.client['post'](`/api/${formattedSession}/groups/${id}/admin/promote`, {
      participants,
    });
  }

  /**
   * Demote participants from admin
   * @param session Session name
   * @param id Group ID
   * @param participants Array of participant IDs
   */
  async demoteFromAdmin(
    session: string | undefined,
    id: string,
    participants: string[]
  ): Promise<void> {
    const formattedSession = (this.client as any).formatSession(session);
    await this.client['post'](`/api/${formattedSession}/groups/${id}/admin/demote`, {
      participants,
    });
  }
}
