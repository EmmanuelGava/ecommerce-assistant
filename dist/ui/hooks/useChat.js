var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState } from 'react';
export const useChat = (agentId) => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const sendMessage = (text) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            setIsLoading(true);
            // Crear mensaje del usuario
            const userMessage = {
                id: Date.now().toString(),
                text,
                sender: 'user',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, userMessage]);
            // Enviar mensaje al backend (endpoint corregido)
            const response = yield fetch('http://localhost:3000/api/chat/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: text,
                    agentId
                }),
            });
            if (!response.ok) {
                throw new Error('Error al enviar mensaje');
            }
            const data = yield response.json();
            // Crear mensaje del asistente
            const assistantMessage = {
                id: (Date.now() + 1).toString(),
                text: data.response,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, assistantMessage]);
        }
        catch (error) {
            console.error('Error:', error);
            // Crear mensaje de error
            const errorMessage = {
                id: Date.now().toString(),
                text: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.',
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        }
        finally {
            setIsLoading(false);
        }
    });
    return {
        messages,
        sendMessage,
        isLoading
    };
};
