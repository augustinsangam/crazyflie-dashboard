export type ProjectType = 'cdr' | 'rr' | 'sandbox';

export type LogType = 'info' | 'error' | 'success' | 'warning';

export type ServerLog = { log: string; timestamp: number; type: LogType };

export type ClientLog = {
  date: string;
  message: string;
  type: LogType;
};
