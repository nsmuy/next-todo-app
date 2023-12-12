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
    setTitle('');
    setResponsible('');
    setStatus('untouched');
    setDeadline('');
    setDeadline('');
  }

  const handleEditCancel = () => {
    router.back();
    setTitle('');
    setResponsible('');
    setStatus('untouched');
    setDeadline('');
    setDeadline('');
  }

  return (
    <div className='flex flex-col items-center gap-10'>
      <h2 className='text-4xl font-bold text-center'>タスクを編集する</h2>

      {todo ? (
        <form
          onSubmit={handleEditSubmit}
          className="flex flex-col items-start gap-4"
        >
          <div className='flex gap-4'>
            <label htmlFor="title" className='w-24'>タスク名</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='flex-1'
            />
          </div>
          <div className='flex gap-4'>
            <label htmlFor="responsible" className='w-24'>担当者</label>
            <input
              id="responsible"
              type="text"
              value={responsible}
              onChange={(e) => setResponsible(e.target.value)}
              className='flex-1'
              />
          </div>
          <div className='flex gap-4'>
            <label htmlFor="status" className='w-24'>ステート</label>
            <input
              id="status"
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          <div className='flex gap-4'>
            <label htmlFor="detail" className='w-24'>内容</label>
            <input
              id="detail"
              type="text"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className='flex-1'
            />
          </div>
          <div className='flex gap-4'>
            <label htmlFor="deadline" className='w-24'>期限</label>
            <input
              id="deadline"
              type="text"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className='flex-1'
            />
          </div>

          <div className="w-full flex justify-center gap-6 mt-6">
            <Button onClick={handleEditCancel}>戻る</Button>
            <Button type="submit">確定</Button>
          </div>
        </form>
      ) : (
        <div>
          <p>Todo is not found</p>
        </div>
      )}
    </div>
  );
};

export default Page;
