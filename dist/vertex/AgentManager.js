export class AgentManager {
    constructor() {
        this.currentSessionId = null;
        // this.vertexClient = VertexAIClient.getInstance();
        this.currentAgent = process.env.AGENT_TYPE || 'personalized-shopping';
    }
    static getInstance() {
        if (!AgentManager.instance) {
            AgentManager.instance = new AgentManager();
        }
        return AgentManager.instance;
    }
}
