import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatWidget from './ui/components/ChatWidget';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ChatWidget />
  </React.StrictMode>
); 