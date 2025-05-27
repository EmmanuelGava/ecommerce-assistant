import { GoogleGenAI } from '@google/genai';

interface ChatOptions {
  sessionId?: string;
  shopId?: string;
}

export class VertexAIService {
  private ai: GoogleGenAI;
  private model: string;

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

  async generateResponse(message: string, options: ChatOptions): Promise<string> {
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
      const result = await chat.sendMessage({ message: [{ text: message }] });

      // El texto generado está en result.candidates[0].content.parts[0].text
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error('No se pudo generar una respuesta válida');
      }

      return text;
    } catch (error: any) {
      console.error('Error al generar respuesta con Vertex AI (GenAI):', error.message, error.code, error.response?.data);
      throw new Error('Error al procesar la solicitud con Vertex AI (GenAI)');
    }
  }
}