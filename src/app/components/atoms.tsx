'use client';

import { Todo } from '../../types/Todo'
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const todosState = atom<Todo[]>({
  key: "todos",
  default: [
  ],
  effects_UNSTABLE: [persistAtom]
});
