'use client';

import React, { useState } from 'react'
import { useRouter} from "next/navigation";
import { Todo } from '../../../types/Todo'
import { Button} from '@mui/material'
import { setDoc, doc} from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { db } from "@/app/firebase";
import { useRecoilState } from "recoil";
import { todosState } from "../../components/atoms";
import Link from 'next/link';

const Page = () => {

  const [todos, setTodos] = useRecoilState<Todo[]>(todosState);
  const [newTodo, setNewTodo] = useState<Todo>({
    id: '',
    title: '',
    detail: '',
    status: 'untouched',
    responsible: '',
    deadline: '',
  });
  const router = useRouter();

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodoId = uuidv4();

    //forebaseにデータを送信（ドキュメントIDを指定）
    await setDoc(doc(db, "todos", newTodoId), {
      ...newTodo,
      id: newTodoId,
    })

    // recoilにデータを追加
    setTodos([
      ...todos,
      {...newTodo, id: newTodoId}
    ])

    router.push('/todos');
    setNewTodo({} as Todo);
  }

  const handleCreateCancel = () => {
    router.push('/todos');
    setNewTodo({
      id: '',
      title: '',
      detail: '',
      status: 'untouched',
      responsible: '',
      deadline: '',
    });
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
            value={newTodo.title}
            onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
            className='flex-1'
            required
          />
        </div>
        <div className='flex gap-4'>
          <label htmlFor="responsible" className='w-24'>担当者</label>
          <input
            id="responsible"
            type="text"
            value={newTodo.responsible}
            onChange={(e) => setNewTodo({...newTodo, responsible: e.target.value})}
            className='flex-1'
            required
            />
        </div>
        <div className='flex gap-4'>
          <label htmlFor="status" className='w-24'>ステータス</label>
          <select
            id="status"
            value={newTodo.status}
            onChange={(e) => setNewTodo({...newTodo, status: e.target.value as Todo['status']})}
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
            value={newTodo.detail}
            onChange={(e) => setNewTodo({...newTodo, detail: e.target.value})}
            className='flex-1'
          />
        </div>
        <div className='flex gap-4'>
          <label htmlFor="deadline" className='w-24'>期限</label>
          <input
            id="deadline"
            type="text"
            value={newTodo.deadline}
            onChange={(e) => setNewTodo({...newTodo, deadline: e.target.value})}
            className='flex-1'
          />
        </div>

        <div className='flex justify-center gap-6'>
          <Button onClick={handleCreateCancel}>
            <Link href="/todos">キャンセル</Link>
          </Button>
          <Button type="submit">追加する</Button>
        </div>
      </form>
    </div>
  )
}

export default Page