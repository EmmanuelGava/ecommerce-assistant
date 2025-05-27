import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { Input } from './Input';
import { useChat } from '../hooks/useChat';
export const ChatWidget = ({ agentId, initialMessage = '¡Hola! ¿En qué puedo ayudarte hoy?', position = 'bottom-right', theme = {
    primary: '#007bff',
    secondary: '#6c757d',
    background: '#ffffff',
    text: '#000000'
} }) => {
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef(null);
    const { messages, sendMessage, isLoading } = useChat(agentId);
    const scrollToBottom = () => {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    const positionClasses = {
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4'
    };
    return (_jsxs("div", { className: `fixed ${positionClasses[position]} z-50`, children: [!isOpen && (_jsx("button", { onClick: () => setIsOpen(true), className: "bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition-colors", style: { backgroundColor: theme.primary }, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" }) }) })), isOpen && (_jsxs("div", { className: "bg-white rounded-lg shadow-xl w-96 h-[600px] flex flex-col", style: { backgroundColor: theme.background }, children: [_jsxs("div", { className: "p-4 border-b flex justify-between items-center", children: [_jsx("h3", { className: "font-semibold", style: { color: theme.text }, children: "Chat Assistant" }), _jsx("button", { onClick: () => setIsOpen(false), className: "text-gray-500 hover:text-gray-700", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] }), _jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", children: [_jsx(MessageBubble, { message: initialMessage, isUser: false, theme: theme }), messages.map((message) => (_jsx(MessageBubble, { message: message.text, isUser: message.sender === 'user', theme: theme }, message.id))), isLoading && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce" }), _jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" }), _jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" })] })), _jsx("div", { ref: messagesEndRef })] }), _jsx("div", { className: "p-4 border-t", children: _jsx(Input, { onSend: sendMessage, isLoading: isLoading, theme: theme }) })] }))] }));
};
