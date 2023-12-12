/**
 * タスクの詳細ページ
 */

"use client";

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import { todosState } from "../../components/atoms";
import Link from 'next/link';
import { Button } from "@mui/material";
import { Todo } from "../../../types/Todo";
import { getAuth } from "firebase/auth";
import { app, db } from "@/app/firebase";
import { collection, query, where, onSnapshot, Timestamp, addDoc, orderBy } from "firebase/firestore"; 

type Comment = {
  docId: string,
  id: string,
  text: string,
  sendAt: Timestamp,
}

const page = () => {
  const auth = getAuth(app);
  const params = useParams();
  const todos = useRecoilValue<Todo[]>(todosState);
  const todo = todos.find((todo) => todo.id === params.id);
  const [comments, setComments] = useState<Comment[]>([]);
  const [sendComments, setSendComments] = useState<string>('');

  useEffect(() => {
    const commentsRef = collection(db, 'comments');
    
    // idフィールドの値とURLのパラメーターIDが一致し、sendAtでソートされたドキュメントを取得
    const q = query(commentsRef, where('id', '==', params.id), orderBy('sendAt', 'asc'));
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map(doc => ({
        ...(doc.data() as Comment),
        docId: doc.id,
      }));
  
      console.log(commentsData);
      setComments(commentsData);
    });
  
    // コンポーネントのアンマウント時にリスナーを解除
    return () => unsubscribe();
  }, []);

  const handleSendComments = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addDoc(collection(db, "comments"), {
      docId: uuidv4(),
      id: params.id,
      text: sendComments,
      sendAt: Timestamp.now(),
    });

    setSendComments('');
  }

  return (
    <div className='flex flex-col items-center'>
      <h2 className="text-4xl font-bold">タスク詳細</h2>
      {todo ? (
        <div className="flex flex-col items-center mt-6">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>タスク名</TableCell>
                  <TableCell align="right">担当者</TableCell>
                  <TableCell align="right">ステータス</TableCell>
                  <TableCell align="right">内容</TableCell>
                  <TableCell align="right">期限</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  key={todo.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="todo">
                    {todo.title}
                  </TableCell>
                  <TableCell align="right">{todo.responsible}</TableCell>
                  <TableCell align="right">{todo.status}</TableCell>
                  <TableCell align="right">{todo.detail}</TableCell>
                  <TableCell align="right">{todo.deadline}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <div className="mt-6 flex justify-center items-center">
            <Link href={`/todos/${todo.id}/edit`}>
              <Button>編集</Button>
            </Link>
            <Link href='/todos'>
              <Button>削除</Button>
            </Link>
          </div>

          {/* コメント */}
          <div className="w-full mt-6">
            <h3 className="text-2xl font-bold">コメント</h3>
            <div className="bg-white p-4 rounded-lg">
              {comments.map((comment) => (
                <div key={comment.docId} className="flex justify-between">
                  <p>{comment.text}</p>
                  <p className="text-gray-500 text-sm">{comment.sendAt.toDate().toLocaleString()}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendComments} className="mt-4 w-full">
              <div>
                <input
                  type="text"
                  placeholder="コメントを入力してください"
                  onChange={(e) => setSendComments(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <p>Todo is not found</p>
      )}
    </div>
  );
};

export default page;
