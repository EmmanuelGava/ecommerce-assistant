var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GoogleGenAI } from '@google/genai';
export class VertexAIService {
    constructor() {
        console.log('Inicializando VertexAIService con GenAI:');
        // Hardcodear el modelo
        this.model = 'gemini-2.0-flash-001';
        console.log('Modelo:', this.model);
        console.log('Proyecto:', process.env.GOOGLE_CLOUD_PROJECT);
        console.log('Ubicación:', process.env.GOOGLE_CLOUD_LOCATION);
        this.ai = new GoogleGenAI({
            vertexai: true,
            project: process.env.GOOGLE_CLOUD_PROJECT,
            location: process.env.GOOGLE_CLOUD_LOCATION || 'us-central1',
        });
    }
    generateResponse(message, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            try {
                console.log('Llamando a Vertex AI (GenAI) con:');
                console.log('Mensaje:', message);
                console.log('Opciones:', options);
                console.log('Modelo:', this.model);
                const chat = this.ai.chats.create({
                    model: this.model,
                    config: {
                        maxOutputTokens: 1024,
                        temperature: 0.9,
                        topP: 0.8,
                        topK: 40,
                    },
                });
                // El mensaje debe ser un array de objetos { text: string }
                const result = yield chat.sendMessage({ message: [{ text: message }] });
                // El texto generado está en result.candidates[0].content.parts[0].text
                const text = (_e = (_d = (_c = (_b = (_a = result.candidates) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.text;
                if (!text) {
                    throw new Error('No se pudo generar una respuesta válida');
                }
                return text;
            }
            catch (error) {
                console.error('Error al generar respuesta con Vertex AI (GenAI):', error.message, error.code, (_f = error.response) === null || _f === void 0 ? void 0 : _f.data);
                throw new Error('Error al procesar la solicitud con Vertex AI (GenAI)');
            }
        });
    }
}
