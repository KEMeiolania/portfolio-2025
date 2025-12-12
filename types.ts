export interface ChartData {
  name: string;
  value: number;
  type?: 'primary' | 'secondary' | 'negative';
}

export interface SimulationState {
  far: number;
  localVitality: number;
  neighborVitality: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}