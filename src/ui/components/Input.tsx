import React, { useState, KeyboardEvent } from 'react';
import styled from 'styled-components';

interface InputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const InputContainer = styled.div`
  padding: 15px;
  background: #f8f9fa;
  border-top: 1px solid #dee2e6;
`;

const InputForm = styled.form`
  display: flex;
  gap: 10px;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #dee2e6;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #007bff;
  }

  &:disabled {
    background: #e9ecef;
    cursor: not-allowed;
  }
`;

const SendButton = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #0056b3;
  }

  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }
`;

const Input: React.FC<InputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <InputContainer>
      <InputForm onSubmit={handleSubmit}>
        <TextInput
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe un mensaje..."
          disabled={disabled}
        />
        <SendButton type="submit" disabled={disabled || !message.trim()}>
          Enviar
        </SendButton>
      </InputForm>
    </InputContainer>
  );
};

export default Input; 