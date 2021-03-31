export type ProjectType = 'cdr' | 'rr' | 'sandbox';

export type LogType = 'info' | 'error' | 'success';

export type ServerLog = { log: string; type: LogType };

export type ClientLog = {
  date: string;
  message: string;
  type: LogType;
};
