import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export const Input = ({ onSend, isLoading, theme }) => {
    const [message, setMessage] = useState('');
    const handleSend = () => {
        if (message.trim() && !isLoading) {
            const cleanMessage = message.replace(/\s+/g, ' ').trim();
            onSend(cleanMessage);
            setMessage('');
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    return (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "text", value: message, onChange: (e) => setMessage(e.target.value), onKeyPress: handleKeyPress, placeholder: "Escribe un mensaje...", disabled: isLoading, className: "flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500", style: {
                    backgroundColor: theme.background,
                    color: theme.text,
                    borderColor: theme.secondary
                } }), _jsx("button", { onClick: handleSend, disabled: isLoading || !message.trim(), className: "p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed", style: {
                    backgroundColor: theme.primary,
                    color: '#ffffff'
                }, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" }) }) })] }));
};
