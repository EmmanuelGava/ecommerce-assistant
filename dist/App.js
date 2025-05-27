import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChatWidget } from './components/ChatWidget';
import './index.css';
function App() {
    return (_jsx("div", { className: "min-h-screen bg-gray-100", children: _jsxs("div", { className: "container mx-auto p-4", children: [_jsx("h1", { className: "text-3xl font-bold text-center mb-8", children: "E-commerce Assistant" }), _jsx(ChatWidget, { agentId: "test-agent", initialMessage: "\u00A1Bienvenido! \u00BFEn qu\u00E9 puedo ayudarte hoy?", position: "bottom-right", theme: {
                        primary: '#4F46E5',
                        secondary: '#9CA3AF',
                        background: '#FFFFFF',
                        text: '#1F2937'
                    } })] }) }));
}
export default App;
