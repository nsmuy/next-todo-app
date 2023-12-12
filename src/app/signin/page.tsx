/**
 * ログインページ（/signin）
 */

"use client";

import React, { useState } from 'react';
import { app } from "../firebase"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from "next/link";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from "next/navigation"

const Page =() => {

  const router = useRouter();
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password);
    router.push('/todos');
  }

  return (
    <div className="flex flex-col items-center">

      <h2 className="text-4xl font-bold">ログイン</h2>

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
            ログイン
          </Button>
        </div>
      </form>

      <div className="flex justify-end mt-6">
          <Link href={"/signup"}>
            新規登録はこちら
          </Link>
        </div>
    </div>
  )
}

export default Page;