'use client';

import React, { useState } from 'react'
import { useRouter} from "next/navigation";
import { Todo } from '../../../types/Todo'
import { Button} from '@mui/material'
import { useRecoilState } from "recoil";
import { todosState } from "@/app/components/atoms";
import { v4 as uuidv4 } from 'uuid';

const Page = () => {

  const [todos, setTodos] = useRecoilState<Todo[]>(todosState);
  const [newTodoTitle, setNewTodoTitle] = useState<Todo['title']>('');
  const [newTodoResponsible, setNewTodoResponsible] = useState<Todo['responsible']>('');
  const [newTodoStatus, setNewTodoStatus] = useState<Todo['status']>('untouched');
  const [newTodoDetail, setNewTodoDetail] = useState<Todo['detail']>('');
  const [newTodoDeadline, setNewTodoDeadline] = useState<Todo['deadline']>('');
  const router = useRouter();

  const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: Todo = {
      id: uuidv4(),
      title: newTodoTitle,
      responsible: newTodoResponsible,
      status: newTodoStatus,
      detail: newTodoDetail,
      deadline: newTodoDeadline
    }

    setTodos([...todos, newTodo]);
    router.push('/todos');
    setNewTodoTitle('');
    setNewTodoResponsible('');
    setNewTodoStatus('untouched');
    setNewTodoDetail('');
    setNewTodoDeadline('');
  }

  return (
    <div>
      <h2>新しいタスクを追加する</h2>
      <form
          onSubmit={handleCreateSubmit}
          className="flex flex-col items-start gap-4"
        >
          <div>
            <label htmlFor="title">タスク名</label>
            <input
              id="title"
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="responsible">担当者</label>
            <input
              id="responsible"
              type="text"
              value={newTodoResponsible}
              onChange={(e) => setNewTodoResponsible(e.target.value)}
              />
          </div>
          <div>
            <label htmlFor="status">ステート</label>
            <select
              id="status"
              value={newTodoStatus}
              onChange={(e) => setNewTodoStatus(e.target.value as Todo['status'])}
            >
              <option value="untouched">untouched</option>
              <option value="processing">processing</option>
              <option value="completed">completed</option>
            </select>
          </div>
          <div>
            <label htmlFor="detail">内容</label>
            <input
              id="detail"
              type="text"
              value={newTodoDetail}
              onChange={(e) => setNewTodoDetail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="deadline">期限</label>
            <input
              id="deadline"
              type="text"
              value={newTodoDeadline}
              onChange={(e) => setNewTodoDeadline(e.target.value)}
            />
          </div>

          <Button type="submit">追加する</Button>

        </form>
    </div>
  )
}

export default Page