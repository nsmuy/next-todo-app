/**
 * Todo一覧ページ
 */

"use client";

import React, { useEffect } from 'react';
import { useRecoilValue } from "recoil";
import { todosState } from "../components/atoms";
import { Todo } from "../../types/Todo";
import { useRouter } from "next/navigation"
import { useAuthContext } from '../context/AuthContext';
import TodoList from './components/TodoList';

const Page = () => {
  const router = useRouter();
  const { user, loading } = useAuthContext();

  // ユーザーがログインしていない場合、ログインページにリダイレクト
  useEffect(() => {
    if (!user && !loading) {
      router.push('/signin');
    }
  }, [user, router, loading]);

  if (loading) {
    return <div>ローディング中...</div>;
  }

  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-4xl font-bold'>Todo一覧</h2>
      <TodoList />
    </div>
  )
}

export default Page