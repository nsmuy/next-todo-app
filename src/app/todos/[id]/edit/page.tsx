"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useRecoilState } from "recoil";
import { todosState } from "../../../components/atoms";
import { Todo } from "../../../../types/Todo";
import { Button } from "@mui/material";
import { db } from "@/app/firebase";
import { updateDoc, doc } from "firebase/firestore";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const [todos, setTodos] = useRecoilState(todosState);
  const [editedTodo, setEditedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    //idがparamと一致するtodoを探す
    const todo: Todo | undefined = todos.find((todo) => todo.id === params.id);
    if(todo) {
      setEditedTodo({...todo, id: todo.id});
    } else {
      router.push('/todos');
    }
  }, [router])

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editedTodo) {
      updateDoc(doc(db, "todos", editedTodo.id), {
        ...editedTodo
      })
      .then(() => {
        // Recoilの状態を更新
        const updatedTodos = todos.map((todo) => {
          if (todo.id === editedTodo.id) {
            return editedTodo;
          }
          return todo;
        });
        setTodos(updatedTodos);
        router.back();
        setEditedTodo(null);
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      })
    }
  };

  const handleEditCancel = () => {
    router.back();
    setEditedTodo(null);
  }

  return (
    <div className='flex flex-col items-center gap-10'>
      <h2 className='text-4xl font-bold text-center'>タスクを編集する</h2>

      {editedTodo ? (
        <form
          onSubmit={handleEditSubmit}
          className="flex flex-col items-start gap-4"
        >
          <div className='flex gap-4'>
            <label htmlFor="title" className='w-24'>タスク名</label>
            <input
              id="title"
              type="text"
              value={editedTodo.title}
              onChange={(e) => setEditedTodo({...editedTodo, title: e.target.value})}
              className='flex-1'
              required
            />
          </div>
          <div className='flex gap-4'>
            <label htmlFor="responsible" className='w-24'>担当者</label>
            <input
              id="responsible"
              type="text"
              value={editedTodo.responsible}
              onChange={(e) => setEditedTodo({...editedTodo, responsible: e.target.value})}
              className='flex-1'
              required
              />
          </div>
          <div className='flex gap-4'>
            <label htmlFor="status" className='w-24'>ステータス</label>
            <select
              id="status"
              value={editedTodo.status}
              onChange={(e) => setEditedTodo({...editedTodo, status: e.target.value as Todo["status"]})}
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
              value={editedTodo.detail}
              onChange={(e) => setEditedTodo({...editedTodo, detail: e.target.value})}
              className='flex-1'
            />
          </div>
          <div className='flex gap-4'>
            <label htmlFor="deadline" className='w-24'>期限</label>
            <input
              id="deadline"
              type="text"
              value={editedTodo.deadline}
              onChange={(e) => setEditedTodo({...editedTodo, deadline: e.target.value})}
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
