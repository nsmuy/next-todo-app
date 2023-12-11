export type Todo = {
  id: string,
  title: string,
  detail: string,
  status: '未着手' | '進行中' | '完了',
  responsible: string,
  deadline: string,
}