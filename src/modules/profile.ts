import { WahaBaseClient } from '../client';
import {
  MyProfile,
  ProfileNameRequest,
  ProfilePictureRequest,
  ProfileStatusRequest,
  Result,
} from '../types';

/**
 * Profile module for WAHA API
 */
export class ProfileModule {
  private client: WahaBaseClient;

  /**
   * Create a new Profile module
   * @param client Base client
   */
  constructor(client: WahaBaseClient) {
    this.client = client;
  }

  /**
   * Get my profile
   * @param session Session name
   * @returns Profile information
   */
  async getMyProfile(session?: string): Promise<MyProfile> {
    const formattedSession = (this.client as any).formatSession(session);
    return this.client['get']<MyProfile>(`/api/${formattedSession}/profile`);
  }

  /**
   * Set my profile name
   * @param session Session name
   * @param data Profile name data
   * @returns Result
   */
  async setProfileName(session: string | undefined, data: ProfileNameRequest): Promise<Result> {
    const formattedSession = (this.client as any).formatSession(session);
    return this.client['put']<Result>(`/api/${formattedSession}/profile/name`, data);
  }

  /**
   * Set profile status (About)
   * @param session Session name
   * @param data Profile status data
   * @returns Result
   */
  async setProfileStatus(session: string | undefined, data: ProfileStatusRequest): Promise<Result> {
    const formattedSession = (this.client as any).formatSession(session);
    return this.client['put']<Result>(`/api/${formattedSession}/profile/status`, data);
  }

  /**
   * Set profile picture
   * @param session Session name
   * @param data Profile picture data
   * @returns Result
   */
  async setProfilePicture(session: string | undefined, data: ProfilePictureRequest): Promise<Result> {
    const formattedSession = (this.client as any).formatSession(session);
    return this.client['put']<Result>(`/api/${formattedSession}/profile/picture`, data);
  }

  /**
   * Delete profile picture
   * @param session Session name
   * @returns Result
   */
  async deleteProfilePicture(session?: string): Promise<Result> {
    const formattedSession = (this.client as any).formatSession(session);
    return this.client['delete']<Result>(`/api/${formattedSession}/profile/picture`);
  }
}
