import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatWidget from './ui/components/ChatWidget';
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(_jsx(React.StrictMode, { children: _jsx(ChatWidget, {}) }));
