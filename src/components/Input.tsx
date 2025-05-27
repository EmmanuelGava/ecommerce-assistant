import React, { useState, KeyboardEvent } from 'react';

interface InputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  theme: {
    primary?: string;
    secondary?: string;
    background?: string;
    text?: string;
  };
}

export const Input: React.FC<InputProps> = ({
  onSend,
  isLoading,
  theme
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      const cleanMessage = message.replace(/\s+/g, ' ').trim();
      onSend(cleanMessage);
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Escribe un mensaje..."
        disabled={isLoading}
        className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{
          backgroundColor: theme.background,
          color: theme.text,
          borderColor: theme.secondary
        }}
      />
      <button
        onClick={handleSend}
        disabled={isLoading || !message.trim()}
        className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backgroundColor: theme.primary,
          color: '#ffffff'
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      </button>
    </div>
  );
}; 