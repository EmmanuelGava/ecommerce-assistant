import { useState, useCallback } from 'react';
import { ChatService } from '../services/chatService';
import { Message } from '../core/types';

export const useChat = (shopId?: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatService = ChatService.getInstance();

  if (shopId) {
    chatService.setShopId(shopId);
  }

  const sendMessage = useCallback(async (content: string) => {
    try {
      setIsLoading(true);
      
      // Agregar mensaje del usuario
      const userMessage: Message = {
        id: Date.now().toString(),
        text: content,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMessage]);

      // Obtener respuesta del backend
      const response = await chatService.sendMessage(content);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error('Error:', error);
      // Agregar mensaje de error
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    sendMessage,
    isLoading,
  };
}; 