import { Todo } from '../../types/Todo'
import { atom } from "recoil";

export const todosState = atom<Todo[]>({
  key: "todos",
  default: [
    {
      id: "0",
      title: "プログラミング",
      detail: "progateやる",
      status: "未着手",
      responsible: "Aさん",
      deadline: "2023.01.01",
    },
    {
      id: "1",
      title: "デザイン",
      detail: "Figmaやる",
      status: "未着手",
      responsible: "Bさん",
      deadline: "2023.01.05",
    },
  ],
});
