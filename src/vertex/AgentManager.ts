import { log } from '../utils/logger';

export type AgentType = 'personalized-shopping' | 'customer-service' | 'marketing-agency';

export class AgentManager {
  private static instance: AgentManager;
  // private vertexClient: VertexAIClient;
  private currentAgent: AgentType;
  private currentSessionId: string | null = null;

  private constructor() {
    // this.vertexClient = VertexAIClient.getInstance();
    this.currentAgent = (process.env.AGENT_TYPE as AgentType) || 'personalized-shopping';
  }

  static getInstance(): AgentManager {
    if (!AgentManager.instance) {
      AgentManager.instance = new AgentManager();
    }
    return AgentManager.instance;
  }

  // El resto de los métodos que usaban vertexClient deben ser eliminados o comentados.
  // Si este archivo no se usa en frontend, puedes eliminarlo completamente.
} 