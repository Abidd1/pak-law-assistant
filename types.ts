
export interface Message {
  role: 'user' | 'model';
  content: string;
  isError?: boolean;
}

export enum ChatMode {
  TEXT = 'TEXT',
  VOICE = 'VOICE',
}
