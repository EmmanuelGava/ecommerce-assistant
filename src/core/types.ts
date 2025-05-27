// Tipos e interfaces principales
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatbotConfig {
  theme?: {
    primaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
  };
  position?: {
    bottom?: number;
    right?: number;
  };
  welcomeMessage?: string;
  maxMessages?: number;
} 