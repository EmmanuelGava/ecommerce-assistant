import React from 'react';
import { ChatWidget } from './components/ChatWidget';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          E-commerce Assistant
        </h1>
        <ChatWidget
          agentId="test-agent"
          initialMessage="¡Bienvenido! ¿En qué puedo ayudarte hoy?"
          position="bottom-right"
          theme={{
            primary: '#4F46E5',
            secondary: '#9CA3AF',
            background: '#FFFFFF',
            text: '#1F2937'
          }}
        />
      </div>
    </div>
  );
}

export default App; 