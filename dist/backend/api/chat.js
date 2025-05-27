var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
import { detectIntentCX } from '../services/dialogflowCX.js';
const router = Router();
router.post('/message', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { message, sessionId } = req.body;
        // LOG: Mostrar datos recibidos
        console.log('POST /api/chat/message');
        console.log('Mensaje recibido:', message);
        console.log('sessionId:', sessionId);
        if (!message) {
            return res.status(400).json({ error: 'El mensaje es requerido' });
        }
        const response = yield detectIntentCX(message, sessionId || 'default-session');
        console.log('Respuesta de Dialogflow CX:', JSON.stringify(response, null, 2));
        const reply = ((_b = (_a = response.queryResult) === null || _a === void 0 ? void 0 : _a.responseMessages) === null || _b === void 0 ? void 0 : _b.map(msg => { var _a, _b; return (_b = (_a = msg.text) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.join(' '); }).join(' ')) || '';
        const safeReply = reply || 'No se recibió respuesta del agente.';
        res.json({ response: safeReply });
    }
    catch (error) {
        console.error('Error en el endpoint de chat:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}));
export const chatRouter = router;
