import { jsx as _jsx } from "react/jsx-runtime";
export const MessageBubble = ({ message, isUser, theme }) => {
    return (_jsx("div", { className: `flex ${isUser ? 'justify-end' : 'justify-start'}`, children: _jsx("div", { className: `max-w-[80%] rounded-lg p-3 ${isUser
                ? 'rounded-br-none'
                : 'rounded-bl-none'}`, style: {
                backgroundColor: isUser ? theme.primary : theme.secondary,
                color: isUser ? '#ffffff' : theme.text
            }, children: _jsx("p", { className: "text-sm whitespace-pre-wrap break-words", children: message.replace(/\n/g, ' ') }) }) }));
};
