var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SessionsClient } from '@google-cloud/dialogflow-cx';
const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || '';
const location = process.env.DIALOGFLOW_LOCATION_ID || '';
const agentId = process.env.DIALOGFLOW_AGENT_ID || '';
const languageCode = process.env.DIALOGFLOW_LANGUAGE_CODE || 'es';
// Especifica el endpoint regional
const apiEndpoint = location ? `${location}-dialogflow.googleapis.com` : undefined;
const client = new SessionsClient(Object.assign({}, (apiEndpoint && { apiEndpoint })));
export function detectIntentCX(text, sessionId) {
    return __awaiter(this, void 0, void 0, function* () {
        const sessionPath = client.projectLocationAgentSessionPath(projectId, location, agentId, sessionId);
        const request = {
            session: sessionPath,
            queryInput: {
                text: { text },
                languageCode,
            },
        };
        const [response] = yield client.detectIntent(request);
        return response;
    });
}
