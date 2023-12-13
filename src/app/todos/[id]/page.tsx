/**
 * タスクの詳細ページ
 */

"use client";

import React from "react";
import TodoDetail from "../components/TodoDetail";
import Comments from "../components/Comments";

const Page = () => {

  return (
    <div className='flex flex-col items-center'>
      <h2 className="text-4xl font-bold">タスク詳細</h2>
      <div className="flex flex-col items-center mt-6">
        <TodoDetail />
        <Comments  />
      </div>
    </div>
  );
};

export default Page;
