import React, { useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import { Button } from '@mui/material';
import { Todo } from "../../../types/Todo";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useRecoilState } from "recoil";
import { todosState } from "../../components/atoms";
import { useRouter } from "next/navigation";

const TodoList = () => {

  const [todos, setTodos] = useRecoilState<Todo[]>(todosState); 

  useEffect(() => {
    const q = query(collection(db, "todos"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosData = snapshot.docs.map(doc => ({
        ...(doc.data() as Todo),
      }));

      setTodos(todosData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <TableContainer component={Paper} className="mt-12">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>タスク名</TableCell>
              <TableCell align="right">担当者</TableCell>
              <TableCell align="right">ステータス</TableCell>
              <TableCell align="right">期限</TableCell>
              <TableCell align="right">詳細</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{todo.title}</TableCell>
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

      <Link href={"/todos/create"} className="mt-6">
        <Button>タスクを追加する</Button>
      </Link>
    </div>
  );
};

export default TodoList;
