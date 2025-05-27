import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import chatRouter from './api/chat.js';
import { functionsRouter } from './api/functions.js';
import { deploymentConfig } from './config/deployment.js';
import productSearchWebhook from './webhooks/productSearch.js';

// Verificar variables de entorno
console.log('Variables de entorno cargadas:');
console.log('VERTEX_AI_MODEL:', process.env.VERTEX_AI_MODEL);
console.log('GOOGLE_CLOUD_PROJECT:', process.env.GOOGLE_CLOUD_PROJECT);
console.log('GOOGLE_CLOUD_LOCATION:', process.env.GOOGLE_CLOUD_LOCATION);

const app = express();

// Middleware
app.use(cors(deploymentConfig.cors));
app.use(express.json());

// Rate limiting
app.use(rateLimit(deploymentConfig.rateLimit));

// Validación de entrada
app.use((req, res, next) => {
  if (req.method === 'POST' && req.body) {
    // Validar que los campos requeridos estén presentes
    if (req.path === '/api/chat/message' && !req.body.message) {
      return res.status(400).json({ error: 'El mensaje es requerido' });
    }
  }
  next();
});

// Rutas
app.use('/api/chat', chatRouter);
app.use('/api/functions', functionsRouter);
app.use('/webhook/product-search', productSearchWebhook);

// Ruta de prueba
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Iniciar servidor
app.listen(deploymentConfig.port, () => {
  console.log(`Servidor corriendo en http://localhost:${deploymentConfig.port}`);
  console.log(`Ambiente: ${deploymentConfig.nodeEnv}`);
}); 