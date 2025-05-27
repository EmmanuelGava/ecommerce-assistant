export const config = {
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
    vertexAI: {
        project: process.env.REACT_APP_GOOGLE_CLOUD_PROJECT,
        location: process.env.REACT_APP_GOOGLE_CLOUD_LOCATION || 'global',
        model: process.env.REACT_APP_VERTEX_AI_MODEL || 'gemini-2.0-flash-001'
    }
};
