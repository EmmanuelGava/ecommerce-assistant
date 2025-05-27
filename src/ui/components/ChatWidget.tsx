import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import Input from './Input';
import { ChatService } from '../../services/chatService';

// Definir el tipo Message localmente
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatWidgetProps {
  shopId?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ shopId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatService = ChatService.getInstance();

  useEffect(() => {
    if (shopId) {
      chatService.setShopId(shopId);
    }
  }, [shopId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage(text);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Lo siento, hubo un error al procesar tu mensaje.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg z-50">
        <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
          <span>Chat de Asistencia</span>
          <button onClick={() => setIsOpen(true)} className="text-white text-xl font-bold">+</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 h-[500px] bg-white rounded-lg shadow-lg flex flex-col z-50">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <span>Chat de Asistencia</span>
        <button onClick={() => setIsOpen(false)} className="text-white text-xl font-bold">×</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && (
          <MessageBubble
            message={{
              id: 'loading',
              text: 'Escribiendo...',
              sender: 'bot',
              timestamp: new Date(),
            }}
          />
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-2 border-t">
        <Input onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};

export default ChatWidget; 