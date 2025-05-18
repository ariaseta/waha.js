import { WahaBaseClient } from '../client';
import { GetQRParams, QRResponse, RequestCodeRequest } from '../types';

/**
 * Auth module for WAHA API
 */
export class AuthModule {
  private client: WahaBaseClient;

  /**
   * Create a new Auth module
   * @param client Base client
   */
  constructor(client: WahaBaseClient) {
    this.client = client;
  }

  /**
   * Get QR code for pairing WhatsApp API
   * @param params QR code parameters
   * @returns QR code as image or raw data
   */
  async getQR(params: GetQRParams): Promise<QRResponse> {
    const { session, format } = params;
    const formattedSession = (this.client as any).formatSession(session);
    
    return this.client['get']<QRResponse>(
      `/api/${formattedSession}/auth/qr`,
      { format }
    );
  }

  /**
   * Request authentication code
   * @param session Session name
   * @param data Request data
   * @returns Promise that resolves when the request is successful
   */
  async requestCode(session: string | undefined, data: RequestCodeRequest): Promise<void> {
    const formattedSession = (this.client as any).formatSession(session);
    
    await this.client['post'](
      `/api/${formattedSession}/auth/request-code`,
      data
    );
  }
}
