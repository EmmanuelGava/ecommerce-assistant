import { Router } from 'express';
import { detectIntentCX } from '../services/dialogflowCX.js';

const router = Router();

router.post('/message', async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    // LOG: Mostrar datos recibidos
    console.log('POST /api/chat/message');
    console.log('Mensaje recibido:', message);
    console.log('sessionId:', sessionId);

    if (!message) {
      return res.status(400).json({ error: 'El mensaje es requerido' });
    }

    const response = await detectIntentCX(message, sessionId || 'default-session');
    console.log('Respuesta de Dialogflow CX:', JSON.stringify(response, null, 2));
    
    // Extraer el texto y los productos de la respuesta
    const reply = response.queryResult?.responseMessages
      ?.map(msg => msg.text?.text?.join(' '))
      .join(' ') || '';
    
    const safeReply = reply || 'No se recibió respuesta del agente.';
    
    // Verificar si hay payload de productos en la respuesta
    const products = response.queryResult?.parameters?.fields?.products?.listValue?.values
      ?.map(value => value.structValue?.fields)
      ?.map(fields => ({
        id: fields?.id?.numberValue,
        title: fields?.title?.stringValue,
        description: fields?.description?.stringValue,
        price: fields?.price?.numberValue,
        brand: fields?.brand?.stringValue,
        category: fields?.category?.stringValue,
        thumbnail: fields?.thumbnail?.stringValue
      })) || [];
    
    const messageResponse = {
      id: Date.now().toString(),
      text: safeReply,
      products: products.length > 0 ? products : undefined,
      sender: 'bot',
      timestamp: new Date()
    };
    
    res.json({ response: messageResponse });
  } catch (error) {
    console.error('Error en el endpoint de chat:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router; 