import { WahaBaseClient } from '../client';
import { WebSocketConfig, WebSocketEventPayload, WebSocketOptions } from '../types';
import { EventEmitter } from 'events';

/**
 * WebSocket module for WAHA API
 * Allows real-time communication with the WAHA server
 */
export class WebSocketModule extends EventEmitter {
  private client: WahaBaseClient;
  private socket: WebSocket | null = null;
  private config: Required<WebSocketConfig>;
  private reconnectAttempts = 0;
  private pingInterval: NodeJS.Timeout | null = null;
  private isConnected = false;
  private isReconnecting = false;
  private url: string = '';

  /**
   * Create a new WebSocket module
   * @param client Base client
   */
  constructor(client: WahaBaseClient) {
    super();
    this.client = client;
    
    // Default configuration
    this.config = {
      autoReconnect: true,
      reconnectInterval: 5000, // 5 seconds
      maxReconnectAttempts: 10,
      pingInterval: 30000, // 30 seconds
    };
  }

  /**
   * Connect to the WebSocket server
   * @param options WebSocket options
   * @param config WebSocket configuration
   * @returns Promise that resolves when connected
   */
  async connect(options: WebSocketOptions = {}, config: WebSocketConfig = {}): Promise<void> {
    // Update config with provided values
    this.config = {
      ...this.config,
      ...config,
    };

    // Close existing connection if any
    if (this.socket) {
      this.close();
    }

    // Build WebSocket URL
    this.url = this.buildWebSocketUrl(options);

    return new Promise((resolve, reject) => {
      try {
        this.socket = new WebSocket(this.url);

        // Set up event handlers
        this.socket.onopen = () => {
          this.isConnected = true;
          this.reconnectAttempts = 0;
          this.startPingInterval();
          this.emit('open');
          resolve();
        };

        this.socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data) as WebSocketEventPayload;
            this.emit('message', data);
            this.emit(data.event, data);
          } catch (error) {
            this.emit('error', new Error(`Failed to parse WebSocket message: ${error}`));
          }
        };

        this.socket.onerror = (error) => {
          this.emit('error', error);
          reject(error);
        };

        this.socket.onclose = (event) => {
          this.isConnected = false;
          this.stopPingInterval();
          this.emit('close', event);

          // Attempt to reconnect if enabled
          if (this.config.autoReconnect && !this.isReconnecting) {
            this.attemptReconnect();
          }
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Close the WebSocket connection
   */
  close(): void {
    this.isReconnecting = false;
    this.stopPingInterval();
    
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  /**
   * Check if the WebSocket is connected
   * @returns True if connected
   */
  isOpen(): boolean {
    return this.isConnected && this.socket?.readyState === WebSocket.OPEN;
  }

  /**
   * Send a ping to keep the connection alive
   */
  private ping(): void {
    if (this.isOpen()) {
      this.socket?.send(JSON.stringify({ type: 'ping' }));
    }
  }

  /**
   * Start the ping interval
   */
  private startPingInterval(): void {
    this.stopPingInterval();
    if (this.config.pingInterval > 0) {
      this.pingInterval = setInterval(() => this.ping(), this.config.pingInterval);
    }
  }

  /**
   * Stop the ping interval
   */
  private stopPingInterval(): void {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  /**
   * Attempt to reconnect to the WebSocket server
   */
  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.config.maxReconnectAttempts) {
      this.emit('reconnect_failed');
      return;
    }

    this.isReconnecting = true;
    this.reconnectAttempts++;
    
    this.emit('reconnecting', this.reconnectAttempts);
    
    setTimeout(() => {
      this.connect()
        .then(() => {
          this.isReconnecting = false;
          this.emit('reconnected');
        })
        .catch(() => {
          this.isReconnecting = false;
        });
    }, this.config.reconnectInterval);
  }

  /**
   * Build the WebSocket URL with query parameters
   * @param options WebSocket options
   * @returns WebSocket URL
   */
  private buildWebSocketUrl(options: WebSocketOptions): string {
    const baseUrl = (this.client as any).config.baseUrl;
    const apiKey = (this.client as any).config.apiKey;
    
    // Replace http(s):// with ws(s)://
    const wsBaseUrl = baseUrl.replace(/^http/, 'ws');
    
    // Create URL object
    const url = new URL(`${wsBaseUrl}/ws`);
    
    // Add API key if available
    if (apiKey) {
      url.searchParams.append('x-api-key', apiKey);
    }
    
    // Add session parameter
    if (options.session) {
      url.searchParams.append('session', options.session);
    } else {
      // Use default session from client config
      url.searchParams.append('session', (this.client as any).getDefaultSession());
    }
    
    // Add events parameters
    if (options.events) {
      if (options.events === '*') {
        url.searchParams.append('events', '*');
      } else if (Array.isArray(options.events)) {
        options.events.forEach(event => {
          url.searchParams.append('events', event);
        });
      }
    }
    
    return url.toString();
  }
}
