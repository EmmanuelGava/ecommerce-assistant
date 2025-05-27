var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import Input from './Input';
import { ChatService } from '../../services/chatService';
const ChatWidget = ({ shopId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const chatService = ChatService.getInstance();
    useEffect(() => {
        if (shopId) {
            chatService.setShopId(shopId);
        }
    }, [shopId]);
    const scrollToBottom = () => {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    const handleSendMessage = (text) => __awaiter(void 0, void 0, void 0, function* () {
        const userMessage = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        try {
            const response = yield chatService.sendMessage(text);
            setMessages(prev => [...prev, response]);
        }
        catch (error) {
            console.error('Error al enviar mensaje:', error);
            const errorMessage = {
                id: (Date.now() + 1).toString(),
                text: 'Lo siento, hubo un error al procesar tu mensaje.',
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        }
        finally {
            setIsLoading(false);
        }
    });
    if (!isOpen) {
        return (_jsx("div", { className: "fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg z-50", children: _jsxs("div", { className: "bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center", children: [_jsx("span", { children: "Chat de Asistencia" }), _jsx("button", { onClick: () => setIsOpen(true), className: "text-white text-xl font-bold", children: "+" })] }) }));
    }
    return (_jsxs("div", { className: "fixed bottom-4 right-4 w-80 h-[500px] bg-white rounded-lg shadow-lg flex flex-col z-50", children: [_jsxs("div", { className: "bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center", children: [_jsx("span", { children: "Chat de Asistencia" }), _jsx("button", { onClick: () => setIsOpen(false), className: "text-white text-xl font-bold", children: "\u00D7" })] }), _jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-3", children: [messages.map(message => (_jsx(MessageBubble, { message: message }, message.id))), isLoading && (_jsx(MessageBubble, { message: {
                            id: 'loading',
                            text: 'Escribiendo...',
                            sender: 'bot',
                            timestamp: new Date(),
                        } })), _jsx("div", { ref: messagesEndRef })] }), _jsx("div", { className: "p-2 border-t", children: _jsx(Input, { onSendMessage: handleSendMessage, disabled: isLoading }) })] }));
};
export default ChatWidget;
