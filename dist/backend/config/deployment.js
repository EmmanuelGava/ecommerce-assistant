import dotenv from 'dotenv';
dotenv.config();
export const deploymentConfig = {
    // Configuración del servidor
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    // Configuración de seguridad
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    },
    // Configuración de rate limiting
    rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 minutos
        max: 100, // límite de 100 peticiones por ventana
    },
    // Configuración de logging
    logging: {
        level: process.env.LOG_LEVEL || 'info',
        format: process.env.LOG_FORMAT || 'json',
    },
    // Configuración de la base de datos (si se necesita en el futuro)
    database: {
        url: process.env.DATABASE_URL,
    },
};
