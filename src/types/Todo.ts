export type Todo = {
  id: string,
  title: string,
  detail: string,
  status: 'untouched' | 'processing' | 'completed',
  responsible: string,
  deadline: string,
}