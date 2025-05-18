import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { WahaClientConfig } from './types';

/**
 * Base client for making API requests to WAHA
 */
export class WahaBaseClient {
  protected readonly client: AxiosInstance;
  protected readonly config: WahaClientConfig;

  /**
   * Create a new WAHA client
   * @param config Client configuration
   */
  constructor(config: WahaClientConfig) {
    this.config = {
      defaultSession: 'default',
      ...config,
    };

    // Create axios instance
    this.client = axios.create({
      baseURL: this.config.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey ? { 'X-Api-Key': this.config.apiKey } : {}),
      },
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const { status, data } = error.response;
          return Promise.reject({
            status,
            message: data.message || 'Unknown error',
            data,
          });
        } else if (error.request) {
          // The request was made but no response was received
          return Promise.reject({
            message: 'No response received from server',
            request: error.request,
          });
        } else {
          // Something happened in setting up the request that triggered an Error
          return Promise.reject({
            message: error.message || 'Request setup error',
          });
        }
      }
    );
  }

  /**
   * Make a GET request
   * @param url API endpoint
   * @param params Query parameters
   * @param config Additional axios config
   * @returns Promise with response data
   */
  protected async get<T = any>(
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, {
      params,
      ...config,
    });
    return response.data;
  }

  /**
   * Make a POST request
   * @param url API endpoint
   * @param data Request body
   * @param config Additional axios config
   * @returns Promise with response data
   */
  protected async post<T = any>(
    url: string,
    data?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data, config);
    return response.data;
  }

  /**
   * Make a PUT request
   * @param url API endpoint
   * @param data Request body
   * @param config Additional axios config
   * @returns Promise with response data
   */
  protected async put<T = any>(
    url: string,
    data?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config);
    return response.data;
  }

  /**
   * Make a DELETE request
   * @param url API endpoint
   * @param config Additional axios config
   * @returns Promise with response data
   */
  protected async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config);
    return response.data;
  }

  /**
   * Get the default session name
   * @returns Default session name
   */
  protected getDefaultSession(): string {
    return this.config.defaultSession || 'default';
  }

  /**
   * Format session parameter for URL
   * @param session Session name or undefined to use default
   * @returns Formatted session name
   */
  protected formatSession(session?: string): string {
    return session || this.getDefaultSession();
  }
}
