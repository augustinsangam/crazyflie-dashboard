export interface CompilerOutput {
  status: 'loading'|'error'|'success';
  message: string;
}
