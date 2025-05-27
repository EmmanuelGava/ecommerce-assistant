import { config } from '../config';
import { Message } from '../core/types';

export class ChatService {
  private static instance: ChatService;
  private sessionId: string | null = null;
  private shopId: string | null = null;

  private constructor() {}

  static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  setShopId(shopId: string) {
    this.shopId = shopId;
  }

  async initialize(): Promise<void> {
    try {
      const response = await fetch(`${config.apiUrl}/chat/initialize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: `user_${Date.now()}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al inicializar el chat');
      }

      const data = await response.json();
      this.sessionId = data.sessionId;
    } catch (error) {
      console.error('Error al inicializar el chat:', error);
      throw error;
    }
  }

  async sendMessage(text: string): Promise<Message> {
    try {
      const cleanText = text.replace(/\n/g, ' ');
      const response = await fetch(`${config.apiUrl}/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: cleanText,
          sessionId: this.sessionId,
          shopId: this.shopId
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar mensaje');
      }

      const data = await response.json();
      return {
        id: Date.now().toString(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      throw error;
    }
  }

  async endSession(): Promise<void> {
    if (!this.sessionId) {
      return;
    }

    try {
      await fetch(`${config.apiUrl}/chat/end`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: this.sessionId,
        }),
      });

      this.sessionId = null;
    } catch (error) {
      console.error('Error al finalizar la sesión:', error);
      throw error;
    }
  }
} 