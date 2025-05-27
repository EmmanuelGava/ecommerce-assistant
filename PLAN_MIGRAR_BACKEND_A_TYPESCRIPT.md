# Plan de Migración de Backend a TypeScript

## Objetivo
Migrar el backend actual de Python a TypeScript/Node.js para facilitar la integración con el frontend, mejorar la mantenibilidad y aprovechar el ecosistema JS.

---

## Pasos

### 1. Estructura del Proyecto

- `/src`
  - `/api` (endpoints REST)
  - `/services` (lógica de negocio, integración con Vertex AI)
  - `/utils` (helpers)
  - `/types` (tipos TypeScript)
  - `index.ts` (entrypoint)

### 2. Inicialización

- Inicializa el proyecto:
  ```bash
  npm init -y
  npm install express dotenv axios
  npm install --save-dev typescript ts-node @types/node @types/express
  npx tsc --init
  ```

### 3. Configuración de entorno

- Crea un archivo `.env` con las variables necesarias:
  ```
  GOOGLE_CLOUD_PROJECT=...
  GOOGLE_CLOUD_LOCATION=global
  VERTEX_AI_MODEL=gemini-1.5-flash
  VERTEX_AI_API_KEY=...
  ```

### 4. Endpoint principal del chatbot

- Crea un endpoint `/chat/message` que reciba el mensaje del usuario y lo reenvíe a Vertex AI usando la API REST o SDK.

### 5. Servicio de integración con Vertex AI

- Usa `axios` para llamar a la API REST de Vertex AI (o el SDK oficial si lo prefieres).
- Maneja autenticación con API Key o OAuth2 según el método elegido.

### 6. Multi-tenant

- Añade lógica para identificar el cliente/tienda (por ejemplo, por `sessionId`, `shopId` o subdominio).
- Carga la configuración y credenciales de cada tienda dinámicamente.

### 7. Funciones estándar

- Prepara endpoints internos para funciones como:
  - `getProductInfo`
  - `trackOrder`
  - `getFAQ`
- Estas funciones serán llamadas por Gemini vía Function Calling.

### 8. Seguridad y despliegue

- Añade validación de entrada y control de acceso.
- Despliega en una plataforma como Vercel, Railway, Render, GCP, etc.

---

## Recursos útiles

- [Vertex AI REST API](https://cloud.google.com/vertex-ai/docs/generative-ai/start/quickstarts/quickstart-rest)
- [SDK Node.js Vertex AI (experimental)](https://www.npmjs.com/package/@google-cloud/aiplatform)

---

## Siguiente paso

- Probar el flujo end-to-end con el widget y el backend en TypeScript. 