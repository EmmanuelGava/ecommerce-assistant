import React from 'react';

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  theme: {
    primary?: string;
    secondary?: string;
    background?: string;
    text?: string;
  };
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isUser,
  theme
}) => {
  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          isUser
            ? 'rounded-br-none'
            : 'rounded-bl-none'
        }`}
        style={{
          backgroundColor: isUser ? theme.primary : theme.secondary,
          color: isUser ? '#ffffff' : theme.text
        }}
      >
        <p className="text-sm whitespace-pre-wrap break-words">{message.replace(/\n/g, ' ')}</p>
      </div>
    </div>
  );
}; 