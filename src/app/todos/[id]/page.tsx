/**
 * タスクの詳細ページ
 */

"use client";

import React from "react";
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

const page = () => {
  // const router = useRouter();
  const params = useParams();
  const todos = useRecoilValue(todosState);

  const todo = todos.find((todo) => todo.id === params.id);

  return (
    <div>
      {todo ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>タスク名</TableCell>
                <TableCell align="right">担当者</TableCell>
                <TableCell align="right">ステータス</TableCell>
                <TableCell align="right">内容</TableCell>
                <TableCell align="right">期限</TableCell>
                <TableCell align="right">編集</TableCell> 
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
                <TableCell align="right">
                  <Link href={`/todos/${todo.id}/edit`}>編集</Link>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>Todo is not found</p>
      )}
    </div>
  );
};

export default page;
