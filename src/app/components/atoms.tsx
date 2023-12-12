'use client';

import { Todo } from '../../types/Todo'
import { atom } from "recoil";

export const todosState = atom<Todo[]>({
  key: "todos",
  default: [
  ],
});