var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { config } from '../config';
export class ChatService {
    constructor() {
        this.sessionId = null;
        this.shopId = null;
    }
    static getInstance() {
        if (!ChatService.instance) {
            ChatService.instance = new ChatService();
        }
        return ChatService.instance;
    }
    setShopId(shopId) {
        this.shopId = shopId;
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${config.apiUrl}/chat/initialize`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: `user_${Date.now()}`,
                    }),
                });
                if (!response.ok) {
                    throw new Error('Error al inicializar el chat');
                }
                const data = yield response.json();
                this.sessionId = data.sessionId;
            }
            catch (error) {
                console.error('Error al inicializar el chat:', error);
                throw error;
            }
        });
    }
    sendMessage(text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cleanText = text.replace(/\n/g, ' ');
                const response = yield fetch(`${config.apiUrl}/chat/message`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: cleanText,
                        sessionId: this.sessionId,
                        shopId: this.shopId
                    }),
                });
                if (!response.ok) {
                    throw new Error('Error al enviar mensaje');
                }
                const data = yield response.json();
                return {
                    id: Date.now().toString(),
                    text: data.response,
                    sender: 'bot',
                    timestamp: new Date(),
                };
            }
            catch (error) {
                console.error('Error al enviar mensaje:', error);
                throw error;
            }
        });
    }
    endSession() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.sessionId) {
                return;
            }
            try {
                yield fetch(`${config.apiUrl}/chat/end`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        sessionId: this.sessionId,
                    }),
                });
                this.sessionId = null;
            }
            catch (error) {
                console.error('Error al finalizar la sesión:', error);
                throw error;
            }
        });
    }
}
