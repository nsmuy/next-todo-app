/**
 * Todo一覧ページ
 */

"use client";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

import React from 'react';
import Link from 'next/link';
import { useRecoilState } from "recoil";
import { todosState } from "../components/atoms";

const page = () => {

  const [todos, setTodos] = useRecoilState(todosState);
  
  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-4xl font-bold'>Todo一覧</h2>

      <TableContainer component={Paper} className='mt-12'>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>タスク名</TableCell>
            <TableCell align="right">担当者</TableCell>
            <TableCell align="right">ステータス</TableCell>
            <TableCell align="right">期限</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((todo) => (
            <TableRow
              key={todo.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="todo">
                {todo.title}
              </TableCell>
              <TableCell align="right">{todo.responsible}</TableCell>
              <TableCell align="right">{todo.status}</TableCell>
              <TableCell align="right">{todo.deadline}</TableCell>
              <TableCell align="right">
                <Link href={`/todos/${todo.id}`}>詳細</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default page