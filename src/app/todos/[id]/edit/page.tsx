"use client";

import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import { todosState } from "../../../components/atoms";
import Link from 'next/link';
import { Button } from "@mui/material";

const page = () => {

  const params = useParams();
  const todos = useRecoilValue(todosState);
  console.log(params);

  const todo = todos.find((todo) => todo.id === params.id);

  const [title, setTitle] = useState('');
  const [responsible, setResponsible] = useState('');
  const [status, setStatus] = useState('');
  const [detail, setDetail] = useState('');
  const [deadline, setDeadline] = useState('');

  return (
    <div>
      {todo ? (
        <form>
          <label htmlFor="title">タスク名</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
          <label htmlFor="responsible">担当者</label>
          <input
            id="responsible"
            type="text"
            value={todo.responsible}
            onChange={(e) => setResponsible(e.target.value)}
            />
          <label htmlFor="status">ステート</label>
          <input
            id="status"
            type="text"
            value={todo.status}
            onChange={(e) => setStatus(e.target.value)}
            />
          <label htmlFor="detail">内容</label>
          <input
            id="detail"
            type="text"
            value={todo.detail}
            onChange={(e) => setDetail(e.target.value)}
            />
          <label htmlFor="deadline">期限</label>
          <input
            id="deadline"
            type="text"
            value={todo.deadline}
            onChange={(e) => setDeadline(e.target.value)}
            />
        </form>
      ) : (
        <p>Todo is not found</p>
      )}
    </div>
  )
}

export default page