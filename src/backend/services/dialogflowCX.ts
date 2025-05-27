import { SessionsClient } from '@google-cloud/dialogflow-cx';

const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || '';
const location = process.env.DIALOGFLOW_LOCATION_ID || '';
const agentId = process.env.DIALOGFLOW_AGENT_ID || '';
const languageCode = process.env.DIALOGFLOW_LANGUAGE_CODE || 'es';

// Especifica el endpoint regional
const apiEndpoint = location ? `${location}-dialogflow.googleapis.com` : undefined;
const client = new SessionsClient({
  ...(apiEndpoint && { apiEndpoint })
});

export async function detectIntentCX(text: string, sessionId: string) {
  const sessionPath = client.projectLocationAgentSessionPath(
    projectId,
    location,
    agentId,
    sessionId
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: { text },
      languageCode,
    },
  };

  const [response] = await client.detectIntent(request);
  return response;
} 