'use client';

import React, { useState } from 'react'
import { useRouter} from "next/navigation";
import { Todo } from '../../../types/Todo'
import { Button} from '@mui/material'
import { useRecoilState } from "recoil";
import { todosState } from "@/app/components/atoms";
import { collection, addDoc} from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { db } from "@/app/firebase";

const Page = () => {

  const [todos, setTodos] = useRecoilState<Todo[]>(todosState);
  const [newTodoTitle, setNewTodoTitle] = useState<Todo['title']>('');
  const [newTodoResponsible, setNewTodoResponsible] = useState<Todo['responsible']>('');
  const [newTodoStatus, setNewTodoStatus] = useState<Todo['status']>('untouched');
  const [newTodoDetail, setNewTodoDetail] = useState<Todo['detail']>('');
  const [newTodoDeadline, setNewTodoDeadline] = useState<Todo['deadline']>('');
  const router = useRouter();

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addDoc(collection(db, "todos"), {
      id: uuidv4(),
      title: newTodoTitle,
      detail: newTodoDetail,
      status: newTodoStatus,
      responsible: newTodoResponsible,
      IdleDeadline: newTodoDeadline,
    });

    router.push('/todos');
    setNewTodoTitle('');
    setNewTodoResponsible('');
    setNewTodoStatus('untouched');
    setNewTodoDetail('');
    setNewTodoDeadline('');
  }

  return (
    <div className='flex flex-col items-center gap-10'>
      <h2 className='text-4xl font-bold text-center'>新しいタスクを追加する</h2>
      <form
          onSubmit={handleCreateSubmit}
          className="w-1/2 flex flex-col gap-4"
        >
          <div className='flex gap-4'>
            <label htmlFor="title" className='w-24'>タスク名</label>
            <input
              id="title"
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              className='flex-1'
              required
            />
          </div>
          <div className='flex gap-4'>
            <label htmlFor="responsible" className='w-24'>担当者</label>
            <input
              id="responsible"
              type="text"
              value={newTodoResponsible}
              onChange={(e) => setNewTodoResponsible(e.target.value)}
              className='flex-1'
              required
              />
          </div>
          <div className='flex gap-4'>
            <label htmlFor="status" className='w-24'>ステート</label>
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
          <div className='flex gap-4'>
            <label htmlFor="detail" className='w-24'>内容</label>
            <input
              id="detail"
              type="text"
              value={newTodoDetail}
              onChange={(e) => setNewTodoDetail(e.target.value)}
              className='flex-1'
            />
          </div>
          <div className='flex gap-4'>
            <label htmlFor="deadline" className='w-24'>期限</label>
            <input
              id="deadline"
              type="text"
              value={newTodoDeadline}
              onChange={(e) => setNewTodoDeadline(e.target.value)}
              className='flex-1'
            />
          </div>

          <Button type="submit">追加する</Button>

        </form>
    </div>
  )
}

export default Page