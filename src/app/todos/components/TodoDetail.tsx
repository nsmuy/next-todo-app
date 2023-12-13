import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { Button } from "@mui/material";
import { useRouter, useParams } from "next/navigation";
import { db } from "@/app/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { Todo } from "@/types/Todo";
import { useRecoilState } from "recoil";
import { todosState } from "@/app/components/atoms";

const TodoDetail = () => {
  const [docId, setDocId] = useState("");
  const router = useRouter();
  const params = useParams();
  const [todos, setTodos] = useRecoilState<Todo[]>(todosState);
  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const todo = todos.find((todo) => todo.id === params.id);
    if (todo) {
      setTodo(todo);
      setDocId(todo.id);
    }
  }, [router]);


  const handleTodoDelete = () => {

    // Firebaseのドキュメントを削除
    if (docId) {
      console.log(docId);
      deleteDoc(doc(db, "todos", docId))
      .then(() => {
        // Recoilのドキュメントを削除
        if (todo) {
          const newTodos = todos.filter((todoItem) => todoItem.id !== todo.id);
          setTodos(newTodos);
        }

        // 削除後にリダイレクト
        router.push("/todos");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    }
  };

  return (
    <>
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
            {todo && (
              <TableRow key={todo.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="todo">
                  {todo.title}
                </TableCell>
                <TableCell align="right">{todo.responsible}</TableCell>
                <TableCell align="right">{todo.status}</TableCell>
                <TableCell align="right">{todo.detail}</TableCell>
                <TableCell align="right">{todo.deadline}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="w-full flex justify-center mt-6">
        <Link href="/todos">
          <Button>前のページに戻る</Button>
        </Link>
        {todo && (
          <Link href={`/todos/${todo.id}/edit`}>
            <Button>編集</Button>
          </Link>
        )}
        <Button onClick={handleTodoDelete}>削除</Button>
      </div>
    </>
  );
};
export default TodoDetail;
