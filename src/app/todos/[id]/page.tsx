/**
 * タスクの詳細ページ
 */

"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import { todosState } from "../../components/atoms";
import { Todo } from "../../../types/Todo";
import TodoList from "../components/TodoDetail";
import Comments from "../components/Comments";

const Page = () => {
  const params = useParams();
  const todos = useRecoilValue<Todo[]>(todosState);
  const todo = todos.find((todo) => todo.id === params.id);

  return (
    <div className='flex flex-col items-center'>
      <h2 className="text-4xl font-bold">タスク詳細</h2>
      {todo ? (
        <div className="flex flex-col items-center mt-6">
          <TodoList />
          <Comments  />
        </div>
      ) : (
        <p>Todo is not found</p>
      )}
    </div>
  );
};

export default Page;
