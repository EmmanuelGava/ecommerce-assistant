var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useCallback } from 'react';
import { ChatService } from '../services/chatService';
export const useChat = (shopId) => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const chatService = ChatService.getInstance();
    if (shopId) {
        chatService.setShopId(shopId);
    }
    const sendMessage = useCallback((content) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            setIsLoading(true);
            // Agregar mensaje del usuario
            const userMessage = {
                id: Date.now().toString(),
                text: content,
                sender: 'user',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, userMessage]);
            // Obtener respuesta del backend
            const response = yield chatService.sendMessage(content);
            setMessages(prev => [...prev, response]);
        }
        catch (error) {
            console.error('Error:', error);
            // Agregar mensaje de error
            const errorMessage = {
                id: Date.now().toString(),
                text: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.',
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        }
        finally {
            setIsLoading(false);
        }
    }), []);
    return {
        messages,
        sendMessage,
        isLoading,
    };
};
