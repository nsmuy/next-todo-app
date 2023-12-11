/**
 * タスクの詳細ページ
 */

"use client";

import React, { useEffect, useState } from "react";
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
import { collection, query, where, onSnapshot } from "firebase/firestore"; 

const page = () => {
  const auth = getAuth(app);
  const [comment, setComments] = useState('');

  useEffect(() => {
    const commentsRef = collection(db, 'comments');
    const q = query(commentsRef, where('id', '==', 0));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const filteredComments = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        docId: doc.id // FirestoreのドキュメントIDを含める場合
      }));
      console.log(filteredComments);
    });

    // コンポーネントのアンマウント時にリスナーを解除
    return () => unsubscribe();
  }, []);

  const params = useParams();
  const todos = useRecoilValue<Todo[]>(todosState);
  const todo = todos.find((todo) => todo.id === params.id);

  return (
    <div>
      {todo ? (
        <div className="flex flex-col items-center">
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
          <div>

          </div>
        </div>
      ) : (
        <p>Todo is not found</p>
      )}
    </div>
  );
};

export default page;
