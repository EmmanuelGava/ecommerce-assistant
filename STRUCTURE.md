# Estructura del Software

```
ecommerce-chatbot/
├── src/
│   ├── core/
│   │   ├── Chatbot.ts              # Clase principal del chatbot
│   │   ├── MessageHandler.ts       # Manejador de mensajes
│   │   └── types.ts               # Tipos y interfaces
│   │
│   ├── vertex/
│   │   ├── VertexAIClient.ts      # Cliente para Vertex AI
│   │   ├── AgentManager.ts        # Gestor de agentes especializados
│   │   └── config.ts             # Configuración de Vertex AI
│   │
│   ├── ui/
│   │   ├── components/
│   │   │   ├── ChatWidget.tsx     # Componente principal del widget
│   │   │   ├── MessageBubble.tsx  # Componente de burbuja de mensaje
│   │   │   ├── Input.tsx         # Componente de entrada
│   │   │   └── Header.tsx        # Encabezado del chat
│   │   ├── styles/
│   │   │   ├── theme.ts          # Configuración de temas
│   │   │   └── global.css        # Estilos globales
│   │   └── hooks/
│   │       └── useChat.ts        # Hook personalizado para lógica del chat
│   │
│   ├── agents/
│   │   ├── base/
│   │   │   └── BaseAgent.ts      # Clase base para agentes
│   │   ├── personalized-shopping/ # Agente de compras personalizadas de ADK
│   │   │   ├── agent.py          # Agente principal
│   │   │   ├── tools.py          # Herramientas del agente
│   │   │   └── prompts.py        # Prompts personalizados
│   │   ├── customer-service/     # Agente de servicio al cliente de ADK
│   │   │   ├── agent.py
│   │   │   ├── tools.py
│   │   │   └── prompts.py
│   │   └── marketing-agency/     # Agente de marketing de ADK
│   │       ├── agent.py
│   │       ├── tools.py
│   │       └── prompts.py
│   │
│   └── utils/
│       ├── logger.ts             # Utilidad de logging
│       ├── storage.ts            # Manejo de almacenamiento local
│       └── validation.ts         # Utilidades de validación
│
├── public/
│   ├── assets/
│   │   ├── icons/               # Iconos del widget
│   │   └── images/              # Imágenes del widget
│   └── index.html              # Página de demostración
│
├── tests/
│   ├── unit/
│   │   ├── core/
│   │   ├── vertex/
│   │   └── agents/
│   └── integration/
│
├── config/
│   ├── default.json            # Configuración por defecto
│   └── production.json         # Configuración de producción
│
├── docs/
│   ├── api/                    # Documentación de API
│   ├── integration/            # Guías de integración
│   └── examples/               # Ejemplos de uso
│
├── package.json
├── tsconfig.json
├── webpack.config.js
└── README.md
```

## Descripción de Componentes Principales

### Core
- **Chatbot.ts**: Clase principal que orquesta toda la funcionalidad del chatbot
- **MessageHandler.ts**: Gestiona el flujo de mensajes y respuestas
- **types.ts**: Define las interfaces y tipos principales

### Vertex AI
- **VertexAIClient.ts**: Implementa la comunicación con la API de Vertex AI
- **AgentManager.ts**: Administra los diferentes agentes especializados
- **config.ts**: Configuración de credenciales y parámetros de Vertex AI

### UI
- **components/**: Componentes React para la interfaz del widget
- **styles/**: Sistema de estilos y temas
- **hooks/**: Hooks personalizados para la lógica de UI

### Agentes (ADK Samples)
- **personalized-shopping/**: Agente especializado en compras personalizadas
  - Basado en el agente de ADK para recomendaciones de productos
  - Adaptado para diferentes categorías de ecommerce
- **customer-service/**: Agente de servicio al cliente
  - Manejo de consultas y soporte
  - Resolución de problemas comunes
- **marketing-agency/**: Agente de marketing
  - Recomendaciones de productos
  - Análisis de tendencias
  - Personalización de ofertas

### Utils
- **logger.ts**: Sistema de logging para debugging
- **storage.ts**: Manejo de almacenamiento local
- **validation.ts**: Utilidades de validación

## Flujo de Datos

1. El usuario interactúa con el widget (UI)
2. La interacción es procesada por el MessageHandler
3. El mensaje es enviado al AgentManager
4. El agente especializado de ADK procesa la consulta
5. La respuesta es formateada y enviada de vuelta al usuario

## Dependencias Principales

```json
{
  "dependencies": {
    "react": "^18.x",
    "typescript": "^4.x",
    "@google-cloud/vertexai": "^latest",
    "styled-components": "^5.x",
    "axios": "^1.x",
    "google-cloud-aiplatform": "^latest",
    "python-shell": "^5.x"
  },
  "devDependencies": {
    "jest": "^29.x",
    "webpack": "^5.x",
    "typescript": "^4.x"
  }
}
```

## Integración con ADK Samples

Los agentes se basan en los ejemplos proporcionados por Google en [ADK Samples](https://github.com/google/adk-samples), específicamente:

1. **Personalized Shopping Agent**: Adaptado del agente de compras personalizadas
2. **Customer Service Agent**: Basado en el agente de servicio al cliente
3. **Marketing Agency Agent**: Utiliza el agente de marketing para recomendaciones

Cada agente mantiene su estructura original de ADK pero está adaptado para:
- Integración con el widget de ecommerce
- Procesamiento de consultas específicas de productos
- Manejo de catálogos de productos
- Personalización según el rubro del ecommerce 