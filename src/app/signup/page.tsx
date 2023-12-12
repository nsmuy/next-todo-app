/**
 * 新規登録ページ
 */

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { app } from "../firebase"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

const Page = () => {

  const router = useRouter();
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 新規登録を実行したら、todosページに遷移
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await createUserWithEmailAndPassword(auth, email, password)
    router.push("/todos");
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-4xl font-bold">新規登録</h2>

      <form onSubmit={handleSubmit} className='mt-6'>
        <div className='flex flex-col items-start'>
          <TextField
            id="standard-email-input"
            label="email"
            type="email"
            autoComplete="current-email"
            variant="standard"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <TextField
            id="standard-password-input"
            label="password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>

        <div className="flex justify-center mt-4">
          <Button type="submit" variant="contained">
            登録
          </Button>
        </div>
      </form>

      <div className="flex justify-end mt-6">
          <Link href={"/signin"}>
            登録済みの方はこちら
          </Link>
        </div>
    </div>
  )
}

export default Page