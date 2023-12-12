"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useRecoilState } from "recoil";
import { todosState } from "../../../components/atoms";
import { Todo } from "../../../../types/Todo";
import { Button } from "@mui/material";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const [todos, setTodos] = useRecoilState(todosState);

  const todo: Todo | undefined = todos.find((todo) => todo.id === params.id);
  const [title, setTitle] = useState<any>(todo?.title);
  const [responsible, setResponsible] = useState<any>(todo?.responsible);
  const [status, setStatus] = useState<any>(todo?.status);
  const [detail, setDetail] = useState<any>(todo?.detail);
  const [deadline, setDeadline] = useState<any>(todo?.deadline);

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedTodos = todos.map((todo) => {
      if (todo.id === params.id) {
        return {
          ...todo,
          title: title,
          responsible: responsible,
          status: status,
          detail: detail,
          deadline: deadline,
        };
      }
      return todo;
    });
  
    setTodos(updatedTodos);
    router.push('/todos');
  }

  return (
    <div>
      {todo ? (
        <form
          onSubmit={handleEditSubmit}
          className="flex flex-col items-start gap-4"
        >
          <div>
            <label htmlFor="title">タスク名</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="responsible">担当者</label>
            <input
              id="responsible"
              type="text"
              value={responsible}
              onChange={(e) => setResponsible(e.target.value)}
              />
          </div>
          <div>
            <label htmlFor="status">ステート</label>
            <input
              id="status"
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="detail">内容</label>
            <input
              id="detail"
              type="text"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="deadline">期限</label>
            <input
              id="deadline"
              type="text"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          <Button type="submit">確定</Button>
        </form>
      ) : (
        <p>Todo is not found</p>
      )}
    </div>
  );
};

export default Page;
